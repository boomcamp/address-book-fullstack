import React from "react";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Zoom from "@material-ui/core/Zoom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

export default class Table extends React.Component {
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
      toggle: false,
      width: window.innerWidth,
      data: []
    };
  }

  handleClick = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };
  render() {
    const { search } = this.props;
    const tableColumns =
      this.state.width < 770
        ? [
            {
              title: "Name",
              field: "first_name",
              render: rowData => (
                <React.Fragment>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignContent="flex-start"
                  >
                    <div>
                      <Avatar>{rowData.first_name.charAt(0)}</Avatar>
                    </div>
                    <div
                      style={{ paddingTop: "10px", paddingLeft: "10px" }}
                      onClick={() =>
                        this.props.handleModalOpen(rowData, "viewContact")
                      }
                    >
                      {" "}
                      {" " + rowData.first_name + " " + rowData.last_name}
                    </div>
                  </Box>
                </React.Fragment>
              )
            },
            {
              title: "  ",
              render: rowData => (
                <React.Fragment>
                  <MDBDropdown>
                    <MDBDropdownToggle nav style={{ color: "black" }}>
                      <Tooltip title="Show items">
                        <MoreVertIcon />
                      </Tooltip>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem
                        onClick={() =>
                          this.props.handleModalOpen(rowData, "edit")
                        }
                      >
                        Edit
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        onClick={() =>
                          this.props.handleModalOpen([rowData], "delete")
                        }
                      >
                        Delete
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </React.Fragment>
              )
            }
          ]
        : [
            {
              title: "Name",
              field: "first_name",
              render: rowData => (
                <React.Fragment>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignContent="flex-start"
                  >
                    <div>
                      <Avatar>{rowData.first_name.charAt(0)}</Avatar>
                    </div>
                    <div
                      style={{ paddingTop: "10px", paddingLeft: "10px" }}
                      onClick={() =>
                        this.props.handleModalOpen(rowData, "viewContact")
                      }
                    >
                      {" "}
                      {" " + rowData.first_name + " " + rowData.last_name}
                    </div>
                  </Box>
                </React.Fragment>
              )
            },
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

    return (
      <MuiThemeProvider theme={this.theme}>
        <MaterialTable
          title={
            <div>
              {this.props.groupData ? (
                <Typography variant="h5">
                  {this.props.groupData
                    ? this.props.groupData.group_name
                    : "All Contacts"}
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
                <Typography variant="h5">
                  {this.props.groupData
                    ? this.props.groupData.group_name
                    : "All Contacts"}
                </Typography>
              )}
            </div>
          }
          columns={tableColumns}
          data={allContacts.filter(val => {
            const regex = new RegExp(search, "gi");
            if (val.first_name.match(regex) || val.last_name.match(regex)) {
              return val;
            }
            return null;
          })}
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            actionsColumnIndex: -1,
            selection: true,
            search: false
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
              onClick: (evt, data) => this.props.handleModalOpen(data, "delete")
            }
          ]}
        />
      </MuiThemeProvider>
    );
  }
}
