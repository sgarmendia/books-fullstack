import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const Books = lazy(() => import("./pages/Books"));

const App = () => {
	const [cookies] = useCookies(["token"]);

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Login />} />
					{cookies.token && <Route path="/books" element={<Books />} />}
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
};

export default App;
