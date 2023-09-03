import { z } from "zod";
import { Genre } from "../types";

const GenreEnum = z.nativeEnum(Genre);

export const BookSchema = z.object({
	id: z.number().optional(),
	title: z.string(),
	author: z.string(),
	genre: GenreEnum,
});

export const UserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
