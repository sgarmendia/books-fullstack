import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import PrivateRoutes from "./helpers/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

const Books = lazy(() => import("./pages/Books"));

const App = () => {
	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path="/books" element={<Books />} />
					</Route>
					<Route path="/" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
};

export default App;
