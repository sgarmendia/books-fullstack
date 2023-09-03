"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.BookSchema = void 0;
var zod_1 = require("zod");
var types_1 = require("../types");
var GenreEnum = zod_1.z.nativeEnum(types_1.Genre);
exports.BookSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: GenreEnum,
});
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
