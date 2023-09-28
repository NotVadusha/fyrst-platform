"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTax = void 0;
var getTax = function (total, percentage, additionalAmount) { return (total / 100) * percentage + (additionalAmount !== null && additionalAmount !== void 0 ? additionalAmount : 0); };
exports.getTax = getTax;
