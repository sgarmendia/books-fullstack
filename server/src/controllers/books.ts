import * as bookService from "../services/bookService";
import { NextFunction, Request, Response } from "express";
import { BookSchema } from "../utils/validations";

export const getBooks = async (_req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.send(books);
};

export const getBooksById = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const book = bookService.findById(id);
	res.send(book);
};

export const upsertBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const book = req.body;
	if (book.id) {
		book.id = parseInt(book.id);
	}

	const validateBook = BookSchema.safeParse(book);
	try {
		if (!validateBook.success) {
			throw new Error("Book data validation error");
		}

		const data = await bookService.upsertBook(book);
		res.send(data);
	} catch (error) {
		next(error);
	}
};

export const deleteBookById = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const message = await bookService.deleteBook(id);
	if (message.includes("not found")) {
		res.status(401).send(message);
		return;
	}
	res.send(message);
};

export const searchBook = async (req: Request, res: Response) => {
	const searchTerm = req.params.search;
	const message = await bookService.search(searchTerm);
	if (typeof message === "string" && message === "not found.") {
		res.status(404).send(message);
		return;
	}
	res.send(message);
};
