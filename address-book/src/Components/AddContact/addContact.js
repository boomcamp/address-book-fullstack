import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  Grid,
  TextField
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import jwt from "jsonwebtoken";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function AddContact({ open, handleClose }) {
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [home_phone, setHome_phone] = useState("");
  const [work_phone, setWork_phone] = useState("");
  const [mobile_phone, setMobile_phone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [state_or_province, setStateOrProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const [errorMsgFirstname, setErrorMsgFirstname] = useState("");
  const [ids, setIds] = useState([]);

  const [state, setState] = useState({
    multiple: []
  });

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/groupcontacts/${tokenDecoded.userId}`
      })
        .then(res => setState({ ...state, multiple: res.data }))
        .catch(err => console.log(err));
    }
    result();
  }, [tokenDecoded.userId, state]);

  const handleSave = () => {
    if (firstname !== "") {
      setErrorMsgFirstname("");
      axios
        .post(`http://localhost:3004/contacts/${tokenDecoded.userId}`, {
          firstname: firstname,
          lastname: lastname,
          home_phone: home_phone,
          work_phone: work_phone,
          mobile_phone: mobile_phone,
          city: city,
          email: email,
          state_or_province: state_or_province,
          postal_code: postal_code,
          country: country
        })
        .then(res => {
          ids.forEach(group => {
            axios.post(`http://localhost:3004/groupmembers/`, {
              contactid: res.data.id,
              groupid: group.id
            });
            handleClose();
            Swal.fire({
              title: "Contact Added Successfully",
              icon: "success"
            }).then(() => {
              window.location = "/addressbook";
            });
          });
        })
        .catch(e => {
          Swal.fire({
            icon: "error",
            title: "Failed to Add Contact",
            text: e
          });
        });
    } else {
      setErrorMsgFirstname("This field is required");
      Swal.fire({
        title: "Failed to add new contact",
        text: "Firstname Required",
        icon: "error"
      });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Contact
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                options={state.multiple}
                getOptionLabel={
                  state.multiple ? option => option.groupname : false
                }
                value={ids
                  .map(data => state.multiple.findIndex(x => x.id === data.id))
                  .filter(item => item >= 0)
                  .map(num => state.multiple[num])}
                disableCloseOnSelect
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.groupname}
                  </React.Fragment>
                )}
                onChange={(e, n) => setIds(n)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Choose one or more Group List"
                    placeholder="Group List"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorMsgFirstname === "" ? false : true}
                helperText={errorMsgFirstname ? errorMsgFirstname : ""}
                required
                id="firstname"
                name="firstname"
                label="First name"
                fullWidth
                autoComplete="firstname"
                onChange={e => setFirstName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastname"
                name="lastname"
                label="Last name"
                fullWidth
                autoComplete="lastname"
                onChange={e => setLastName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="home_phone"
                name="home_phone"
                label="Home Phone Number"
                fullWidth
                onChange={e => setHome_phone(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="mobile_phone"
                name="mobile_phone"
                label="Mobile Phone Number"
                fullWidth
                onChange={e => setMobile_phone(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="work_phone"
                name="work_phone"
                label="Work Phone Number"
                fullWidth
                onChange={e => setWork_phone(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                onChange={e => setCity(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state_or_province"
                name="state"
                label="State/Province/Region"
                fullWidth
                onChange={e => setStateOrProvince(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="postal_code"
                name="postal_code"
                label="Zip / Postal code"
                fullWidth
                onChange={e => setPostalCode(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="country"
                name="country"
                label="Country"
                fullWidth
                onChange={e => setCountry(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions style={{ display: "flext", justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
}
