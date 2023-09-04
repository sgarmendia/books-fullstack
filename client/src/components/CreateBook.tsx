import React, { useEffect, useState } from "react";
import { Genre, SaveBookType } from "../types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AxiosInstance } from "axios";
import { BASE_URL } from "../constants";

interface SaveProps {
	show: boolean;
	book?: SaveBookType | null;
	axiosAuth: AxiosInstance;
	handleClose: () => void | undefined;
}

const CreateBook: React.FC<SaveProps> = ({
	handleClose,
	show,
	book,
	axiosAuth,
}) => {
	const [inputTitle, setinputTitle] = useState("");
	const [inputAuthor, setinputAuthor] = useState("");
	const [inputGenre, setinputGenre] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (book !== null) {
			setinputTitle(book?.title || "");
			setinputAuthor(book?.author || "");
			setinputGenre(book?.genre || "");
		}
	}, [book]);

	const handleSubmit = () => {
		if (inputAuthor === "" || inputTitle === "" || inputGenre == "") {
			setMessage("Please fill all the fields");
			return;
		}

		const upsertBook = {
			id: book?.id,
			author: inputAuthor,
			title: inputTitle,
			genre: inputGenre,
		};

		axiosAuth
			.put(`${BASE_URL}/booksapi/book`, upsertBook)
			.then(({ data }) => console.log(data));

		handleHide();
	};

	const handleHide = () => {
		setinputTitle("");
		setinputAuthor("");
		setinputGenre("");
		setMessage("");
		handleClose();
	};

	return (
		<Modal show={show} onHide={() => handleHide()}>
			<Modal.Header closeButton>
				<Modal.Title>{book ? "Edit book" : "Add new book"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Book title"
							value={inputTitle}
							onChange={(e) => setinputTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="author">
						<Form.Label>Author</Form.Label>
						<Form.Control
							type="text"
							placeholder="Author"
							value={inputAuthor}
							onChange={(e) => setinputAuthor(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="author">
						<Form.Label>Select</Form.Label>
						<Form.Select
							value={inputGenre}
							onChange={(e) => setinputGenre(e.target.value)}
						>
							<option>Pick a genre</option>
							<option value={Genre.CHILDREN}>{Genre.CHILDREN}</option>
							<option value={Genre.ESSAY}>{Genre.ESSAY}</option>
							<option value={Genre.FICTION}>{Genre.FICTION}</option>
							<option value={Genre.HISTORY}>{Genre.HISTORY}</option>
						</Form.Select>
					</Form.Group>
				</Form>
				<p style={{ color: "red" }}>{message}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={() => handleClose()}>
					Cancel
				</Button>
				<Button variant="outline-success" onClick={() => handleSubmit()}>
					Save Book
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateBook;
