import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

function App() {
	const [redirect, setRedirect] = useState(false);

	return (
		<div className="App">
			<BrowserRouter>
				{redirect || localStorage.getItem("Token") ? (
					<Redirect to="/home" />
				) : null}
				<Switch>
					<Route
						exact
						path="/"
						render={props => <Signin setRedirect={setRedirect} />}
					/>
					<Route
						path="/login"
						render={props => <Signin setRedirect={setRedirect} />}
					/>
					<Route path="/register" component={Signup} />
					<Route path="/home" component={Home} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
