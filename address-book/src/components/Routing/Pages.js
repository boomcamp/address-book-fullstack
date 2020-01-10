import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../SignUp/Signup";
import MainPage from "../../AddressBookPage/MainPage";

export default function Pages() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/addressbook" exact component={MainPage} />
      </Switch>
    </>
  );
}
