import { BookModel } from "../models/books";
import { UpsertBookData } from "../types";

export const getBooks = async () => await BookModel.getAll();

export const upsertBook = async (book: UpsertBookData) => {
	if (!book.id) {
		const createdBook = await BookModel.create(book);
		return `Book with ID ${createdBook.id} was added.`;
	}

	const updatedBook = await BookModel.update(book);

	return updatedBook
		? `Book with ID ${updatedBook.id} updated.`
		: `Unable to update.`;
};

export const findById = async (id: number) => {
	const book = await BookModel.findById({ id });
	if (!book) {
		return `No book found with id ${id}`;
	}
	return book;
};

export const deleteBook = async (id: number) => {
	const isBookDeleted = await BookModel.delete({ id });
	if (isBookDeleted) return `Book with ID ${id} was deleted.`;

	return `Book with ID ${id} not found.`;
};
