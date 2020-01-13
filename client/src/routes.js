import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Sidenav from "./components/Sidenav/Sidenav";

export default class Routes extends React.Component {
  render() {
    const {
      handleLogin,
      handleSignUp,
      accessToken,
      handleLogout,
      regSuccess,
      submitHandler,
      changeHandler,
      createContactHandler
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            accessToken ? (
              <Sidenav
                handleLogout={handleLogout}
                createContactHandler={createContactHandler}
                changeHandler={changeHandler}
              />
            ) : (
              <Login
                handleLogin={handleLogin}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
              />
            )
          }
          path="/"
        />
        <Route
          render={() =>
            regSuccess ? (
              <Redirect from="*" to="/" />
            ) : (
              <Registration
                handleSignUp={handleSignUp}
                changeHandler={changeHandler}
              />
            )
          }
          path="/register"
        />
      </Switch>
    );
  }
}
