import { BookId, type BookType } from "../types";
import { Book } from "./Book";

interface BooksProps {
	books: BookType[];
	onRemoveBook: (id: BookId) => void;
}

export const Books: React.FC<BooksProps> = ({ books, onRemoveBook }) => {
	return (
		<ul className="todo-list">
			{books.map((book) => (
				<li key={book.id} className={""}>
					<Book key={book.id} book={book} onRemoveBook={onRemoveBook} />
				</li>
			))}
		</ul>
	);
};
