import React from "react";
import { Route, Switch } from "react-router-dom";

import Contacts from "../Contacts/Contacts";

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
      search,
      groupData,
      viewContact,
      editContact
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() => (
            <Contacts
              handleLogout={handleLogout}
              accessToken={accessToken}
              viewContact={viewContact}
              createContactHandler={createContactHandler}
              changeHandler={changeHandler}
              selectHandler={selectHandler}
              isLoading={isLoading}
              handleModalClose={handleModalClose}
              handleModalOpen={handleModalOpen}
              isModal={isModal}
              currentData={currentData}
              editContact={editContact}
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
              search={search}
              groupData={groupData}
            />
          )}
          path="/"
        />
      </Switch>
    );
  }
}
