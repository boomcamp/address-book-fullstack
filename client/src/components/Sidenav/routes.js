import React from "react";
import { Route, Switch } from "react-router-dom";

import Users from "../Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      accessToken,
      handleLogout,
      createContactHandler,
      changeHandler,
      isLoading,
      handleEditOpen,
      handleAddOpen,
      handleAddClose,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact,
      contact,
      addToGroup,
      addToGroupHandler,
      groups
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
              isLoading={isLoading}
              handleAddClose={handleAddClose}
              handleEditOpen={handleEditOpen}
              handleAddOpen={handleAddOpen}
              isModal={isModal}
              currentData={currentData}
              editContactHandler={editContactHandler}
              deleteContactHandler={deleteContactHandler}
              deleteContact={deleteContact}
              contact={contact}
              addToGroup={addToGroup}
              addToGroupHandler={addToGroupHandler}
              groups={groups}
            />
          )}
          path="/"
        />
      </Switch>
    );
  }
}
