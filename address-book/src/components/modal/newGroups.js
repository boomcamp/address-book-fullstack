import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, TextField, Grid, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Icon from "@material-ui/core/Icon";
import Table from "../addressbooktable";
import Search from "../search";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import {} from "@material-ui/core";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
// import Contacts from "@material-ui/icons/Contacts";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import PeopleOutline from "@material-ui/icons/PeopleOutline";

export default class NewGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }


  render() {
    const {open, handleCloseModal} = this.props

    return (
      <React.Fragment>
        <Dialog
          maxWidth="sm"
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Group</DialogTitle>
          <DialogContent>
            <TextField
              //   className={classes.textField}
              required
              id="standard-required"
              error={this.state.groupNameError}
              label="Group Name"
              value={this.state.groupName}
              onChange={e =>
                this.setState({
                  groupName: e.target.value
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              onClick={() =>
                handleCloseModal()
              }
            >
              Add
            </Button>

            <Button
              onClick={() =>
               handleCloseModal()
              }
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
