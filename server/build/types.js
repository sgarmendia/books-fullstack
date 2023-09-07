"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStatus = exports.UserStatus = exports.Genre = void 0;
var Genre;
(function (Genre) {
    Genre["Fiction"] = "fiction";
    Genre["Essay"] = "essay";
    Genre["History"] = "history";
    Genre["Children"] = "children";
})(Genre || (exports.Genre = Genre = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Unregistered"] = "unregistered";
    UserStatus["Registered"] = "registered";
    UserStatus["NotFound"] = "not_found";
    UserStatus["WrongPassword"] = "wrong_password";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["Invalid"] = "invalid_token";
    SessionStatus["Valid"] = "valid_token";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
