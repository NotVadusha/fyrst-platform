"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successPaymentNotification = exports.paymentApproveNotification = exports.messageNewNotification = exports.bookingNewUserNotify = exports.notificationTemplatePasswordChange = exports.notificationTemplateTimecard = exports.notificationTemplateBooking = void 0;
var notificationTemplateBooking = function (name, status) {
    return "Your booking ".concat(name, " changed status: ").concat(status);
};
exports.notificationTemplateBooking = notificationTemplateBooking;
var notificationTemplateTimecard = function (name, status) {
    return "Your timecard ".concat(name, " changed status: ").concat(status);
};
exports.notificationTemplateTimecard = notificationTemplateTimecard;
var notificationTemplatePasswordChange = function () {
    return "Your password has been changed successfully";
};
exports.notificationTemplatePasswordChange = notificationTemplatePasswordChange;
var bookingNewUserNotify = function (bookingName) {
    return "Booking ".concat(bookingName, " have new applicants");
};
exports.bookingNewUserNotify = bookingNewUserNotify;
var messageNewNotification = function (chatName) { return "New message in chat ".concat(chatName); };
exports.messageNewNotification = messageNewNotification;
var paymentApproveNotification = function (userName) { return "".concat(userName, " approved his payment"); };
exports.paymentApproveNotification = paymentApproveNotification;
var successPaymentNotification = function (bookingName) {
    return "Your payment for booking ".concat(bookingName, " is success");
};
exports.successPaymentNotification = successPaymentNotification;
