import { NextFunction, Response } from "express";
import { RequestWithJWT, SessionStatus } from "../types";
import { verifyToken } from "../utils/jwt";

export const verifyJWT = (
	req: RequestWithJWT,
	res: Response,
	next: NextFunction
) => {
	try {
		const jwtByUser = (req.headers.authorization as string) || "";
		const jwt = jwtByUser.split(" ").pop();
		const isUser = verifyToken(`${jwt}`) as { id: string };
		if (!isUser) {
			res.status(401);
			res.send(SessionStatus.Invalid);
		} else {
			req.user = isUser;
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(400);
		res.send(SessionStatus.Invalid);
	}
};
