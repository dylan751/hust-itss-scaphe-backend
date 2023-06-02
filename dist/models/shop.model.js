"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shopSchema = new mongoose_1.default.Schema({
    shop_name: {
        type: String,
        required: [true, 'A shop must have a name'],
        trim: true,
        maxlength: [40, 'A shop name must have less or equal 40 than characters'],
        minlength: [5, 'A shop name must have more or equal 5 than characters'],
    },
    status: {
        type: Number,
        required: [true, 'A shop must have a status'],
        enum: {
            values: [0, 1, 2],
            message: 'Status is either: 0(blocked), 1(in process), 2(blocked)',
        },
    },
    phone: {
        type: String,
        required: [true, 'A shop must have a phone number'],
    },
    city: {
        type: String,
        required: [true, 'A shop must have a city'],
    },
    district: {
        type: String,
        required: [true, 'A shop must have a district'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email !'],
        unique: true,
        // validate: [isEmail, 'Please provide a valid email !'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password !'],
        minlength: 4,
        select: false,
    },
    avatar: {
        type: String,
        required: [true, 'A shop must have a avatar'],
    },
    traffic: {
        type: Number,
        enum: {
            values: [0, 1, 2, 3, 4, 5],
            message: 'Traffic is either: 0(few), 1(moderate), 2(a bit crowded), 3(crowded), 4(out of seats), 5(closed)',
        },
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const shop = mongoose_1.default.model('Shop', shopSchema);
exports.default = shop;
