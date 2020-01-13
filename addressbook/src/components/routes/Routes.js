import React from "react";
import { Div } from "../../style";
import { Route, Switch } from "react-router-dom";
import { Login } from "../login/Login";
import { Register } from "../register/Register";
import { SideNav } from "../SideNav/SideNav";

export const Routes = props => {
  const { user } = props;
  return (
    <Div>
      <Switch>
        {user.token ? (
          <Route exact path="/" render={() => <SideNav data={props} />} />
        ) : (
          <Route exact path="/" render={() => <Login data={props} />} />
        )}
        <Route path="/register" render={() => <Register data={props} />} />
      </Switch>
    </Div>
  );
};
