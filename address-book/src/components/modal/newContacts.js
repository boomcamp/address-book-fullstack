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
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
import MuiPhoneNumber from "material-ui-phone-number";
import PostAddIcon from '@material-ui/icons/PostAdd';
export default class NewContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fname: "",
      lname: "",
      homephone: "",
      mobilephone: "",
      workphone: "",
      email: "",
      city: "",
      stateOrProvince: "",
      postalcode: "",
      country: ""
    };
  }

  handleCreateContact = () => {
    const id = localStorage.getItem("id");
    axios
      .post(`/createcontact`, {
        id: id,
        first_name: this.state.fname,
        last_name: this.state.lname,
        home_phone: this.state.homephone,
        mobile_phone: this.state.mobilephone,
        work_phone: this.state.workphone,
        email: this.state.email,
        city: this.state.city,
        state_or_province: this.state.stateOrProvince,
        postal_code: this.state.postalcode,
        country: this.state.country
      })
      .then(res => {
        console.log(this.state.homephone)
      });
  };
  setFields = event => {
    var fieldname = event.target.name;
    var fieldError = fieldname + "Error";
    var value = event.target.value;
    this.setState({
      [fieldname]: value,
      [fieldError]: value ? false : true
    });
  };
  render() {
    const { openModal, handleCloseModal, handleOpenModal } = this.props;
    const { classes } = this.props;
    console.log(this.state.homephone)
    return (
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Contact</DialogTitle>

          <form
            noValidate
            autoComplete="off"
            onSubmit={e => this.handleCreateContact(e)}
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
                    this.state.fnameError ? "Required FirstName" : "FirstName"
                  }
                  error={this.state.fnameError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="fname"
                  value={this.state.fname}
                  onChange={e => {
                    this.setFields(e);
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
                    this.state.lnameError ? "Required LastName" : "LastName"
                  }
                  error={this.state.lnameError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="lname"
                  value={this.state.lname}
                  onChange={e => {
                    this.setFields(e);
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
                {/* <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.mobilephoneError
                      ? "Required mobilephone"
                      : "mobilephone"
                  }
                  error={this.state.mobilephoneError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="mobilephone"
                  value={this.state.mobilephone}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                /> */}
                 <MuiPhoneNumber
                style={{
                  marginTop:"2%"
                }}
                  name="mobilephone"
                  label="Mobile Phone"
                  defaultCountry={"ph"}
                  value={this.state.mobilephone}
                  onChange = {(e) =>  this.setState({ mobilephone: e})}
                />

                {/* <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.workphoneError
                      ? "Required workphone"
                      : "workphone"
                  }
                  error={this.state.workphoneError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="workphone"
                  value={this.state.workphone}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon style={{color: 'grey'}}/>
                        </InputAdornment>
                      ),
                  }}
                /> */}
                <MuiPhoneNumber
                style={{
                  marginTop:"2%"
                }}
                  name="workphone"
                  label="Work Phone"
                  defaultCountry={"ph"}
                  value={this.state.workphone}
                />
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                {/* <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.homephoneError
                      ? "Required homephone"
                      : "homephone"
                  }
                  error={this.state.homephoneError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="homephone"
                  value={this.state.homephone}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactPhoneIcon style={{color: 'grey'}}/>
                        </InputAdornment>
                      ),
                  }}
                /> */}
                <MuiPhoneNumber
                style={{
                  marginTop:"1.5%"
                }}
                  name="homephone"
                  label="Home Phone"
          
                  defaultCountry={"ph"}
                  value={this.state.homephone}
                />

                <TextField
                  required
                  id="standard-required"
                  label={this.state.emailError ? "Required email" : "email"}
                  error={this.state.emailError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={e => {
                    this.setFields(e);
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
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={e => {
                    this.setFields(e);
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
                    this.state.stateOrProvinceError
                      ? "Required State or Province"
                      : "State or Province"
                  }
                  error={this.state.stateOrProvinceError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="stateOrProvince"
                  value={this.state.stateOrProvince}
                  onChange={e => {
                    this.setFields(e);
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
                    this.state.postalcodeError
                      ? "Required  Postal Code"
                      : "Postal Code"
                  }
                  error={this.state.postalcodeError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="postalcode"
                  value={this.state.postalcode}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PostAddIcon style={{color: 'grey'}}/>
                        </InputAdornment>
                      ),
                  }}
                />
                <TextField
                  required
                  id="standard-required"
                  label={
                    this.state.countryError ? "Required  Country" : "Country"
                  }
                  error={this.state.countryError}
                  // className={classes.textField}
                  margin="normal"
                  type="text"
                  name="country"
                  value={this.state.country}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon style={{color: 'grey'}}/>
                        </InputAdornment>
                      ),
                  }}
                />
              </Grid>

              {/* <FormHelperText
                id="component-error-text"
                style={{
                  color: `${this.state.helperColor}`,
                  marginTop: "15px",
                  justifyContent: "center",
                  display: `${this.state.formHelper}`
                }}
              >
                {this.state.errorMessege}
              </FormHelperText> */}
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Add
              </Button>

              <Button onClick={() => handleCloseModal()} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
