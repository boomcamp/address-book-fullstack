import React, { useEffect } from "react";
import MaterialTable from "material-table";
import AppBarAddress from "../AppBar/appBarAddress";
import Swal from "sweetalert2";
import { Container } from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import AddContact from "../AddContact/addContact";
import { makeStyles } from "@material-ui/core/styles";
import ContactDetails from "../ContactDetails/contactDetails";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

export default function AddressBook() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  if (!localStorage.getItem("Token")) {
    Swal.fire({
      icon: "warning",
      title: "You must login first"
    }).then(function() {
      window.location = "/";
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/contacts/${localStorage.getItem("userid")}`
      }).then(res => {
        console.log(res);
        setState({ ...state, data: res.data });
      });
    }
    result();
  }, []);

  const [state, setState] = React.useState({
    columns: [
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
      },
      {
        title: "Actions",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        render: rowData => (
          // <NavLink
          //   to={`/contact/${userid}`}
          //   style={{ cursor: "pointer" }}
          //   className="name"
          // >
          <VisibilityIcon />
          // </NavLink>
        )
      }
    ],
    data: []
  });

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <div>
        <AppBarAddress />
        <div
          style={{
            display: "flex",
            margin: "50px auto",
            paddingTop: "5%"
          }}
        >
          <Grid container spacing={1}>
            <Container>
              <AddContact open={open} handleClose={handleClose} />
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <MaterialTable
                  title="Contact List"
                  columns={state.columns}
                  data={state.data}
                  actions={[
                    {
                      icon: "add",
                      tooltip: "Add User",
                      isFreeAction: true,
                      onClick: () => handleOpen()
                    }
                  ]}
                />
              </Grid>
              <ContactDetails />
            </Container>
          </Grid>
        </div>
      </div>
    );
  }
}
