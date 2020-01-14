import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Users from './components/Addressbook/HomePage';
import SignIn from './components/SignIn';
import Signup from './components/Signup';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={SignIn} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/signup" component={Signup} />
				<Route path="/users" component={Users} />
			</Switch>
		</Router>
	);
}

export default App;
