"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {*} fn : asynchronous function
 * @return {function}: assigned to variable.
 */
exports.default = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
