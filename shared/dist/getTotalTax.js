"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalTax = void 0;
var getTotalTax = function (taxes) {
    return taxes.reduce(function (totalTax, tax) {
        totalTax.percentage += tax.percentage;
        if (tax.additionalAmount)
            totalTax.additionalAmount += tax.additionalAmount;
        return totalTax;
    }, {
        percentage: 0,
        additionalAmount: 0,
    });
};
exports.getTotalTax = getTotalTax;
