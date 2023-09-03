import { v4 as uuidv4 } from "uuid";
import { User, UserData } from "../types";
import usersData from "../data/users.json";

const users = usersData as User[];

export class UserModel {
	static async getAll() {
		return users;
	}

	static async findOne({ email }: { email: string }) {
		const user = users.find((user) => user.email === email);
		if (!user) {
			return null;
		}
		return user;
	}

	static async create({ email, password }: UserData) {
		const newUser = {
			id: uuidv4(),
			email,
			password,
		};

		users.push(newUser);

		return { id: newUser.id, email };
	}

	static async delete({ id }: { id: string }) {
		const userIndex = users.findIndex((user) => user.id === id);
		if (userIndex === -1) return false;

		users.splice(userIndex, 1);
		return true;
	}

	static async update({ id, input }: { id: string; input: UserData }) {
		const userIndex = users.findIndex((user) => user.id === id);
		if (userIndex === -1) return false;

		users[userIndex] = {
			...users[userIndex],
			...input,
		};

		return users[userIndex];
	}
}
