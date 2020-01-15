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
      createContactHandler,
      isLoading,
      handleEditOpen,
      handleAddClose,
      handleAddOpen,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact,
      contact,
      groups,
      addToGroup,
      addToGroupHandler,
      fetchContact
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
                groups={groups}
                addToGroup={addToGroup}
                addToGroupHandler={addToGroupHandler}
                fetchContact={fetchContact}
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
