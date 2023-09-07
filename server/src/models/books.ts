import { Book, UpsertBookData } from "../types";
import booksData from "../data/books.json";

const books = booksData as Book[];

export class BookModel {
	static async getAll() {
		return books;
	}

	static async findById({ id }: { id: number }) {
		const book = books.find((b) => b.id === id);
		if (!book) {
			return false;
		}
		return book;
	}

	static async create(book: UpsertBookData) {
		const newBook = {
			id: Math.max(...books.map((b) => b.id)) + 1,
			...book,
		};

		books.push(newBook);

		return newBook;
	}

	static async delete({ id }: { id: number }) {
		const bookIndex = books.findIndex((b) => b.id === id);
		if (bookIndex === -1) return false;

		books.splice(bookIndex, 1);
		return true;
	}

	static async update(book: UpsertBookData) {
		const bookIndex = books.findIndex((b) => b.id === book.id);
		if (bookIndex === -1) return false;

		const bookToUpdate = {
			...books[bookIndex],
			...book,
		};
		books[bookIndex] = bookToUpdate;
		return bookToUpdate;
	}

	static async search(term: string) {
		const book = books.find((b) => {
			return (
				b.title.includes(term) ||
				b.author.includes(term) ||
				b.genre.includes(term)
			);
		});

		if (!book) return false;

		return book;
	}
}
