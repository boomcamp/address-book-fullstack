import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Modal from "../Modal/Modal";
import Zoom from "@material-ui/core/Zoom";
import styled from "styled-components";
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
      width: 0,
      height: 0,
      columns: [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        {
          title: "Home Phone",
          field: "home_phone"
        },
        {
          title: "Mobile Phone",
          field: "mobile_phone"
        },
        {
          title: "Work Phone",
          field: "work_phone"
        },
        {
          title: "  ",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <IconButton
                  onClick={() => this.props.handleModalOpen(rowData, "edit")}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                <IconButton
                  onClick={() =>
                    this.props.handleModalOpen([rowData], "delete")
                  }
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

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const {
      createContactHandler,
      changeHandler,
      selectHandler,
      handleModalClose,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact,
      addToGroup,
      addToGroupHandler,
      addAGroup,
      addAGroupHandler,
      editGroup,
      editGroupHandler,
      deleteGroup,
      deleteGroupHandler,
      groups
    } = this.props;

    const tableColumns =
      this.state.width < 770
        ? [
            { title: "First Name", field: "first_name" },
            { title: "Last Name", field: "last_name" },
            {
              title: "  ",
              render: rowData => (
                <React.Fragment>
                  <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                    <IconButton
                      onClick={() =>
                        this.props.handleModalOpen(rowData, "edit")
                      }
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                    <IconButton
                      onClick={() =>
                        this.props.handleModalOpen([rowData], "delete")
                      }
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              )
            }
          ]
        : [
            { title: "First Name", field: "first_name" },
            { title: "Last Name", field: "last_name" },
            {
              title: "Home Phone",
              field: "home_phone"
            },
            {
              title: "Mobile Phone",
              field: "mobile_phone"
            },
            {
              title: "Work Phone",
              field: "work_phone"
            },
            {
              title: "  ",
              render: rowData => (
                <React.Fragment>
                  <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                    <IconButton
                      onClick={() =>
                        this.props.handleModalOpen(rowData, "edit")
                      }
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                    <IconButton
                      onClick={() =>
                        this.props.handleModalOpen([rowData], "delete")
                      }
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              )
            }
          ];
    const allContacts = this.props.contact
      ? this.props.contact.allContacts
      : [];

    const title = this.props.groupData
      ? this.props.groupData.group_name
      : "All Contacts";

    const Div = styled.div`
      display: "flex";
      justify-content: "center";
      align-content: "center";
      flex-wrap: "wrap";
    `;
    return (
      <div>
        <MuiThemeProvider theme={this.theme}>
          <MaterialTable
            title={
              <Div>
                {this.props.groupData ? (
                  <Typography variant="h5">
                    {title}
                    <Tooltip TransitionComponent={Zoom} title="Edit Group">
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          this.props.handleModalOpen(
                            this.props.groupData,
                            "editGroup"
                          )
                        }
                        style={{ paddingLeft: "20px" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Delete Group">
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          this.props.handleModalOpen(
                            this.props.groupData,
                            "deleteGroup"
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                ) : (
                  <Typography variant="h5">{title}</Typography>
                )}
              </Div>
            }
            columns={tableColumns}
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
                onClick: (evt, data) =>
                  this.props.handleModalOpen(data, "addContact")
              },
              {
                icon: "group",
                tooltip: "Add To Group",
                onClick: (evt, data) =>
                  this.props.handleModalOpen(data, "addGroup")
              },
              {
                tooltip: "Remove All Selected Users",
                icon: "delete",
                onClick: (evt, data) =>
                  this.props.handleModalOpen(data, "delete")
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
          addAGroup={addAGroup}
          editGroup={editGroup}
          editGroupHandler={editGroupHandler}
          deleteGroup={deleteGroup}
          deleteGroupHandler={deleteGroupHandler}
          addAGroupHandler={addAGroupHandler}
          changeHandler={changeHandler}
          selectHandler={selectHandler}
          handleModalClose={handleModalClose}
          deleteContact={deleteContact}
          addToGroup={addToGroup}
          groups={groups}
        />
      </div>
    );
  }
}

export default Users;
