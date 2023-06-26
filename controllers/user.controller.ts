import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import AppError from '../utils/appError';
import catchErrorAsync from '../utils/catchErrorAsync';
import { ShopInterface } from '../interfaces/shop';
import { UserInterface } from '../interfaces/user';
import { createError } from '../utils/createError';

export const getUsers: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUsers: UserInterface[] = await User.find();
    let users = allUsers;

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users: users,
      },
    });
  },
);

export const login: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        createError(404, 'Wrong email! No user with that email exists!'),
      );
    }

    if (user.password !== password) {
      return next(createError(404, 'Invalid password!'));
    }

    res.status(201).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  },
);

export const createUser: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(createError(404, 'Email already exists'));
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  },
);

export const getUserById: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface | null = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  },
);

export const updateUser: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  },
);

export const deleteUser: any = catchErrorAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
