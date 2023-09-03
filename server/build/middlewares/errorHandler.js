"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var errorHandler = function (err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            errors: err.errors.map(function (error) { return ({
                path: error.path.join("."),
                message: error.message,
            }); }),
        });
    }
    if (err.message && typeof err.message === "string") {
        return res.status(500).json({
            error: err.message,
        });
    }
    console.error({ "Error stack": err.stack });
    return res.status(500).send("Something went wrong!");
};
exports.default = errorHandler;
