import { Request, Response, NextFunction } from 'express';
import Rating from '../models/rating.model';
import Category from '../models/category.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { RatingInterface } from '../interfaces/rating';
import { Types } from 'mongoose';
import { CategoryInterface } from '../interfaces/category';

export const getCategories: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories: CategoryInterface[] = await Category.find();

    res.status(200).json({
      status: 'success',
      result: categories.length,
      data: {
        categories: categories,
      },
    });
  },
);

export const createCategories: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newCategories: any[] = [];
    await Promise.all(
      req.body.categories.map(async (category: string) => {
        const newCategory = await Category.create({
          shopId: req.body.shopId,
          category: category,
        });
        newCategories.push(newCategory);
      }),
    );
    res.status(201).json({
      status: 'success',
      data: {
        category: newCategories,
      },
    });
  },
);

export const getCategoryById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category: CategoryInterface | null = await Category.findById(
      req.params.id,
    );

    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        category: category,
      },
    });
  },
);

export const updateCategory: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCategory) {
      return next(new AppError('No category found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        category: updatedCategory,
      },
    });
  },
);

export const deleteCategory: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
