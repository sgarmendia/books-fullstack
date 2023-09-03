import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret1234567890";

const generateToken = (data: string) => {
	const jwt = sign({ data }, JWT_SECRET, {
		expiresIn: "1h",
	});
	return jwt;
};

const verifyToken = (jwt: string) => {
	const isVerified = verify(jwt, JWT_SECRET);
	return isVerified;
};

export { generateToken, verifyToken };
