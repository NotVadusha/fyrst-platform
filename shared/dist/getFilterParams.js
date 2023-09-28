"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterParams = void 0;
function getFilterParams(obj, props) {
    var _a;
    var result = [];
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        if (obj[prop] !== undefined) {
            result.push((_a = {}, _a[prop] = obj[prop], _a));
        }
    }
    return result;
}
exports.getFilterParams = getFilterParams;
