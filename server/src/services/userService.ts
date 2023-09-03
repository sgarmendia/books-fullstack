import { UserModel } from "../models/users";
import { encrypt, verify } from "../utils/auth";
import { generateToken } from "../utils/jwt";
import { User, UserStatus } from "../types";

export const getUsers = async () => await UserModel.getAll();

export const signupUser = async ({ email, password }: User) => {
	const checkUser = await UserModel.findOne({ email });
	if (checkUser) return UserStatus.Registered;

	const hashedPassword = await encrypt(password);
	const registeredNewUser = await UserModel.create({
		email,
		password: hashedPassword,
	});

	const token = generateToken(email);

	return { token, email: registeredNewUser.email };
};

export const loginUser = async ({ email, password }: User) => {
	const user = await UserModel.findOne({ email });
	if (!user) return UserStatus.NotFound;

	const passwordHash = user.password;
	const isCorrect = await verify(password, passwordHash);

	if (!isCorrect) return UserStatus.WrongPassword;

	const token = generateToken(user.email);
	const data = {
		token,
		email: user.email,
	};
	return data;
};
