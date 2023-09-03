import { SaveBookType } from "../types";
import { CreateBook } from "./CreateBook";

interface HeaderProps {
	onAddBook: (book: SaveBookType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddBook }) => {
	return (
		// toggle header class when saving editing
		<header className="header">
			<h1>Books</h1>

			<CreateBook saveBook={onAddBook} />
		</header>
	);
};
