import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Modal from "./Modal";
import Viewer from "./Viewer";
import AddressBookTable from "./AddressBookTable";
import GroupCard from "./GroupCard";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddressBook() {
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
    }).then(() => history.push("/"));
  }
  const [userId, setUserId] = useState(0);
  const [loadData, setLoadData] = React.useState(false);
  const [loadGroupData, setLoadGroupData] = React.useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [willEdit, setWillEdit] = useState(false);
  const [willOpenViewer, setWillOpenViewer] = useState(false);
  const [ids, setIds] = useState([]);
  const [order, setOrder] = useState("");
  const [groupLs, setGroupLs] = useState([]);
  const [values, setValues] = useState({});
  const classes = useStyles();
  const alphabetically = ascending => {
    return (a, b) => {
      if (a.lastname === b.lastname) return 0;
      else if (a.lastname === null) return 1;
      else if (b.lastname === null) return -1;
      else if (ascending) return a.lastname < b.lastname ? -1 : 1;
      else return a.lastname < b.lastname ? 1 : -1;
    };
  };
  useEffect(() => {
    if (localStorage.getItem("Token"))
      setUserId(jwt.decode(localStorage.getItem("Token")).userId);
  }, []);
  useEffect(() => {
    (async function result() {
      await axios
        .get(`http://localhost:3004/contacts/${userId}`)
        .then(res => setData(res.data.sort(alphabetically(true))))
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Failed to Fetch the Data",
            text: err
          });
        });
    })();
    setLoadData(false);
  }, [loadData, userId]);
  useEffect(() => {
    (async function result() {
      await axios
        .get(`http://localhost:3004/group/${userId}`)
        .then(res => setGroupLs(res.data))
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Failed to Retrieve Group List",
            text: err
          });
        });
    })();
    setLoadGroupData(false);
  }, [loadGroupData, userId]);
  useEffect(() => {
    const sorted =
      order === "desc"
        ? data.sort(alphabetically(true))
        : data.sort(alphabetically(false));
    setData(sorted);
  }, [loadData, order]);
  let history = useHistory();
  const handleSortAsc = () => {
    setOrder("asc");
    setData(data.sort(alphabetically(true)));
  };
  const handleSortDesc = () => {
    setOrder("desc");
    setData(data.sort(alphabetically(false)));
  };
  const handleClickOpen = () => {
    setOpen(true);
    setWillOpenViewer(false);
  };
  const handleClose = () => {
    setValues({});
    setOpen(false);
    setWillEdit(false);
    setIds([]);
  };
  return userId ? (
    <React.Fragment>
      <Modal
        handleClose={handleClose}
        open={open}
        teal={classes.teal}
        willEdit={willEdit}
        values={values}
        setValues={setValues}
        ids={ids}
        setIds={setIds}
        userId={userId}
        setLoadData={setLoadData}
        groupLs={groupLs}
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
          <GroupCard
            userId={userId}
            groupLs={groupLs}
            setLoadGroupData={setLoadGroupData}
            setData={setData}
          />
          <AddressBookTable
            handleClickOpen={handleClickOpen}
            teal={classes.teal}
            avatar={classes.avatar}
            setValues={setValues}
            buttonGroup={classes.buttonGroup}
            setWillEdit={setWillEdit}
            setWillOpenViewer={setWillOpenViewer}
            setIds={setIds}
            data={data}
            userId={userId}
            setLoadData={setLoadData}
            handleSortAsc={handleSortAsc}
            handleSortDesc={handleSortDesc}
          />
        </div>
      </Container>
    </React.Fragment>
  ) : null;
}

const useStyles = makeStyles(theme => ({
  rooot: {
    left: "50%",
    top: "50%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    height: "calc(100vh - 64px)",
    overflowY: "inherit"
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
    background: "transparent",
    borderRadius: "8px",
    boxShadow: "none",
    height: "100%!important",
    marginTop: "1%!important"
  },
  "@media (max-width: 992px)": {
    paper: {
      width: "80%!important"
    },
    table: {
      width: "100%!important",
      marginTop: "5%!important"
    }
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
