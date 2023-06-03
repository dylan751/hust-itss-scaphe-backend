import { Request, Response, NextFunction } from 'express';
import Rating from '../models/rating.model';
import User from '../models/user.model';
import Shop from '../models/shop.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { RatingInterface } from '../interfaces/rating';
import { UserInterface } from '../interfaces/user';
import { ShopInterface } from '../interfaces/shop';

export const getRatings: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ratings: RatingInterface[] = await Rating.find();

    // TODO: Get rating's user + shop info

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
    const newRating = await Rating.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        rating: newRating,
      },
    });
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

    const ratings: RatingInterface[] = await Rating.find({ shopId });

    if (ratings.length === 0) {
      return next(new AppError(`Can't find the ratings for ${shopId}`, 404));
    }

    // TODO: Get rating's user info

    res.status(200).json({
      status: 'success',
      data: {
        ratings: ratings,
      },
    });
  },
);

// Get all ratings of a coffee shop
export const getRatingsByUserId: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const ratings: RatingInterface[] = await Rating.find({ userId });

    if (ratings.length === 0) {
      return next(new AppError(`Can't find the ratings for ${userId}`, 404));
    }

    // TODO: Get rating's coffee shop info

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
