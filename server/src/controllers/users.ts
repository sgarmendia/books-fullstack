import { NextFunction, Request, Response } from "express";
import { UserStatus } from "../types";
import * as userService from "../services/userService";
import { UserSchema } from "../utils/validations";

export const getRegisteredUsers = async (_req: Request, res: Response) => {
	const users = await userService.getUsers();
	res.send(users);
};

export const userSignup = async (
	{ body }: Request,
	res: Response,
	next: NextFunction
) => {
	const validateUser = UserSchema.safeParse(body);

	try {
		if (!validateUser.success) {
			next(validateUser.error);
		}

		const data = await userService.signupUser(body);
		if (data === UserStatus.Registered) {
			res.status(409).send("User already registered please login");
		} else {
			res.send(data);
		}
	} catch (error) {
		next(error);
	}
};

export const userLogin = async (
	{ body }: Request,
	res: Response,
	next: NextFunction
) => {
	const validateUser = UserSchema.safeParse(body);

	try {
		if (!validateUser.success) {
			next(validateUser.error);
		}

		const user = await userService.loginUser(body);

		if (user === UserStatus.WrongPassword) {
			res.status(401).send(UserStatus.WrongPassword);
		} else {
			res.send(user);
		}
	} catch (error) {
		next(error);
	}
};
