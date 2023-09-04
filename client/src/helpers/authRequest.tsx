import axios from "axios";

export const authRequest = (token: string) => {
	const instance = axios.create({
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return instance;
};
