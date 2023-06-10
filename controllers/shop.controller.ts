import { Request, Response, NextFunction } from 'express';
import Shop from '../models/shop.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { ShopInterface } from '../interfaces/shop';
import { calculateRating } from '../utils/calculateRating';
import { getShopCategories } from '../utils/getShopCategories';
import { Types } from 'mongoose';

export const getShops: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const allShops: ShopInterface[] = await Shop.find();
    const allShops: ShopInterface[] = await Shop.aggregate([
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'shopId',
          as: 'ratings',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'shopId',
          as: 'categories',
        },
      },
    ]);
    let shops = allShops;

    // Filter by searchTerm (case insensitives)
    if (req.query.searchTerm) {
      shops = shops.filter((shop) =>
        shop.name
          .toLowerCase()
          .includes((req.query.searchTerm as string).toLowerCase()),
      );
    }

    // Filter by city + district
    if (req.query.city) {
      shops = shops.filter((shop) => shop.city === req.query.city);
    }
    if (req.query.district) {
      shops = shops.filter((shop) => shop.district === req.query.district);
    }

    // Filter by rating (Get shops that have average rating >= req.query.rating)
    if (req.query.star) {
      let indexToRemove: number[] = [];
      for (let i = 0; i < shops.length; i++) {
        const shopRating = await calculateRating(shops[i]._id);
        if (shopRating < parseInt(req.query.star as string)) {
          // Marks the shops that should be removed's index into an array
          indexToRemove.push(i);
        }
      }

      shops = shops.filter((shop, index) => !indexToRemove.includes(index));
    }

    // Filter by categories
    if (req.query.categories) {
      const queryCategoriesArr = (req.query.categories as string).split(',');
      let indexToInclude: number[] = [];

      for (let i = 0; i < shops.length; i++) {
        const shopCategories: string[] = await getShopCategories(shops[i]._id);
        if (
          queryCategoriesArr.every((category: string) =>
            shopCategories.includes(category),
          )
        ) {
          indexToInclude.push(i);
        }
      }

      shops = shops.filter((shop, index) => indexToInclude.includes(index));
    }

    // Sort by traffic status
    if (req.query.sort === 'asc') {
      shops = shops.sort((a: ShopInterface, b: ShopInterface) =>
        a.traffic > b.traffic ? 1 : -1,
      );
    } else if (req.query.sort === 'desc') {
      shops = shops.sort((a: ShopInterface, b: ShopInterface) =>
        a.traffic <= b.traffic ? 1 : -1,
      );
    }

    res.status(200).json({
      status: 'success',
      result: shops.length,
      data: {
        shops: shops,
      },
    });
  },
);

export const createShop: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newShop = await Shop.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        shop: newShop,
      },
    });
  },
);

export const getShopById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const shop: any = await Shop.findById(req.params.id);
    const shop: ShopInterface[] = await Shop.aggregate([
      {
        $match: { _id: new Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'shopId',
          as: 'ratings',
        },
      },
    ]);

    if (!shop) {
      return next(new AppError('No Shop found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop: shop,
      },
    });
  },
);

export const updateShop: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedShop) {
      return next(new AppError('No Shop found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop: updatedShop,
      },
    });
  },
);

export const deleteShop: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shop = await Shop.findByIdAndDelete(req.params.id);

    if (!shop) {
      return next(new AppError('No shop found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
