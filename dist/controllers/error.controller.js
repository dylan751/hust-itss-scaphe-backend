"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    var _a;
    const message = `Duplicate field value: ${(_a = err === null || err === void 0 ? void 0 : err.keyValue) === null || _a === void 0 ? void 0 : _a.name}. Please use another value !`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    return new appError_1.default(err.message, 400);
};
const handleJWTError = () => new appError_1.default('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new appError_1.default('Your token has expired! Please log in again.', 401);
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    // Programming or other unknown error: don't leak error details
    else {
        // 1) Log error
        console.error(`Error 💥: ${err.message}`);
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};
function default_1(err, req, res, next) {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    /*
          = err.statusCode if it is defined
          else = 500 -> internal server error
      */
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        // Because err comes from middleware, we shouldn't change err variable
        // -> create new variable(hard-copy of error object)
        let error = JSON.parse(JSON.stringify(err));
        // we will pass the error that mongo created into these function and return new error
        // that is instance of AppError class and that error then will be marked as operational
        if (error.name === 'CastError')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
}
exports.default = default_1;
