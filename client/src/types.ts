export type BookId = number;

export enum Genre {
	FICTION = "fiction",
	ESSAY = "essay",
	HISTORY = "history",
	CHILDREN = "children",
}

export interface BookType {
	id: BookId;
	title: string;
	author: string;
	genre: Genre;
}

export type SaveBookType = Omit<BookType, "id"> & { id?: BookId };
