import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Close from "@material-ui/icons/HighlightOff";
import axios from "axios";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const CloseButton = styled(Close)`
  float: right;
  cursor: pointer;
`;

export default function AddGroupModal({
  open,
  setOpen,
  headers,
  match,
  setGroups,
  groups
}) {
  const classes = useStyles();
  const [group, setGroup] = useState("");

  function handleInput(e) {
    setGroup(e.target.value);
  }

  const handleClose = e => {
    setOpen({ ...open, group: false });
  };

  const addGroup = e => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/group/create`,
        {
          userid: match.params.id,
          groupname: group
        },
        headers
      )
      .then(res => {
        alert("Group Created");
        setOpen({ ...open, group: false });
        setGroups([...groups, res.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          if (!group) {
            handleClose();
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Container style={{ outline: "none" }} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                component="h1"
                variant="h5"
              >
                Create Group
                <CloseButton
                  style={{ position: "relative", left: 75 }}
                  onClick={handleClose}
                />
              </Typography>
              <form noValidate>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="group"
                    label="Group Name"
                    name="groupname"
                    autoComplete="groupname"
                    value={group}
                    onChange={handleInput}
                  />
                  <Button
                    style={{ cursor: "pointer" }}
                    onClick={e => addGroup(e)}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Add
                  </Button>
                </Grid>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
