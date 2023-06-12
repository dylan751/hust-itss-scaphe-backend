import { Request, Response, NextFunction } from 'express';
import OpenHour from '../models/openHour.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { OpenHourInterface } from '../interfaces/openHour';

export const getOpenHours: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const openHours: OpenHourInterface[] = await OpenHour.find();

    res.status(200).json({
      status: 'success',
      result: openHours.length,
      data: {
        openHours: openHours,
      },
    });
  },
);

export const createOpenHour: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newOpenHour = await OpenHour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        openHour: newOpenHour,
      },
    });
  },
);

export const getOpenHourById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const openHour: OpenHourInterface | null = await OpenHour.findById(
      req.params.id,
    );

    if (!openHour) {
      return next(new AppError('No open hour found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        openHour: openHour,
      },
    });
  },
);

export const updateOpenHour: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedOpenHour = await OpenHour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOpenHour) {
      return next(new AppError('No open hour found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        openHour: updatedOpenHour,
      },
    });
  },
);

export const deleteOpenHour: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const openHour = await OpenHour.findByIdAndDelete(req.params.id);

    if (!openHour) {
      return next(new AppError('No open hour found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
