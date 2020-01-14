import React, { useState } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Div, Box } from "../styles/contacts";
import { columnData, columnDataMobile } from "../data/data";
import { TextField, Grid } from "@material-ui/core";

export const Contacts = props => {
  const { userData } = props.data;
  const [windowWidth, setWindowWidth] = useState(() => {
    return window.innerWidth;
  });
  const [dialog, setDialog] = React.useState(false);

  return (
    <div>
      <Grid container>
        <Grid item style={{ border: "1px solid black" }} lg={12} x={24}>
          <MaterialTable
            style={{ width: "100%" }}
            fullWidth
            title="Contact List"
            columns={windowWidth >= 600 ? columnData : columnDataMobile}
            data={userData.addressBook}
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10,
              actionsColumnIndex: -1,
              selection: false,
              grouping: false
            }}
            actions={[
              {
                icon: "add",
                tooltip: "add",
                isFreeAction: true,
                onClick: () => setDialog(true)
              }
            ]}
          />
        </Grid>
      </Grid>
      <Dialog open={dialog} maxWidth={"lg"}>
        <DialogTitle>Add new contact</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              style={{ margin: "0 15px 10px 0" }}
              name="firsName"
              type="firstName"
              variant="outlined"
              label="First Name"
              fullWidth
              required
            />
            <TextField
              style={{ margin: "0 15px 10px 0" }}
              name="lastName"
              name="lastName"
              type="firstName"
              variant="outlined"
              label="Last Name"
              fullWidth
              required
            />
            <TextField
              style={margin}
              name="mobilePhone"
              type="mobilePhone"
              variant="outlined"
              label="Mobile Phone"
              fullWidth
              required
            />
          </Box>

          <TextField
            style={margin}
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            fullWidth
            required
          />
          <TextField
            style={margin}
            name="city"
            type="city"
            variant="outlined"
            label="City"
            fullWidth
            required
          />
          <TextField
            style={margin}
            name="state"
            type="state"
            variant="outlined"
            label="State or Province"
            fullWidth
            required
          />
          <TextField
            style={margin}
            name="postalCode"
            type="postalCode"
            variant="outlined"
            label="Postal Code"
            fullWidth
            required
          />
          <TextField
            style={margin}
            name="country"
            type="country"
            variant="outlined"
            label="Country"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            Close
          </Button>
          <Button onClick={() => setDialog(false)} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const margin = {
  margin: "0 0 10px 0"
};
