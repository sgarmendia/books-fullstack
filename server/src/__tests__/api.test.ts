import request from "supertest";
import chai from "chai";
import app from "../index";

const expect = chai.expect;

describe("Book Routes", () => {
	describe("GET /books", () => {
		it("should get all books", (done) => {
			request(app)
				.get("/api/books")
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
				genre: "fiction",
			};
			request(app)
				.put("/api/book")
				.send(bookData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal("Book with ID 11 was added.");
					done();
				});
		});

		it("When sent with ID should update a book", (done) => {
			const bookData = {
				id: 3,
				title: "Test Book",
				author: "Test Author",
				genre: "fiction",
			};
			request(app)
				.put("/api/book")
				.send(bookData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal("Book with ID 3 updated.");
					done();
				});
		});
	});

	describe("DELETE /books", () => {
		it("should delete book with provided ID", (done) => {
			request(app)
				.delete("/api/book/3")
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
					expect(res.text).to.contain('"email":"fake@email.com"');
					done();
				});
		});

		it("Should fail if try to register the same user", (done) => {
			request(app)
				.post("/signup")
				.send(userData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(409);
					expect(res.text).to.equal("User already registered please login");
					done();
				});
		});
	});

	describe("POST /login", () => {
		it("Should login succefully with the created user", (done) => {
			request(app)
				.post("/login")
				.send(userData)
				.end((_err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.contain('"email":"fake@email.com"');
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
					expect(res.text).to.equal("wrong_password");
					done();
				});
		});
	});
});
