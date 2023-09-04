import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { authRequest } from "../helpers/authRequest";
import { BookType, BookId } from "../types";
import { Book } from "../components/Book";
import { BASE_URL } from "../constants";
import AddBookModal from "../components/CreateBook";

const Books = () => {
	const [books, setBooks] = useState<BookType[]>([]);
	const [show, setShow] = useState(false);
	const [editBook, setEditBook] = useState<BookType | null>(null);

	const [cookies] = useCookies(["token", "email"]);
	const axiosAuth = authRequest(cookies.token);

	useEffect(() => {
		if (!show) {
			axios
				.get(`${BASE_URL}/booksapi/books`)
				.then(({ data }) => setBooks(data));
		}
	}, [show]);

	const handleRemove = (id: BookId) => {
		axiosAuth
			.delete(`${BASE_URL}/booksapi/book/${id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					const newBooks = books.filter((book) => book.id !== id);
					setBooks(newBooks);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleAddBook = () => {
		setShow(true);
	};

	const handleEditBook = (bookData: BookType) => {
		setEditBook(bookData);
		setShow(true);
	};

	const handleClose = () => {
		setEditBook(null);
		setShow(false);
	};

	return (
		<>
			<AddBookModal
				book={editBook}
				show={show}
				handleClose={handleClose}
				axiosAuth={axiosAuth}
			/>
			<Container>
				<ListGroup as="ol">
					<Button variant="success" onClick={() => handleAddBook()}>
						Add book
					</Button>
					{books.map((book) => (
						<Book
							key={book.id}
							book={book}
							handleEditBook={handleEditBook}
							handleRemove={handleRemove}
						/>
					))}
				</ListGroup>
			</Container>
		</>
	);
};

export default Books;
