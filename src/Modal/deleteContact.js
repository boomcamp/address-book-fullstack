import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";

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
  }
}));

export default function DeleteContactModal({
  open,
  setOpen,
  contactId,
  rows,
  setRows,
  headers
}) {
  const classes = useStyles();

  const deleteContact = () => {
    Axios.delete(
      `http://localhost:3001/contacts/delete/${contactId}`,
      headers
    ).then(() => {
      setRows(rows.filter(row => row.id !== contactId));
      setOpen({ ...open, status: false });
    });
  };

  const handleClose = () => {
    setOpen({ ...open, status: false });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              item
              xs={12}
              sm={12}
            >
              <Typography style={{ marginBottom: 40 }}>
                Delete Contact?
              </Typography>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={3} sm={6}>
                <Button
                  style={{ cursor: "pointer" }}
                  color="primary"
                  variant="contained"
                  onClick={deleteContact}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={3} sm={6}>
                <Button
                  style={{ cursor: "pointer" }}
                  color="secondary"
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel{" "}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
