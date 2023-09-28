"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotal = void 0;
var getTotal = function (totalTax, amountPaid) {
    return (amountPaid + totalTax.additionalAmount) / (1 - totalTax.percentage / 100);
};
exports.getTotal = getTotal;
