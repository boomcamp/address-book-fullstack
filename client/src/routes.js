import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import User from "./components/User/User";

export default class Routes extends React.Component {
  render() {
    const {
      myhandleChange,
      myhandleLogin,
      myhandleSignup,
      myhandleLogout,
      token,
      success,
      handleSuccess,
      passconfirm
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            token ? (
              <User myhandleLogout={myhandleLogout} />
            ) : (
              <Login
                myhandleChange={myhandleChange}
                myhandleLogin={myhandleLogin}
                handleSuccess={handleSuccess}
              />
            )
          }
          path="/"
        />
        <Route
          render={() =>
            success ? (
              <Redirect from="*" to="/" />
            ) : (
              <Registration
                myhandleChange={myhandleChange}
                myhandleSignup={myhandleSignup}
                passconfirm={passconfirm}
              />
            )
          }
          path="/registration"
        />
      </Switch>
    );
  }
}
