import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { Contacts } from "../contacts/Contacts";

export const NestedRoutes = props => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}/`}
        render={() => <Contacts data={props.data} />}
      />
    </Switch>
  );
};
