import { BookId, type BookType } from "../types";

interface BookProps {
	book: BookType;
	onRemoveBook: (id: BookId) => void;
}
export const Book: React.FC<BookProps> = ({ book, onRemoveBook }) => {
	return (
		<div className="view">
			<input
				type="checkbox"
				className="toggle"
				// checked={false}
				onChange={(e) => console.log(e)}
			/>
			<label>{book.title}</label>
			{/* <label>{book.author}</label> */}
			{/* <label>{book.genre}</label> */}
			<button
				className="destroy"
				onClick={() => onRemoveBook(book.id)}
			></button>
		</div>
	);
};
