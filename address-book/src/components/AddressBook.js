import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Modal from "./Modal";
import Viewer from "./Viewer";
import AddressBookTable from "./AddressBookTable";
import GroupCard from "./GroupCard";
import jwt from "jsonwebtoken";

export default function AddressBook() {
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      title: "You must login first!",
      width: 600,
      padding: "3em",
      background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat`
    }).then(function() {
      window.location = "/";
    });
  }
  const [open, setOpen] = React.useState(false);
  const [willEdit, setWillEdit] = useState(false);
  const [willOpenViewer, setWillOpenViewer] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setWillOpenViewer(false);
  };
  const handleClose = () => {
    setOpen(false);
    setWillEdit(false);
  };
  const [values, setValues] = useState({});
  const classes = useStyles();
  return localStorage.getItem("Token") ? (
    <React.Fragment>
      <Modal
        handleClose={handleClose}
        open={open}
        teal={classes.teal}
        willEdit={willEdit}
        values={values}
        setValues={setValues}
        tokenDecoded={tokenDecoded}
      />
      <Container
        maxWidth="lg"
        component="div"
        className={`${classes.paper} ${classes.rooot}`}
      >
        {willOpenViewer ? <Viewer values={values} /> : null}
        <div
          className={classes.table}
          style={{ width: willOpenViewer ? "65%" : "100%" }}
        >
          <GroupCard tokenDecoded={tokenDecoded} />
          <AddressBookTable
            tokenDecoded={tokenDecoded}
            handleClickOpen={handleClickOpen}
            teal={classes.teal}
            avatar={classes.avatar}
            setValues={setValues}
            buttonGroup={classes.buttonGroup}
            setWillEdit={setWillEdit}
            setWillOpenViewer={setWillOpenViewer}
          />
        </div>
      </Container>
    </React.Fragment>
  ) : null;
}

const useStyles = makeStyles(theme => ({
  rooot: {
    // padding: "0 7.5%!important",
    left: "50%",
    top: "55%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    // maxHeight: "50rem",
    height: "calc(100vh - 64px)",
    overflowY: "auto"
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    padding: "0",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  table: {
    // width: ? "65%" : "100%",
    background: "transparent",
    borderRadius: "8px",
    boxShadow: "none",
    height: "100%!important"
  },
  "@media (max-width: 992px)": {
    table: {
      width: "100%!important",
      marginTop: "30%!important"
    }
    // html: {
    //   maxHeight: "100vh!important"
    // },
    // body: {
    //   maxHeight: "100vh!important"
    // }
  },
  teal: {
    backgroundColor: "#26a69a!important",
    color: "white"
  },
  avatar: {
    width: "50px",
    height: "50px",
    fontSize: "1.25rem",
    backgroundColor: "#3e51b5"
  },
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));
