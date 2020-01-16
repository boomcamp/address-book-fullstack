import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import SignIn from "./Components/Login/signIn";
import SignUp from "./Components/Register/SignUp";
import AddressBook from "./Components/AddressBook/addressBook";

function App() {
  const [redirect, setRedirect] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        {redirect || localStorage.getItem("Token") ? (
          <Redirect to="/addressbook" />
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            render={props => <SignIn setRedirect={setRedirect} />}
          />
          <Route
            path="/signin"
            render={props => <SignIn setRedirect={setRedirect} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/addressbook" component={AddressBook} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
