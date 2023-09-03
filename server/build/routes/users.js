"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../controllers/users");
var router = express_1.Router();
router.get("/users", users_1.getRegisteredUsers);
router.post("/signup", users_1.userSignup);
router.post("/login", users_1.userLogin);
exports.default = router;
