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

		const message = await bookService.upsertBook(book);
		res.send(message);
	} catch (error) {
		next(error);
	}
};

export const deleteBookById = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const message = await bookService.deleteBook(id);
	res.send(message);
};
