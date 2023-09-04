import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../constants";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [cookies, setCookie, removeCookie] = useCookies(["token", "email"]);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const url = `${BASE_URL}/${cookies.token ? "login" : "signup"}`;
		try {
			const response = await axios.post(url, { email, password });

			if (response.status === 200) {
				setCookie("token", response.data.token);
				setCookie("email", response.data.email);
				navigate("/books");
			}
		} catch (err) {
			const error = err as AxiosError;

			console.log(error.response);

			switch (error.response?.status) {
				case 409:
					setCookie("token", "login");
					removeCookie("email");
					setMessage("Email is registered please login");
					break;
				case 401:
					removeCookie("email");
					setMessage("User not found / Wrong password");
					break;
				default:
					setMessage("Signup/Login error");
					break;
			}
		}
	};

	return (
		<Container>
			<h2>{cookies.token ? "login" : "signup"}</h2>
			<h4>{message}</h4>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Text className="text-muted">
						We will never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Login;
