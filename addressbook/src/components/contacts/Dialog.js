import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import { DialogContentText } from "@material-ui/core";
import styled from "styled-components";
import Select from "react-select";

const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const Item = styled.div`
  padding: 5px;
  width: 100%;
`;
export const DialogCont = props => {
  const { title, dialog, setDialog, rowData, passedFn, handleOnChange } = props;
  return (
    <Dialog open={dialog} maxWidth={"lg"} onClose={() => setDialog(false)}>
      <form onSubmit={e => passedFn(e)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Box>
              <Item>
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
              </Item>
              <Item>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.lastName : ""}
                  name="lastName"
                  type="firstName"
                  label="Last Name"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Item>
            </Box>
            <Box>
              <Item>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.homePhone : ""}
                  name="homePhone"
                  type="homePhone"
                  label="Home Phone"
                  fullWidth
                  variant="outlined"
                />
              </Item>
              <Item>
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
              </Item>
              <Item>
                <TextField
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.workPhone : ""}
                  name="workPhone"
                  type="workPhone"
                  label="Work Phone"
                  fullWidth
                  variant="outlined"
                />
              </Item>
            </Box>
            <Box>
              <Item>
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
              </Item>
            </Box>
            <Box>
              <Item>
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
              </Item>
              <Item>
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
              </Item>
              <Item>
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
              </Item>
            </Box>
            <Box>
              <Item>
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
              </Item>
            </Box>
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

export const DeleteDialog = props => {
  const {
    deleteDialog,
    setDeleteDialog,
    handleDelete,
    confirm,
    setConfirm
  } = props;
  return (
    <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
      <form onSubmit={e => handleDelete(e)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>Type "CONFIRM" to delete.</DialogContentText>
          <TextField
            error={confirm.status}
            onChange={e => {
              setConfirm({ ...confirm, text: e.target.value });
            }}
            label="CONFIRM"
            helperText={confirm.status ? `please type "CONFIRM"` : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="primary">
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
export const Group = props => {
  const {
    groupDialog,
    setGroupDialog,
    handleMovetoGroup,
    options,
    setSelectedGroup
  } = props;

  return (
    <Dialog open={groupDialog} onClose={() => setGroupDialog(false)}>
      <form onSubmit={e => handleMovetoGroup(e)}>
        <DialogTitle>Add/Move to Group</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a group</DialogContentText>

          <Select
            onChange={data => setSelectedGroup(data)}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            name="group"
            type="group"
            isClearable={true}
            isSearchable={true}
            options={options}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGroupDialog(false)} color="primary">
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
