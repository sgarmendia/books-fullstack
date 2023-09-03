import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import React from "react";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute path="/" component={Home} />
			</Switch>
		</Router>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
	const isAuthenticated = false; // Replace with your authentication logic
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default Routes;
