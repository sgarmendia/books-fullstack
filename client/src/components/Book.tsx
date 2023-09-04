import { BookId, BookType } from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";

interface BookProps {
	book: BookType;
	handleRemove: (id: BookId) => void;
	handleEditBook: (book: BookType) => void;
}
export const Book: React.FC<BookProps> = ({
	book,
	handleRemove,
	handleEditBook,
}) => {
	return (
		<>
			<ListGroup.Item
				key={book.id}
				as="li"
				className="d-flex justify-content-between align-items-start"
			>
				<CloseButton
					style={{
						display: "flex",
						justifySelf: "flex-end",
						color: "red",
					}}
					title="Delete"
					onClick={() => handleRemove(book.id)}
				/>
				<div className="ms-2 me-auto">
					<div className="fw-bold">{book.title}</div>
					<div>{book.author}</div>
					<div>{book.genre}</div>
				</div>

				<Button variant="outline-success" onClick={() => handleEditBook(book)}>
					Edit
				</Button>
			</ListGroup.Item>
		</>
	);
};
