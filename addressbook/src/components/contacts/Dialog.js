import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Grid } from "@material-ui/core";

export const DialogCont = props => {
  const { title, dialog, setDialog, rowData, passedFn, handleOnChange } = props;
  return (
    <Dialog open={dialog} maxWidth={"lg"}>
      <form onSubmit={e => passedFn(e)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid container spacing={2} style={{ padding: "5px" }}>
              <Grid item xs={6}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.firstName : ""}
                  name="firstName"
                  type="firstName"
                  label="First Name"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.lastName : ""}
                  name="lastName"
                  name="lastName"
                  type="firstName"
                  label="Last Name"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ padding: "5px" }}>
              <Grid item xs={4}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.homePhone : ""}
                  name="homePhone"
                  type="homePhone"
                  label="Home Phone"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.mobilePhone : ""}
                  name="mobilePhone"
                  type="mobilePhone"
                  label="Mobile Phone"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.workPhone : ""}
                  name="workPhone"
                  type="workPhone"
                  label="Work Phone"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ padding: "5px" }}>
              <TextField
                onChange={e => handleOnChange(title, e.target)}
                defaultValue={rowData ? rowData.email : ""}
                name="email"
                type="email"
                label="Email"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid container spacing={2} style={{ padding: "5px" }}>
              <Grid item xs={5}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.city : ""}
                  name="city"
                  type="city"
                  label="City"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.state : ""}
                  name="state"
                  type="state"
                  label="State or Province"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.postalCode : ""}
                  name="postalCode"
                  type="postalCode"
                  label="Postal Code"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ padding: "5px" }}>
              <TextField
                onChange={e => handleOnChange(title, e.target)}
                defaultValue={rowData ? rowData.country : ""}
                name="country"
                type="country"
                label="Country"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            Close
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
