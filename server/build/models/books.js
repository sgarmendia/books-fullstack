"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var books_json_1 = __importDefault(require("../data/books.json"));
var books = books_json_1.default;
var BookModel = /** @class */ (function () {
    function BookModel() {
    }
    BookModel.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, books];
            });
        });
    };
    BookModel.findById = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_b) {
                book = books.find(function (b) { return b.id === id; });
                if (!book) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, book];
            });
        });
    };
    BookModel.create = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var newBook;
            return __generator(this, function (_a) {
                newBook = __assign({ id: Math.max.apply(Math, books.map(function (b) { return b.id; })) + 1 }, book);
                books.push(newBook);
                return [2 /*return*/, newBook];
            });
        });
    };
    BookModel.delete = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var bookIndex;
            return __generator(this, function (_b) {
                bookIndex = books.findIndex(function (b) { return b.id === id; });
                if (bookIndex === -1)
                    return [2 /*return*/, false];
                books.splice(bookIndex, 1);
                return [2 /*return*/, true];
            });
        });
    };
    BookModel.update = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var bookIndex, bookToUpdate;
            return __generator(this, function (_a) {
                bookIndex = books.findIndex(function (b) { return b.id === book.id; });
                if (bookIndex === -1)
                    return [2 /*return*/, false];
                bookToUpdate = __assign(__assign({}, books[bookIndex]), book);
                books[bookIndex] = bookToUpdate;
                return [2 /*return*/, bookToUpdate];
            });
        });
    };
    BookModel.search = function (term) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                book = books.find(function (b) {
                    return (b.title.includes(term) ||
                        b.author.includes(term) ||
                        b.genre.includes(term));
                });
                if (!book)
                    return [2 /*return*/, false];
                return [2 /*return*/, book];
            });
        });
    };
    return BookModel;
}());
exports.BookModel = BookModel;
