import React from "react";
import { Route, Switch } from "react-router-dom";

import Users from "../Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      accessToken,
      handleLogout,
      createContactHandler,
      changeHandler
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <Users
              handleLogout={handleLogout}
              accessToken={accessToken}
              createContactHandler={createContactHandler}
              changeHandler={changeHandler}
            />
          )}
          path="/"
        />
      </Switch>
    );
  }
}
