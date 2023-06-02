import { Request, Response, NextFunction } from 'express';
import Shop from '../models/shop.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { ShopInterface } from '../interfaces/shop';

export const getShops: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shops: ShopInterface[] = await Shop.find();

    // TODO: Filter by city + district

    // TODO: Filter by rating

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

export const getShop: any = catchErrorAsync(
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
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shop) {
      return next(new AppError('No Shop found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop,
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
