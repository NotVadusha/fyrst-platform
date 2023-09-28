"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTypeRoutes = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["Bookings"] = "bookings";
    NotificationType["Timecards"] = "timecards";
    NotificationType["Payments"] = "payments";
    NotificationType["WeeklyReport"] = "weeklyReport";
    NotificationType["Messenger"] = "messenger";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
exports.NotificationTypeRoutes = (_a = {},
    _a[NotificationType.Bookings] = '/booking/',
    _a[NotificationType.Timecards] = '/timecard/',
    _a[NotificationType.Payments] = '/payments/',
    _a[NotificationType.WeeklyReport] = '/weekly-report/',
    _a[NotificationType.Messenger] = '/chat/',
    _a);
