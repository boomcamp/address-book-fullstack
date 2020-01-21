import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, TextField, Grid, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Groups from "./modal/newGroups";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Contacts from "./modal/newContacts";
export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openModal: false,
      groupName: ""
    };
  }
  handleCreateGroups = () => {
    const id = localStorage.getItem("id");
    if (this.state.groupName === "") {
      alert("error");
    } else {
      axios
        .post(`/createGroup`, {
          userid: id,
          group_name: this.state.groupName
        })
        .then(res => {
          window.location.reload();
          this.setState({
            groupName: ""
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
