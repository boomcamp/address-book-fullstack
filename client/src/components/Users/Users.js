import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { Tooltip } from "@material-ui/core";
import Modal from "../Modal/Modal";
import Zoom from "@material-ui/core/Zoom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

class Users extends React.Component {
  constructor() {
    super();
    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: "#4caf50"
        },
        secondary: {
          main: "#75dcf7"
        }
      }
    });
    this.state = {
      columns: [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        {
          title: "  ",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <IconButton
                  onClick={() => this.props.handleEditOpen(rowData, "edit")}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                <IconButton
                  onClick={() => this.props.handleEditOpen([rowData], "delete")}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      data: []
    };
  }

  render() {
    const {
      createContactHandler,
      changeHandler,
      handleEditOpen,
      handleAddOpen,
      handleAddClose,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact,
      addToGroup,
      addToGroupHandler,
      groups
    } = this.props;

    const allContacts = this.props.contact
      ? this.props.contact.allContacts
      : [];

    return (
      <div>
        <MuiThemeProvider theme={this.theme}>
          <MaterialTable
            title="All Contacts"
            columns={this.state.columns}
            data={allContacts}
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10,
              actionsColumnIndex: -1,
              selection: true,
              grouping: true
            }}
            actions={[
              {
                icon: "add",
                tooltip: "Add Contact",
                isFreeAction: true,
                onClick: handleAddOpen
              },
              {
                icon: "group",
                tooltip: "Add To Group",
                onClick: (evt, data) =>
                  this.props.handleEditOpen(data, "addGroup")
              },
              {
                tooltip: "Remove All Selected Users",
                icon: "delete",
                onClick: (evt, data) =>
                  this.props.handleEditOpen(data, "delete")
              }
            ]}
          />
        </MuiThemeProvider>
        <Modal
          isModal={isModal}
          currentData={currentData}
          createContactHandler={createContactHandler}
          editContactHandler={editContactHandler}
          deleteContactHandler={deleteContactHandler}
          addToGroupHandler={addToGroupHandler}
          changeHandler={changeHandler}
          handleAddClose={handleAddClose}
          handleEditOpen={handleEditOpen}
          handleAddOpen={handleAddOpen}
          deleteContact={deleteContact}
          addToGroup={addToGroup}
          groups={groups}
        />
      </div>
    );
  }
}

export default Users;
