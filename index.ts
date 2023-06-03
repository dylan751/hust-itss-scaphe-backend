import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import AppError from './utils/appError';
import shopRouter from './routes/shop.routes';
import ratingRouter from './routes/rating.routes';
import globalErrorHandler from './controllers/error.controller';
import cors from 'cors';

dotenv.config();
const app: Express = express();
app.use(bodyParser.json());
app.use(cors<Request>()); // Enable cors

process.on('uncaughtException', (err: Error) => {
  console.error('UNHANDLER EXCEPTION! 💥 Shutting down...');
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
});

// DATABASE
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB!');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

// ROUTE
app.use('/api/v1/shops', shopRouter);
app.use('/api/v1/ratings', ratingRouter);

// Handling Unhandled Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// globalErrorHandler must be at undermost. - LAST MIDDLEWARE
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  connect();
  console.log(`App running on port ${port}...`);
});

// -- Globally handle promise rejection --
// Each time there is an unhandled rejection somewhere in our app,
// the process object will emit an object called unhandled rejection,
// and then we can subscribe to that event

process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLER REJECTION! 💥 Shutting down...');
  console.error(`${err.name}: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort();
  }, 1000).unref();
});
