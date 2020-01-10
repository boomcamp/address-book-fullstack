import React from "react";
import MaterialTable from "material-table";
import AppBarAddress from "../AppBar/appBarAddress";
import Swal from "sweetalert2";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default function AddressBook() {
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      icon: "error",
      title: "You must login first"
    }).then(function() {
      window.location = "/";
    });
  }

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <div>
        <AppBarAddress />
        <div style={{ display: "flex", margin: "50px auto" }}>
          <Container>
            <MaterialTable
              title="Editable Example"
              columns={state.columns}
              data={state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
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
                    }, 600);
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
                  })
              }}
            />
          </Container>
          <Grid item xs={6} sm={3}>
            <Grid item style={{ margin: "0 auto" }}>
              User's Profile
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
