import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Users from "../Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      myEmailHandler,
      myPasswordHandler,
      confirmPasswordHandler,
      myUsernameHandler,
      mySubmitHandler,
      RegisterHandler,
      handleLogout,
      accessToken,
      redirect,
      redirectHandler
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            accessToken === null ? (
              <Login
                myUsernameHandler={myUsernameHandler}
                myPasswordHandler={myPasswordHandler}
                mySubmitHandler={mySubmitHandler}
                redirectHandler={redirectHandler}
              />
            ) : (
              <Users handleLogout={handleLogout} />
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
                myEmailHandler={myEmailHandler}
                myUsernameHandler={myUsernameHandler}
                myPasswordHandler={myPasswordHandler}
                confirmPasswordHandler={confirmPasswordHandler}
                RegisterHandler={RegisterHandler}
              />
            )
          }
          path="/register"
        />
      </Switch>
    );
  }
}
