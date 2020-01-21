import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContent,
  Button,
  InputAdornment
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
export default class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <form
          noValidate
          autoComplete="off"
          onSubmit={e => this.props.handleSave(e)}
          style={{
            padding: 10
          }}
        >
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              required
              id="standard-required"
              type="text"
              margin="normal"
              name="edit"
              disabled={this.props.disabled}
              value={this.props.groupEdit}
              onChange={e => {
                this.props.setFields(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon style={{ color: "grey" }} />
                  </InputAdornment>
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ display: `${this.props.editButton}` }}
              onClick={() => this.props.handleEditGroup()}
              color="primary"
            >
              Edit
            </Button>
            <Button
              type="submit"
              style={{ display: `${this.props.saveButton}` }}
              disabled={this.props.saveDisabled}
              color="primary"
            >
              Save
            </Button>

            <Button
              color="primary"
              onClick={() => this.props.handleCancelGroups()}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </React.Fragment>
    );
  }
}
