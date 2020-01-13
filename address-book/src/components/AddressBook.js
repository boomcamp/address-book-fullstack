import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container, Typography, Badge } from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeProvider } from "@material-ui/styles";

export default function AddressBook(props) {
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

  const [state, setState] = useState({
    columns: [],
    data: []
  });
  const classes = useStyles();
  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `http://localhost:3004/contacts`
    });
    setState({ ...state, data: result.data });
  }, []);
  if (!state.data) {
    localStorage.clear();
    return null;
  }
  return localStorage.getItem("Token") ? (
    <Container
      maxWidth="lg"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      <MaterialTable
        style={{ paddingLeft: 10 }}
        title="Users Data"
        columns={[
          {
            title: "Firstname",
            headerStyle: {
              fontWeight: "bold"
            },
            sorting: false,
            field: "firstname"
          },
          {
            title: "Lastname",
            headerStyle: {
              fontWeight: "bold"
            },
            field: "lastname"
          },
          {
            title: "Home Phonenumber",
            headerStyle: {
              fontWeight: "bold"
            },
            sorting: false,
            field: "home_phone"
          },
          {
            title: "Mobile Phonenumber",
            headerStyle: {
              fontWeight: "bold"
            },
            sorting: false,
            field: "mobile_phone"
          },
          {
            title: "Work Phonenumber",
            headerStyle: {
              fontWeight: "bold"
            },
            sorting: false,
            field: "work_phone"
          }
        ]}
        options={{
          filtering: false
        }}
        data={[...state.data]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 400);
              axios
                .patch(
                  `http://localhost:3000/users/${newData.id}`,
                  {
                    email: newData.email,
                    username: newData.username,
                    firstName: newData.firstName,
                    lastName: newData.lastName,
                    active: newData.active
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                  }
                )
                .then(
                  Swal.fire({
                    title: "Account has been edited!",
                    icon: "success",
                    button: true
                  })
                );
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
              axios
                .delete(`http://localhost:3000/users/${oldData.id}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                  }
                })
                .then(
                  Swal.fire({
                    icon: "success",
                    title: "Account has been successfully deleted!"
                  })
                );
            })
        }}
      />
    </Container>
  ) : null;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#11CB5F"
    },
    secondary: {
      main: "#CB3311"
    }
  }
});
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  badge: {
    minWidth: "0px",
    height: "12px",
    marginTop: "12px"
  },
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "50%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    maxHeight: "50rem",
    overflowY: "auto"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "0"
  },
  sele: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 20
  }
}));
