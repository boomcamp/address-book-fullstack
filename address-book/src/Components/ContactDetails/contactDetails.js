import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  Typography,
  Grid,
  TextField,
  Checkbox
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { LoadContext } from "../AddressBook/addressBook";

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

export default function ContactDetails({
  openView,
  handleClose,
  firstnameView,
  lastnameView,
  home_phoneView,
  mobile_phoneView,
  work_phoneView,
  emailView,
  cityView,
  state_or_provinceView,
  postal_codeView,
  countryView,
  idView,
  groupData,
  setgroupData
}) {
  let history = useHistory();
  const loadValue = React.useContext(LoadContext);
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
  const [openEdit, setOpenEdit] = useState(false);
  const [errorMsgFirstName, setErrorMsgFirstName] = useState("");

  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

  const [state, setState] = useState({
    multiple: []
  });
  useEffect(() => {
    (async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/groupcontacts/${tokenDecoded.userId}`
      })
        .then(res => setState({ ...state, multiple: res.data }))
        .catch(err => console.log(err));
    })();
    loadValue.setLoad(false);
  }, [loadValue.load]);

  const handleEditSave = props => {
    setOpenEdit(true);
    if (firstname !== "") {
      setErrorMsgFirstName("");
      axios
        .patch(`http://localhost:3004/contacts/${idView}`, {
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
          axios.delete(`http://localhost:3004/groupmembers/${res.data.id}`);
        })
        .then(() => {
          groupData.forEach(data => {
            axios
              .post(`http://localhost:3004/groupmembers`, {
                contactid: idView,
                groupid: data.id
              })
              .catch(err => {
                Swal.fire({
                  title: "Failed to Add Contact to a Group",
                  icon: "error",
                  text: err
                });
              });
            handleClose();
          });
          Swal.fire({
            title: "Contact Updated Successfully",
            icon: "success"
          }).then(() => {
            setOpenEdit(false);
            history.push("/addressbook");
          });
        })
        .then(() => loadValue.setLoad(true))
        .catch(e => {
          Swal.fire({
            icon: "error",
            title: "Failed to Update Contact",
            text: e
          });
        });
    } else {
      setErrorMsgFirstName("This field is required!");
      Swal.fire({
        title: "Failed to add new contact",
        text: "Firstname Required",
        icon: "error"
      });
    }
  };

  const handleEdit = () => {
    setOpenEdit(true);
    setFirstName(firstnameView);
    setLastName(lastnameView);
    setHome_phone(home_phoneView);
    setMobile_phone(mobile_phoneView);
    setWork_phone(work_phoneView);
    setEmail(emailView);
    setCity(cityView);
    setStateOrProvince(state_or_provinceView);
    setPostalCode(postal_codeView);
    setCountry(countryView);
    setgroupData(groupData);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openView}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Contact Details
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                disabled={openEdit ? false : true}
                options={state.multiple}
                getOptionLabel={
                  state.multiple ? option => option.groupname : false
                }
                value={groupData
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
                onChange={(e, n) => setgroupData(n)}
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
                error={errorMsgFirstName === "" ? false : true}
                helperText={errorMsgFirstName ? errorMsgFirstName : ""}
                defaultValue={firstnameView}
                disabled={openEdit ? false : true}
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
                defaultValue={lastnameView}
                disabled={openEdit ? false : true}
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
                defaultValue={home_phoneView}
                disabled={openEdit ? false : true}
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
                defaultValue={mobile_phoneView}
                disabled={openEdit ? false : true}
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
                defaultValue={work_phoneView}
                disabled={openEdit ? false : true}
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
                defaultValue={emailView}
                disabled={openEdit ? false : true}
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
                defaultValue={cityView}
                disabled={openEdit ? false : true}
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
                onChange={e => setCity(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={state_or_provinceView}
                disabled={openEdit ? false : true}
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
                defaultValue={postal_codeView}
                disabled={openEdit ? false : true}
                id="postal_code"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
                onChange={e => setPostalCode(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={countryView}
                disabled={openEdit ? false : true}
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
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
          style={{ backgroundColor: "#065786d9", color: "white" }}
          onClick={() => handleEdit()}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          disabled={openEdit ? false : true}
          onClick={() => handleEditSave()}
        >
          Save Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
}
