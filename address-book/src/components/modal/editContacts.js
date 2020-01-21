import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PhoneIcon from "@material-ui/icons/Phone";

export default class EditContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ""
    };
  }

  handleUpdateContacts = () => {
    const id = localStorage.getItem("idEdit");
    axios.patch(`/addressbook/update/${id}`, {
      first_name: this.props.fname,
      last_name: this.props.lname,
      home_phone: this.props.homephone,
      mobile_phone: this.props.mobilephone,
      work_phone: this.props.workphone,
      email: this.props.email,
      city: this.props.city,
      state_or_province: this.props.prov,
      postal_code: this.props.postal,
      country: this.props.country
    });
  };

  render() {
    const { openModal, handleCloseModal, dataEdit } = this.props;
    return (
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>

          <form
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleUpdateContacts(e)}
          >
            <DialogContent>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.first_nameError
                      ? "Required FirstName"
                      : "FirstName"
                  }
                  error={this.state.first_nameError}
                  margin="normal"
                  type="text"
                  name="fname"
                  value={this.props.fname}
                  disabled={this.props.disabled}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.last_nameError ? "Required LastName" : "LastName"
                  }
                  error={this.state.last_nameError}
                  margin="normal"
                  type="text"
                  name="lname"
                  value={this.props.lname}
                  disabled={this.props.disabled}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  required
                  id="standard-required"
                  label="Mobile Phone"
                  margin="normal"
                  type="text"
                  name="mobilephone"
                  disabled={this.props.disabled}
                  value={this.props.mobilephone}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  required
                  id="standard-required"
                  label="Work Phone"
                  margin="normal"
                  type="text"
                  name="workphone"
                  value={this.props.workphone}
                  disabled={this.props.disabled}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  required
                  id="standard-required"
                  label="Home Phone"
                  margin="normal"
                  type="text"
                  name="homephone"
                  value={this.props.homephone}
                  disabled={this.props.disabled}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  required
                  id="standard-required"
                  label={this.state.emailError ? "Required email" : "email"}
                  error={this.state.emailError}
                  margin="normal"
                  type="text"
                  name="email"
                  disabled={this.props.disabled}
                  value={this.props.email}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  required
                  id="standard-required"
                  label={this.state.cityError ? "Required city" : "city"}
                  error={this.state.cityError}
                  disabled={this.props.disabled}
                  margin="normal"
                  type="text"
                  name="city"
                  value={this.props.city}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.state_or_provinceError
                      ? "Required State or Province"
                      : "State or Province"
                  }
                  error={this.state.state_or_provinceError}
                  margin="normal"
                  type="text"
                  name="prov"
                  value={this.props.prov}
                  disabled={this.props.disabled}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.postal_codeError
                      ? "Required  Postal Code"
                      : "Postal Code"
                  }
                  error={this.state.postal_codeError}
                  disabled={this.props.disabled}
                  margin="normal"
                  type="text"
                  name="postal"
                  value={this.props.postal}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PostAddIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.countryError ? "Required  Country" : "Country"
                  }
                  error={this.state.countryError}
                  disabled={this.props.disabled}
                  margin="normal"
                  type="text"
                  name="country"
                  value={this.props.country}
                  onChange={e => {
                    this.props.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ display: `${this.props.editButton}` }}
                onClick={() => this.props.handleEdit()}
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

              <Button onClick={() => this.props.handleCancel()} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
