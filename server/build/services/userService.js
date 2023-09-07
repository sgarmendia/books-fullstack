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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = exports.getUsers = void 0;
var users_1 = require("../models/users");
var auth_1 = require("../utils/auth");
var jwt_1 = require("../utils/jwt");
var types_1 = require("../types");
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, users_1.UserModel.getAll()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.getUsers = getUsers;
var signupUser = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var checkUser, hashedPassword, registeredNewUser, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_1.UserModel.findOne({ email: email })];
                case 1:
                    checkUser = _b.sent();
                    if (checkUser)
                        return [2 /*return*/, types_1.UserStatus.Registered];
                    return [4 /*yield*/, auth_1.encrypt(password)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, users_1.UserModel.create({
                            email: email,
                            password: hashedPassword,
                        })];
                case 3:
                    registeredNewUser = _b.sent();
                    token = jwt_1.generateToken(email);
                    return [2 /*return*/, { token: token, email: registeredNewUser.email }];
            }
        });
    });
};
exports.signupUser = signupUser;
var loginUser = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, passwordHash, isCorrect, token, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_1.UserModel.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, types_1.UserStatus.NotFound];
                    passwordHash = user.password;
                    return [4 /*yield*/, auth_1.verify(password, passwordHash)];
                case 2:
                    isCorrect = _b.sent();
                    if (!isCorrect)
                        return [2 /*return*/, types_1.UserStatus.WrongPassword];
                    token = jwt_1.generateToken(user.email);
                    data = {
                        token: token,
                        email: user.email,
                    };
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.loginUser = loginUser;
