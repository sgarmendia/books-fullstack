"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var chai_1 = __importDefault(require("chai"));
var index_1 = __importDefault(require("../index"));
var expect = chai_1.default.expect;
describe("Book Routes", function () {
    describe("GET /books", function () {
        it("should get all books", function (done) {
            supertest_1.default(index_1.default)
                .get("/api/books")
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
                genre: "fiction",
            };
            supertest_1.default(index_1.default)
                .put("/api/book")
                .send(bookData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal("Book with ID 11 was added.");
                done();
            });
        });
        it("When sent with ID should update a book", function (done) {
            var bookData = {
                id: 3,
                title: "Test Book",
                author: "Test Author",
                genre: "fiction",
            };
            supertest_1.default(index_1.default)
                .put("/api/book")
                .send(bookData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal("Book with ID 3 updated.");
                done();
            });
        });
    });
    describe("DELETE /books", function () {
        it("should delete book with provided ID", function (done) {
            supertest_1.default(index_1.default)
                .delete("/api/book/3")
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
                expect(res.text).to.contain('"email":"fake@email.com"');
                done();
            });
        });
        it("Should fail if try to register the same user", function (done) {
            supertest_1.default(index_1.default)
                .post("/signup")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(409);
                expect(res.text).to.equal("User already registered please login");
                done();
            });
        });
    });
    describe("POST /login", function () {
        it("Should login succefully with the created user", function (done) {
            supertest_1.default(index_1.default)
                .post("/login")
                .send(userData)
                .end(function (_err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.contain('"email":"fake@email.com"');
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
                expect(res.text).to.equal("wrong_password");
                done();
            });
        });
    });
});
