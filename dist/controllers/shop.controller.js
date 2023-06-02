"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = exports.updateShop = exports.getShop = exports.createShop = exports.getAllShops = void 0;
const shop_model_1 = __importDefault(require("../models/shop.model"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchErrorAsync_1 = __importDefault(require("../utils/catchErrorAsync"));
exports.getAllShops = (0, catchErrorAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allShops = [];
    res.status(200).json({
        status: 'success',
        result: allShops.length,
        data: {
            shops: allShops,
        },
    });
}));
exports.createShop = (0, catchErrorAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newShop = yield shop_model_1.default.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            shop: newShop,
        },
    });
}));
exports.getShop = (0, catchErrorAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_model_1.default.findById(req.params.id);
    if (!shop) {
        return next(new appError_1.default('No Shop found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            shop: shop,
        },
    });
}));
exports.updateShop = (0, catchErrorAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!shop) {
        return next(new appError_1.default('No Shop found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            shop,
        },
    });
}));
exports.deleteShop = (0, catchErrorAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_model_1.default.findByIdAndDelete(req.params.id);
    if (!shop) {
        return next(new appError_1.default('No shop found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
