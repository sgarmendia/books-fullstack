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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var chai_1 = __importDefault(require("chai"));
var index_1 = __importDefault(require("../index"));
var auth_1 = require("../utils/auth");
var types_1 = require("../types");
var expect = chai_1.default.expect;
var loginUserAndGetToken = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supertest_1.default(index_1.default).post("/signup").send(userData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.body.token];
        }
    });
}); };
describe("Book Routes", function () {
    var token;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var hashedPassword, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_1.encrypt("testpassword")];
                case 1:
                    hashedPassword = _a.sent();
                    userData = {
                        email: "testuser@email.com",
                        password: hashedPassword,
                    };
                    return [4 /*yield*/, loginUserAndGetToken(userData)];
                case 2:
                    token = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("GET /books", function () {
        it("should get all books", function (done) {
            supertest_1.default(index_1.default)
                .get("/booksapi/books")
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an("array");
                done();
            });
        });
    });
    describe("PUT /book", function () {
        it("When sent with no ID should create a book", function (done) {
            var bookData = {
                title: "Test Book",
                author: "Test Author",
                genre: types_1.Genre.Fiction,
            };
            supertest_1.default(index_1.default)
                .put("/booksapi/book")
                .set("Authorization", "Bearer " + token)
                .send(bookData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Book with ID 11 was added.");
                done();
            });
        });
        it("should search term", function (done) {
            supertest_1.default(index_1.default)
                .get("/booksapi/books/Test")
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal(JSON.stringify({
                    id: 11,
                    title: "Test Book",
                    author: "Test Author",
                    genre: types_1.Genre.Fiction,
                }));
                done();
            });
        });
        it("When sent with ID should update a book", function (done) {
            var bookData = {
                id: 3,
                title: "Updated Test Book",
                author: "Updated Test Author",
                genre: types_1.Genre.Children,
            };
            supertest_1.default(index_1.default)
                .put("/booksapi/book")
                .set("Authorization", "Bearer " + token)
                .send(bookData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Book with ID 3 updated.");
                done();
            });
        });
    });
    describe("DELETE /books", function () {
        it("should delete book with provided ID", function (done) {
            supertest_1.default(index_1.default)
                .delete("/booksapi/book/3")
                .set("Authorization", "Bearer " + token)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal("Book with ID 3 was deleted.");
                done();
            });
        });
    });
});
describe("User Routes", function () {
    var userData = {
        email: "fake@email.com",
        password: "password",
    };
    describe("POST /signup", function () {
        it("Should register a new user", function (done) {
            supertest_1.default(index_1.default)
                .post("/signup")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.email).to.equal(userData.email);
                done();
            });
        });
        it("Should fail if try to register the same user", function (done) {
            supertest_1.default(index_1.default)
                .post("/signup")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.deep.equal({
                    status: "error",
                    message: "registered",
                });
                done();
            });
        });
    });
    describe("POST /login", function () {
        it("Should login successfully with the created user", function (done) {
            supertest_1.default(index_1.default)
                .post("/login")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.email).to.equal(userData.email);
                done();
            });
        });
        it("Should fail with the wrong password", function (done) {
            userData.password = "badpassword";
            supertest_1.default(index_1.default)
                .post("/login")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.deep.equal({
                    status: "error",
                    message: "wrong_password",
                });
                done();
            });
        });
    });
});
