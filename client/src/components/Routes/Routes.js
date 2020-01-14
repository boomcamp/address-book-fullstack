import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Users from "../Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      mySubmitHandler,
      RegisterHandler,
      handleLogout,
      token,
      redirect,
      redirectHandler,
      myChangeHandler,
      ContactHandler
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            token === null ? (
              <Login
                myChangeHandler={myChangeHandler}
                mySubmitHandler={mySubmitHandler}
                redirectHandler={redirectHandler}
              />
            ) : (
              <Users
                handleLogout={handleLogout}
                ContactHandler={ContactHandler}
                myChangeHandler={myChangeHandler}
              />
            )
          }
          path="/"
        />
        <Route
          render={() =>
            redirect ? (
              <Redirect from="*" to="/" />
            ) : (
              <Registration
                myChangeHandler={myChangeHandler}
                RegisterHandler={RegisterHandler}
                redirectHandler={redirectHandler}
              />
            )
          }
          path="/register"
        />
      </Switch>
    );
  }
}
