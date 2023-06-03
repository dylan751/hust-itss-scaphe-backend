import { Request, Response, NextFunction } from 'express';
import Shop from '../models/shop.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { ShopInterface } from '../interfaces/shop';
import { calculateRating } from '../utils/calculateRating';

export const getShops: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allShops: ShopInterface[] = await Shop.find();
    let shops = allShops;

    // Filter by city + district
    if (req.query.city) {
      shops = shops.filter((shop) => shop.city === req.query.city);
    }
    if (req.query.district) {
      shops = shops.filter((shop) => shop.district === req.query.district);
    }

    // Filter by rating (Get shops that have average rating >= req.query.rating)
    if (req.query.star) {
      for (let i = 0; i < shops.length; i++) {
        const shopRating = await calculateRating(shops[i].id);
        if (shopRating < parseInt(req.query.star as string)) {
          // Remove that shop from the shops array
          shops.splice(i, 1);
        }
      }
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
    const shop: ShopInterface | null = await Shop.findById(req.params.id);

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
