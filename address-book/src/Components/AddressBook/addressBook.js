import React, { useEffect } from "react";
import MaterialTable from "material-table";
import AppBarAddress from "../AppBar/appBarAddress";
import Swal from "sweetalert2";
import { Container } from "@material-ui/core";
import axios from "axios";

export default function AddressBook() {
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      icon: "warning",
      title: "You must login first"
    }).then(function() {
      window.location = "/";
    });
  }

  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `http://localhost:3004/contacts/${localStorage.getItem("userid")}`
    });
    setState({ ...state, data: result.data });
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
      }
    ],
    data: []
  });

  // axios.get("http://localhost:3004/contacts", {}).then(res => {
  //   setState({ ...state, data: res.data });
  // });

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <div>
        <AppBarAddress />
        <div style={{ display: "flex", margin: "50px auto" }}>
          <Container maxWidth="lg">
            <MaterialTable
              title="Contact List"
              columns={state.columns}
              data={state.data}
            />
          </Container>
        </div>
      </div>
    );
  }
}
