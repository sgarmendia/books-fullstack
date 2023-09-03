import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

type BookId = number;
export enum Genre {
	Fiction = "fiction",
	Essay = "essay",
	History = "history",
	Children = "children",
}

export type Book = {
	id: BookId;
	title: string;
	author: string;
	genre: Genre;
};

export type UpsertBookData = Omit<Book, "id"> & { id?: BookId };

export enum UserStatus {
	Unregistered = "unregistered",
	Registered = "registered",
	NotFound = "not_found",
	WrongPassword = "wrong_password",
}

export type User = {
	id: string;
	email: string;
	password: string;
};

export type UserData = Omit<User, "id">;

export type RequestWithJWT = Request & {
	user?: JwtPayload; // | { id: string };
};

export enum SessionStatus {
	Invalid = "invalid_token",
	Valid = "valid_token",
}
