import { useState } from "react";

type AuthState = {
	token: string | null;
	hasToken: boolean;
};

function useAuth(): [AuthState, (token: string) => void, () => void] {
	const [state, setState] = useState<AuthState>({
		token: localStorage.getItem("token"),
		hasToken: !!localStorage.getItem("token"),
	});

	const login = (token: string) => {
		localStorage.setItem("token", token);
		setState((prevState) => ({
			...prevState,
			token,
			hasToken: true,
		}));
	};

	const logout = () => {
		localStorage.removeItem("token");
		setState((prevState) => ({
			...prevState,
			token: null,
			hasToken: false,
		}));
	};

	return [state, login, logout];
}

export default useAuth;
