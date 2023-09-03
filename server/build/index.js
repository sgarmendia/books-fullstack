"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
var books_1 = __importDefault(require("./routes/books"));
var users_1 = __importDefault(require("./routes/users"));
var PORT = process.env.PORT || 4000;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
// Routes
app.use("/", users_1.default);
app.use("/api", books_1.default);
// Error middleware
app.use(errorHandler_1.default);
app.listen(PORT, function () { return console.log("Server listening on port: " + PORT); });
exports.default = app;
