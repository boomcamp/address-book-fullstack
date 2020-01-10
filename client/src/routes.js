import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      handleLogin,
      handleSignUp,
      accessToken,
      userId,
      handleLogout,
      regSuccess,
      submitHandler,
      changeHandler
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            accessToken ? (
              <Users
                handleLogout={handleLogout}
                accessToken={accessToken}
                userId={userId}
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
