import request from "supertest";
import chai from "chai";
import app from "../index";

import { encrypt } from "../utils/auth";

import { UserData, Genre } from "../types";
import { JwtPayload } from "jsonwebtoken";

const expect = chai.expect;

const loginUserAndGetToken = async (userData: UserData) => {
	const response = await request(app).post("/signup").send(userData);
	return response.body.token;
};

describe("Book Routes", () => {
	let token: JwtPayload;

	before(async () => {
		const hashedPassword = await encrypt("testpassword");
		const userData = {
			email: "testuser@email.com",
			password: hashedPassword,
		};
		token = await loginUserAndGetToken(userData);
	});

	describe("GET /books", () => {
		it("should get all books", (done) => {
			request(app)
				.get("/booksapi/books")
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.be.an("array");
					done();
				});
		});
	});

	describe("PUT /book", () => {
		it("When sent with no ID should create a book", (done) => {
			const bookData = {
				title: "Test Book",
				author: "Test Author",
				genre: Genre.Fiction,
			};
			request(app)
				.put("/booksapi/book")
				.set("Authorization", `Bearer ${token}`)
				.send(bookData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.message).to.equal("Book with ID 11 was added.");
					done();
				});
		});

		it("When sent with ID should update a book", (done) => {
			const bookData = {
				id: 3,
				title: "Updated Test Book",
				author: "Updated Test Author",
				genre: Genre.Children,
			};
			request(app)
				.put("/booksapi/book")
				.set("Authorization", `Bearer ${token}`)
				.send(bookData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.message).to.equal("Book with ID 3 updated.");
					done();
				});
		});
	});

	describe("DELETE /books", () => {
		it("should delete book with provided ID", (done) => {
			request(app)
				.delete("/booksapi/book/3")
				.set("Authorization", `Bearer ${token}`)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal("Book with ID 3 was deleted.");
					done();
				});
		});
	});
});

describe("User Routes", () => {
	const userData = {
		email: "fake@email.com",
		password: "password",
	};

	describe("POST /signup", () => {
		it("Should register a new user", (done) => {
			request(app)
				.post("/signup")
				.send(userData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.email).to.equal(userData.email);
					done();
				});
		});

		it("Should fail if try to register the same user", (done) => {
			request(app)
				.post("/signup")
				.send(userData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(409);
					expect(res.body).to.deep.equal({
						status: "error",
						message: "registered",
					});
					done();
				});
		});
	});

	describe("POST /login", () => {
		it("Should login successfully with the created user", (done) => {
			request(app)
				.post("/login")
				.send(userData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.email).to.equal(userData.email);
					done();
				});
		});

		it("Should fail with the wrong password", (done) => {
			userData.password = "badpassword";
			request(app)
				.post("/login")
				.send(userData)
				.end((_err, res) => {
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
