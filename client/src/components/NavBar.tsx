import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const NavBar = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["token", "email"]);

	const navigate = useNavigate();

	const logout = () => {
		removeCookie("token");
		removeCookie("email");
		navigate("/");
	};

	const login = () => {
		setCookie("token", "login");
		removeCookie("email");
		navigate("/");
	};

	return (
		<Navbar className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#">Books App</Navbar.Brand>
				<Navbar.Toggle />
				<ButtonGroup aria-label="Basic example">
					<Button variant="secondary" onClick={() => logout()}>
						Log out
					</Button>

					<Button variant="success" onClick={() => login()}>
						Login
					</Button>
				</ButtonGroup>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Signed in as: <span>{cookies.email}</span>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
