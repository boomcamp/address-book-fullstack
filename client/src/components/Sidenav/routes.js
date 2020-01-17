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
      selectHandler,
      isLoading,
      handleModalOpen,
      handleModalClose,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact,
      contact,
      addToGroup,
      addToGroupHandler,
      addAGroup,
      addAGroupHandler,
      editGroup,
      editGroupHandler,
      deleteGroup,
      deleteGroupHandler,
      searchHandler,
      groups,
      groupData
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
              selectHandler={selectHandler}
              isLoading={isLoading}
              handleModalClose={handleModalClose}
              handleModalOpen={handleModalOpen}
              isModal={isModal}
              currentData={currentData}
              editContactHandler={editContactHandler}
              deleteContactHandler={deleteContactHandler}
              deleteContact={deleteContact}
              contact={contact}
              addToGroup={addToGroup}
              addToGroupHandler={addToGroupHandler}
              addAGroup={addAGroup}
              addAGroupHandler={addAGroupHandler}
              editGroup={editGroup}
              editGroupHandler={editGroupHandler}
              deleteGroup={deleteGroup}
              deleteGroupHandler={deleteGroupHandler}
              searchHandler={searchHandler}
              groups={groups}
              groupData={groupData}
            />
          )}
          path="/"
        />
      </Switch>
    );
  }
}
