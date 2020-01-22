import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, TextField, Grid, Button,Snackbar } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Groups from "./modal/newGroups";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Contacts from "./modal/newContacts";
import Icon from "@material-ui/core/Icon";
export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openModal: false,
      groupName: "",
      snackbarState: false,
      snackbarMessage: "",
      icon: ""
    };
  }
  
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };
  handleCreateGroups = () => {
    const id = localStorage.getItem("id");
    if (this.state.groupName === "") {
      this.handleOpenSnackbar("Pls Fill up Group Name", "#9a0707");
      this.setState({
        icon: "error"
      });
    } else {
      axios
        .post(`/createGroup`, {
          userid: id,
          group_name: this.state.groupName
        })
        .then(res => {
          window.location.reload();
          this.handleOpenSnackbar("Successfully Add New Group", "Darkgreen");
          this.setState({
            groupName: "",
            icon: "check"

          });
        });
    
      this.props.handleCloseModal();
    }
  };
  handleCloseModal = () => {
    this.setState({
      open: false,
      openModal: false,
      groupName: ""
    });
  };
  handleOpenModal = e => {
    if (e == 1) {
      this.setState({
        openModal: true
      });
    } else {
      this.setState({
        open: true
      });
    }
  };
  handleTarget = e => {
    this.setState({
      groupName: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
         <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ marginRight: 5 }}>{this.state.icon}</Icon>
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <Box>
            <Tooltip title="Add New Contact">
              <IconButton onClick={() => this.handleOpenModal(1)}>
                <div
                  style={{
                    padding: "20px"
                  }}
                >
                  <PersonAddIcon />
                </div>
              </IconButton>
            </Tooltip>
            <Contacts
              handleCloseModal={this.handleCloseModal}
              openModal={this.state.openModal}
            />
          </Box>

          <Box>
            <Tooltip title="Add New Group">
              <IconButton onClick={() => this.handleOpenModal(2)}>
                <div
                  style={{
                    padding: "20px"
                  }}
                >
                  <GroupAddIcon />
                </div>
              </IconButton>
            </Tooltip>
            <Groups
              handleCloseModal={this.handleCloseModal}
              open={this.state.open}
              handleCreateGroups={this.handleCreateGroups}
              groupName={this.state.groupName}
              handleTarget={this.handleTarget}
            />
          </Box>
        </div>
      </React.Fragment>
    );
  }
}
