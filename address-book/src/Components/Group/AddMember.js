import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function AddMember({ openMember, handleClose, memberData }) {
  const [groupname, setGroupname] = useState("");
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

  const classes = useStyles();
  const [state, setState] = React.useState([]);

  const handleAddMember = () => {
    handleClose();
    axios
      .post(`http://localhost:3004/groupcontacts/`, {
        userid: `${tokenDecoded.userId}`,
        groupname: groupname
      })
      .then(res => {
        Swal.fire({
          title: "Group Contact Added Successfully",
          icon: "success"
        }).then(() => {
          window.location = "/addressbook";
        });
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Group Contact",
          text: e
        });
      });
  };

  const handleChange = data => {
    console.log(data);
  };

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/groupcontacts/${tokenDecoded.userId}`
      }).then(res => {
        setState(res.data);
      });
    }
    result();
  }, []);

  return (
    <Dialog
      open={openMember}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add to Group</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Please choose at least one group:
          </FormLabel>
          {state.map(data => {
            return (
              <FormGroup>
                <FormControlLabel
                  onChange={() => handleChange(data)}
                  control={<Checkbox value={data.groupname} />}
                  label={data.groupname}
                />
              </FormGroup>
            );
          })}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
          size="small"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddMember}
          variant="contained"
          color="primary"
          size="small"
        >
          Add to Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}
