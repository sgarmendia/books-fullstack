import { NextFunction, Request, Response } from "express";
import { UserStatus } from "../types";
import * as userService from "../services/userService";
import { UserSchema } from "../utils/validations";

export const getRegisteredUsers = async (_req: Request, res: Response) => {
	const users = await userService.getUsers();
	res.send(users);
};

export const userSignup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validateUser = UserSchema.safeParse(req.body);
		if (!validateUser.success) {
			next(validateUser.error);
			return;
		}

		const data = await userService.signupUser(req.body);
		if (data === UserStatus.Registered) {
			res.status(409).send({ status: "error", message: UserStatus.Registered });
			return;
		} else {
			res.send(data);
		}
	} catch (error) {
		next(error);
	}
};

export const userLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validateUser = UserSchema.safeParse(req.body);
		if (!validateUser.success) {
			next(validateUser.error);
			return;
		}

		const user = await userService.loginUser(req.body);

		if (user === UserStatus.WrongPassword) {
			res
				.status(401)
				.send({ status: "error", message: UserStatus.WrongPassword });
			return;
		} else if (user === UserStatus.NotFound) {
			res.status(401).send({ status: "error", message: UserStatus.NotFound });
			return;
		} else {
			res.send(user);
		}
	} catch (error) {
		next(error);
	}
};
