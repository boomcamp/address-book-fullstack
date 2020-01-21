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
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, errors } = useForm();

  return (
    <Dialog open={dialog} maxWidth={"lg"} onClose={() => setDialog(false)}>
      <form onSubmit={handleSubmit(passedFn)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Box>
              <Item>
                <TextField
                  error={!!errors.first_name}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.first_name : ""}
                  name="first_name"
                  type="first_name"
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "First name is required"
                  })}
                  helperText={
                    errors.first_name ? `${errors.first_name.message}` : ""
                  }
                />
              </Item>
              <Item>
                <TextField
                  error={!!errors.last_name}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.last_name : ""}
                  name="last_name"
                  type="last_name"
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Last name is required"
                  })}
                  helperText={
                    errors.last_name ? `${errors.last_name.message}` : ""
                  }
                />
              </Item>
            </Box>
            <Box>
              <Item>
                <TextField
                  error={!!errors.home_phone}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.home_phone : ""}
                  name="home_phone"
                  type="home_phone"
                  label="Home Phone"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Home phone is required"
                  })}
                  helperText={
                    errors.home_phone ? `${errors.home_phone.message}` : ""
                  }
                />
              </Item>
              <Item>
                <TextField
                  error={!!errors.mobile_phone}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.mobile_phone : ""}
                  name="mobile_phone"
                  type="mobile_phone"
                  label="Mobile Phone"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Mobile phone is required"
                  })}
                  helperText={
                    errors.mobile_phone ? `${errors.mobile_phone.message}` : ""
                  }
                />
              </Item>
              <Item>
                <TextField
                  error={!!errors.work_phone}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.work_phone : ""}
                  name="work_phone"
                  type="work_phone"
                  label="Work Phone"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Work phone is required"
                  })}
                  helperText={
                    errors.work_phone ? `${errors.work_phone.message}` : ""
                  }
                />
              </Item>
            </Box>
            <Box>
              <Item>
                <TextField
                  error={!!errors.email}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.email : ""}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Email is required"
                  })}
                  helperText={errors.email ? `${errors.email.message}` : ""}
                />
              </Item>
            </Box>
            <Box>
              <Item>
                <TextField
                  error={!!errors.city}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.city : ""}
                  name="city"
                  type="city"
                  label="City"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "City is required"
                  })}
                  helperText={errors.city ? `${errors.city.message}` : ""}
                />
              </Item>
              <Item>
                <TextField
                  error={!!errors.state_or_province}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.state_or_province : ""}
                  name="state_or_province"
                  type="state_or_province"
                  label="State or Province"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "State or Province is required"
                  })}
                  helperText={
                    errors.state_or_province
                      ? `${errors.state_or_province.message}`
                      : ""
                  }
                />
              </Item>
              <Item>
                <TextField
                  error={!!errors.postal_code}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.postal_code : ""}
                  name="postal_code"
                  type="postal_code"
                  label="Postal Code"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Postal Code is required"
                  })}
                  helperText={
                    errors.postal_code ? `${errors.postal_code.message}` : ""
                  }
                />
              </Item>
            </Box>
            <Box>
              <Item>
                <TextField
                  error={!!errors.country}
                  onChange={e => handleOnChange(title, e.target)}
                  defaultValue={rowData ? rowData.country : ""}
                  name="country"
                  type="country"
                  label="Country"
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Country is required"
                  })}
                  helperText={errors.country ? `${errors.country.message}` : ""}
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
