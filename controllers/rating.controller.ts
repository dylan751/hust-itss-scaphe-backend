import { Request, Response, NextFunction } from 'express';
import Rating from '../models/rating.model';
import User from '../models/user.model';
import Shop from '../models/shop.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { RatingInterface } from '../interfaces/rating';
import { UserInterface } from '../interfaces/user';
import { ShopInterface } from '../interfaces/shop';
import { Types } from 'mongoose';

export const getRatings: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const ratings: RatingInterface[] = await Rating.find();

    // Get rating's user + shop info
    const ratings: RatingInterface[] = await Rating.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'shopId',
          foreignField: '_id',
          as: 'shop',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categories',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json({
      status: 'success',
      result: ratings.length,
      data: {
        ratings: ratings,
      },
    });
  },
);

export const createRating: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRating = await Rating.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          rating: newRating,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getRatingById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rating: RatingInterface | null = await Rating.findById(req.params.id);

    if (!rating) {
      return next(new AppError('No Rating found with that ID', 404));
    }

    // TODO: Get rating's user + shop info

    res.status(200).json({
      status: 'success',
      data: {
        rating: rating,
      },
    });
  },
);

// Get all ratings of a coffee shop
export const getRatingsByShopId: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;

    // const ratings: RatingInterface[] = await Rating.find({ shopId });

    // Get rating's user info
    const ratings = await Rating.aggregate([
      {
        $match: { shopId: new Types.ObjectId(shopId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categories',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (ratings.length === 0) {
      return next(new AppError(`Can't find the ratings for ${shopId}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        ratings: ratings,
      },
    });
  },
);

// Get all ratings of a user to coffee shops
export const getRatingsByUserId: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // const ratings: RatingInterface[] = await Rating.find({ userId });

    // Get rating's coffee shop info
    const ratings = await Rating.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'shops',
          localField: 'shopId',
          foreignField: '_id',
          as: 'shop',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categories',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (ratings.length === 0) {
      return next(new AppError(`Can't find the ratings for ${userId}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        ratings: ratings,
      },
    });
  },
);

export const updateRating: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedRating = await Rating.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRating) {
      return next(new AppError('No rating found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        rating: updatedRating,
      },
    });
  },
);

export const deleteRating: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      return next(new AppError('No rating found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
