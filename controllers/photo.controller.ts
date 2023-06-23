import { Request, Response, NextFunction } from 'express';
import Rating from '../models/rating.model';
import Category from '../models/category.model';
import Photo from '../models/photo.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { RatingInterface } from '../interfaces/rating';
import { Types } from 'mongoose';
import { CategoryInterface } from '../interfaces/category';
import { PhotoInterface } from '../interfaces/photo';

export const getPhotos: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const photos: PhotoInterface[] = await Photo.find();

    res.status(200).json({
      status: 'success',
      result: photos.length,
      data: {
        photos: photos,
      },
    });
  },
);

export const createPhotos: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPhoto = await Photo.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          photo: newPhoto,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getPhotoById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const photo: PhotoInterface | null = await Photo.findById(req.params.id);

    if (!photo) {
      return next(new AppError('No photo found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        photo: photo,
      },
    });
  },
);

export const updatePhoto: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPhoto) {
      return next(new AppError('No photo found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        photo: updatedPhoto,
      },
    });
  },
);

export const deletePhoto: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo) {
      return next(new AppError('No photo found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
