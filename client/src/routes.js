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
      passconfirm,
      addContact,
      editContact,
      handleChange,
      handleOpenAdd,
      handleCloseAdd,
      toggleAdd,
      handleOpenEdit,
      handleCloseEdit,
      toggleEdit,
      rowValue,
      deleteContact,
      handleOpenDel,
      handleCloseDel,
      toggleDel,
      addGroup,
      handleOpenGroup,
      handleCloseGroup,
      toggleG,
      handleOpenSide,
      handleCloseSide,
      left
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            token ? (
              <User
                myhandleLogout={myhandleLogout}
                addContact={addContact}
                editContact={editContact}
                handleChange={handleChange}
                handleOpenAdd={handleOpenAdd}
                handleCloseAdd={handleCloseAdd}
                toggleAdd={toggleAdd}
                handleOpenEdit={handleOpenEdit}
                handleCloseEdit={handleCloseEdit}
                toggleEdit={toggleEdit}
                rowValue={rowValue}
                deleteContact={deleteContact}
                handleOpenDel={handleOpenDel}
                handleCloseDel={handleCloseDel}
                toggleDel={toggleDel}
                addGroup={addGroup}
                handleOpenGroup={handleOpenGroup}
                handleCloseGroup={handleCloseGroup}
                toggleG={toggleG}
                handleOpenSide={handleOpenSide}
                handleCloseSide={handleCloseSide}
                left={left}
              />
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
