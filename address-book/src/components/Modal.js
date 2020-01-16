import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import AddToGroupList from "./AddToGroupList";

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

export default function Alert({
  open,
  handleClose,
  teal,
  willEdit,
  values,
  setValues,
  tokenDecoded
}) {
  const classes = useStyles();
  const [errorMsgFirstName, setErrorMsgFirstName] = useState("");
  const axiosThen = (willPost, isPatch) => {
    willPost
      .then(() => {
        handleClose();
        Swal.fire({
          title: isPatch
            ? "Contact Successfully Edited"
            : "Contact Added Successfully",
          icon: "success"
        }).then(() => {
          window.location = "/addressbook";
        });
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: isPatch ? "Failed to Edit Contact" : "Failed to Add Contact",
          text: e
        });
      });
  };
  const handleSave = () => {
    var dataObject = {
      firstname: values.firstname,
      lastname: values.lastname,
      home_phone: values.home_phone,
      work_phone: values.work_phone,
      mobile_phone: values.mobile_phone,
      city: values.city,
      email: values.email,
      state_or_province: values.state_or_province,
      postal_code: values.postal_code,
      country: values.country
    };
    if (values.firstname !== "") {
      setErrorMsgFirstName("");
      willEdit
        ? axiosThen(
            axios.patch(
              `http://localhost:3004/contacts/${values.id}`,
              dataObject
            ),
            true
          )
        : axiosThen(
            axios.post(
              `http://localhost:3004/contacts/${tokenDecoded.userId}`,
              dataObject
            ),
            false
          );
    } else {
      setErrorMsgFirstName("This field is required!");
      Swal.fire({
        title: "Failed to add new contact",
        text: "First Name is required",
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
        {willEdit ? "Edit Contact" : "Add Contact"}
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <AddToGroupList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={errorMsgFirstName === "" ? false : true}
                helperText={errorMsgFirstName ? errorMsgFirstName : ""}
                defaultValue={willEdit ? values.firstname : ""}
                id="firstname"
                name="firstname"
                label="First name"
                fullWidth
                autoComplete="firstname"
                onChange={e =>
                  setValues({ ...values, firstname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={willEdit ? values.lastname : ""}
                id="lastname"
                name="lastname"
                label="Last name"
                fullWidth
                autoComplete="lastname"
                onChange={e =>
                  setValues({ ...values, lastname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={willEdit ? values.home_phone : ""}
                id="home_phone"
                name="home_phone"
                label="Home Phone Number"
                fullWidth
                onChange={e =>
                  setValues({ ...values, home_phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={willEdit ? values.mobile_phone : ""}
                id="mobile_phone"
                name="mobile_phone"
                label="Mobile Phone Number"
                fullWidth
                onChange={e =>
                  setValues({ ...values, mobile_phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={willEdit ? values.work_phone : ""}
                id="work_phone"
                name="work_phone"
                label="Work Phone Number"
                fullWidth
                onChange={e =>
                  setValues({ ...values, work_phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={willEdit ? values.email : ""}
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                onChange={e => setValues({ ...values, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={willEdit ? values.city : ""}
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
                onChange={e => setValues({ ...values, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={willEdit ? values.state_or_province : ""}
                id="state_or_province"
                name="state"
                label="State/Province/Region"
                fullWidth
                onChange={e =>
                  setValues({ ...values, state_or_province: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={willEdit ? values.postal_code : ""}
                id="postal_code"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
                onChange={e =>
                  setValues({ ...values, postal_code: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={willEdit ? values.country : ""}
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
                onChange={e =>
                  setValues({ ...values, country: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className={classes.bgColor}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          className={teal}
          onClick={handleSave}
        >
          Save Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 575
  },
  bgColor: {
    justifyContent: "flex-end"
  }
}));
