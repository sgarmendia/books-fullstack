import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

export const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setToken, removeToken] = useAuth();
	const [{ data, loading, error }, doFetch] = useFetch<{
		email: string;
		token: string;
	}>();

	useEffect(() => {
		if (data && !user.hasToken) {
			console.log("Received JWT:", data.token);
			setToken(data.token);
		}
	}, [data, setToken]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		doFetch(`/api/${user.hasToken ? "login" : "signup"}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
	};

	return (
		<div>
			<h2>{user.hasToken ? "Login" : "Signup"}</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						type="password"
						placeholder=""
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Submit</button>
				<button type="button" onClick={() => removeToken()}>
					Logout
				</button>
			</form>
		</div>
	);
};
