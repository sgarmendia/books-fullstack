"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
var types_1 = require("../types");
var jwt_1 = require("../utils/jwt");
var verifyJWT = function (req, res, next) {
    try {
        var jwtByUser = req.headers.authorization || "";
        var jwt = jwtByUser.split(" ").pop();
        var isUser = (0, jwt_1.verifyToken)("".concat(jwt));
        if (!isUser) {
            res.status(401);
            res.send(types_1.SessionStatus.Invalid);
        }
        else {
            req.user = isUser;
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.send(types_1.SessionStatus.Invalid);
    }
};
exports.verifyJWT = verifyJWT;
