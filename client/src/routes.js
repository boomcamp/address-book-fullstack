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
      handleModalClose,
      handleModalOpen,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      editGroupHandler,
      deleteGroupHandler,
      editGroup,
      deleteGroup,
      deleteContact,
      contact,
      groups,
      search,
      addToGroup,
      addToGroupHandler,
      fetchContact,
      selectHandler,
      addAGroup,
      addAGroupHandler,
      groupData,
      viewContact,
      editContact,
      confirmSignup,
      pName
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            accessToken ? (
              <Sidenav
                pName={pName}
                handleLogout={handleLogout}
                createContactHandler={createContactHandler}
                changeHandler={changeHandler}
                selectHandler={selectHandler}
                isLoading={isLoading}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
                isModal={isModal}
                viewContact={viewContact}
                currentData={currentData}
                editContact={editContact}
                editContactHandler={editContactHandler}
                deleteContactHandler={deleteContactHandler}
                deleteContact={deleteContact}
                contact={contact}
                groups={groups}
                search={search}
                groupData={groupData}
                addAGroup={addAGroup}
                addAGroupHandler={addAGroupHandler}
                addToGroup={addToGroup}
                addToGroupHandler={addToGroupHandler}
                editGroup={editGroup}
                editGroupHandler={editGroupHandler}
                deleteGroup={deleteGroup}
                deleteGroupHandler={deleteGroupHandler}
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
                confirmSignup={confirmSignup}
              />
            )
          }
          path="/register"
        />
      </Switch>
    );
  }
}
