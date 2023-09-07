import { render, fireEvent } from "@testing-library/react";
import { Book } from "../Book";
import { BookType, Genre } from "../../types";

describe("Book component", () => {
	const mockRemove = jest.fn();
	const mockEdit = jest.fn();
	const dummyBook: BookType = {
		id: 1,
		title: "Book Title",
		author: "Author Name",
		genre: Genre.CHILDREN,
	};

	it("renders without crashing", () => {
		render(
			<Book
				book={dummyBook}
				handleRemove={mockRemove}
				handleEditBook={mockEdit}
			/>
		);
	});

	it("calls handleRemove function when delete button is clicked", () => {
		const { getByTitle } = render(
			<Book
				book={dummyBook}
				handleRemove={mockRemove}
				handleEditBook={mockEdit}
			/>
		);

		fireEvent.click(getByTitle("Delete"));
		expect(mockRemove).toHaveBeenCalledWith(dummyBook.id);
	});

	it("calls handleEditBook function when edit button is clicked", () => {
		const { getByText } = render(
			<Book
				book={dummyBook}
				handleRemove={mockRemove}
				handleEditBook={mockEdit}
			/>
		);

		fireEvent.click(getByText("Edit"));
		expect(mockEdit).toHaveBeenCalledWith(dummyBook);
	});

	it("renders book data correctly", () => {
		const { getByText } = render(
			<Book
				book={dummyBook}
				handleRemove={mockRemove}
				handleEditBook={mockEdit}
			/>
		);

		expect(getByText(dummyBook.title)).toBeTruthy();
		expect(getByText(dummyBook.author)).toBeTruthy();
		expect(getByText(dummyBook.genre)).toBeTruthy();
	});
});
