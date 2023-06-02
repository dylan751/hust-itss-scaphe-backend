"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const appError_1 = __importDefault(require("./utils/appError"));
const shop_routes_1 = __importDefault(require("./routes/shop.routes"));
const error_controller_1 = __importDefault(require("./controllers/error.controller"));
dotenv_1.default.config();
process.on('uncaughtException', (err) => {
    console.error('UNHANDLER EXCEPTION! 💥 Shutting down...');
    console.error(`${err.name}: ${err.message}`);
    process.exit(1);
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// ROUTE
app.use('/api/v1/shops', shop_routes_1.default);
// Handling Unhandled Routes
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
// globalErrorHandler must be at undermost. - LAST MIDDLEWARE
app.use(error_controller_1.default);
// const DB = process.env.DATABASE.replace(
// 	'<PASSWORD>',
// 	process.env.DATABASE_PASSWORD
// );
// mongoose
// 	?.connect(DB)
// 	.then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
// -- Globally handle promise rejection --
// Each time there is an unhandled rejection somewhere in our app,
// the process object will emit an object called unhandled rejection,
// and then we can subscribe to that event
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLER REJECTION! 💥 Shutting down...');
    console.error(`${err.name}: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
    setTimeout(() => {
        process.abort();
    }, 1000).unref();
});
