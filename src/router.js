import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Contacts from "./Pages/contacts";
export default function Routes() {
  return (
    <Switch>
      <Route exact component={Login} path="/" />
      <Route component={SignUp} path="/signup" />
      <Route component={Contacts} path="/contacts/:id" />
    </Switch>
  );
}
