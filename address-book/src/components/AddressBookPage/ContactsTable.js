import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable, { MTableBodyRow } from "material-table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function ContactsTable(highprops) {
  const classes = useStyles();

  const [state, setState] = useState({
    columns: [
      { title: "First Name", field: "first_name", filtering: false },
      { title: "Last Name", field: "last_name", filtering: false },
      { title: "Home Phone", field: "home_phone", filtering: false },
      { title: "Mobile Phone", field: "mobile_phone", filtering: false },
      { title: "Work Phone", field: "work_phone", filtering: false }
    ],
    components: {
      Row: props => {
        return (
          <MTableBodyRow
            {...props}
            className="table-row-component"
            onRowClick={() => highprops.contactTransfer(props)}
          />
        );
      }
    }
  });

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff3300"
      },
      secondary: {
        main: "#00aeff"
      }
    }
  });

  useEffect(() => {
    if (highprops.tableData) {
      console.log(highprops.tableData);
      setState(state => {
        return { ...state, data: highprops.tableData };
      });
    } else {
      console.log(sessionStorage.getItem("userid"));

      axios({
        method: "get",
        url: `http://localhost:5000/api/contacts/${sessionStorage.getItem(
          "userid"
        )}`,
        headers: { Authorization: sessionStorage.getItem("token") }
      })
        .then(contacts => {
          console.log(contacts.data);

          let contact_data = [];

          contacts.data.map(contact => {
            contact_data.push({
              key: contact.id,
              id: contact.id,
              first_name: contact.first_name,
              last_name: contact.last_name,
              home_phone: contact.home_phone,
              mobile_phone: contact.mobile_phone,
              work_phone: contact.work_phone,
              email: contact.email,
              city: contact.city,
              state_or_province: contact.state_or_province,
              postal_code: contact.postal_code,
              country: contact.country
            });
          });

          console.log(contact_data);
          setState(state => {
            return { ...state, data: contact_data };
          });
        })
        .catch(e => {
          console.warn(e);
        });
    }
  }, [highprops.tableData]);

  function DeleteData(data) {
    axios
      .delete(`http://localhost:5000/api/contact/delete/${data}`, {
        headers: { Authorization: sessionStorage.getItem("token") }
      })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  return (
    <div className={classes.tableContainer}>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Contacts"
          columns={state.columns}
          components={state.components}
          data={state.data}
          options={{
            actionsColumnIndex: -1,
            selection: true
          }}
          actions={[
            {
              tooltip: "Remove All Selected Users",
              icon: "delete",
              onClick: (evt, data) => {
                data.map(udata => {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(udata), 1);
                    return { ...prevState, data };
                  });
                  DeleteData(udata.id);
                });
              }
            },
            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: event => {
                highprops.prepareNewData();
              }
            }
          ]}
          editable={{
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
              }).then(DeleteData(oldData.id))
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  tableContainer: {
    margin: "50px 40px 0 40px",
    [theme.breakpoints.down("sm")]: {
      margin: "50px 0"
    }
  }
}));
