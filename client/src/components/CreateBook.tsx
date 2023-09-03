import React, { useState } from "react";
import { SaveBookType, Genre } from "../types";

interface SaveProps {
	saveBook: (book: SaveBookType) => void;
}

export const CreateBook: React.FC<SaveProps> = ({ saveBook }) => {
	const [inputTitle, setinputTitle] = useState("");
	const [inputAuthor, setinputAuthor] = useState("");
	const [inputGenre, setinputGenre] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		saveBook({ title: inputTitle, author: "someauthor", genre: Genre.ESSAY });
		setinputTitle("");
		setinputAuthor("");
		setinputGenre("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				name="title"
				type="text"
				className="new-todo"
				value={inputTitle}
				onChange={(e) => console.log(e.target.value)}
				onKeyDown={() => {}}
				autoFocus
			/>
			<input
				name="author"
				type="text"
				className="new-todo"
				value={inputAuthor}
				onChange={(e) => console.log(e.target.value)}
				onKeyDown={() => {}}
				autoFocus
			/>
			<input
				name="genre"
				type="text"
				className="new-todo"
				value={inputGenre}
				onChange={(e) => console.log(e.target.value)}
				onKeyDown={() => {}}
				autoFocus
			/>
		</form>
	);
};
