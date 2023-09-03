import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			errors: err.errors.map((error) => ({
				path: error.path.join("."),
				message: error.message,
			})),
		});
	}

	if (err.message && typeof err.message === "string") {
		return res.status(500).json({
			error: err.message,
		});
	}

	console.error({ "Error stack": err.stack });
	return res.status(500).send("Something went wrong!");
};

export default errorHandler;
