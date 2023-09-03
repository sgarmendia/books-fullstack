import { useState } from "react";
import { Genre, BookType, BookId, SaveBookType } from "../types";
import { Books } from "./Books";
import { Header } from "./Header";

const mockBooks: BookType[] = [
	{
		id: 1,
		title: "book1",
		author: "author1",
		genre: Genre.FICTION,
	},
	{
		id: 2,
		title: "book2",
		author: "author2",
		genre: Genre.ESSAY,
	},
	{
		id: 3,
		title: "book3",
		author: "author3",
		genre: Genre.HISTORY,
	},
];

const App = () => {
	const [books, setBooks] = useState(mockBooks);

	const handleRemove = (id: BookId) => {
		const newBooks = books.filter((book) => book.id !== id);
		setBooks(newBooks);
	};

	const handleAddBook = (book: SaveBookType) => {
		const newBook = {
			id: mockBooks.length + 1,
			...book,
		};

		const newBooks = [...mockBooks, newBook];
		setBooks(newBooks);
	};

	return (
		<div className="todoapp">
			<Header onAddBook={handleAddBook} />
			<Books onRemoveBook={handleRemove} books={books} />
		</div>
	);
};

export default App;
