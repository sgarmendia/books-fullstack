import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Books from "./pages/Books";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [cookies] = useCookies(["token"]);

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Login />} />
				{cookies.token && <Route path="/books" element={<Books />} />}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
