import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable, { MTableBodyRow } from "material-table";
import { Chip } from "@material-ui/core";
import "../App.css";

export default function ContactsTable(highprops) {
  const [state, setState] = useState({
    columns: [
      { title: "First Name", field: "first_name", filtering: false },
      { title: "Last Name", field: "last_name", filtering: false },
      { title: "Home Phone", field: "home_phone", filtering: false },
      { title: "Mobile Phone", field: "mobile_phone", filtering: false },
      { title: "Work Phone", field: "work_phone", filtering: false }
      // { title: "Email", field: "email", filtering: false },
      // { title: "City", field: "city", filtering: false },
      // { title: "State/Province", field: "state_or_province", filtering: false },
      // { title: "Postal Code", field: "postal_code", filtering: false },
      // { title: "Country", field: "country", filtering: false }
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contacts", {
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
            city: contact.email,
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
  }, []);

  function DeleteData(data) {
    axios
      .delete(`http://localhost:5000/api/contact/delete/${data}`, {
        headers: { Authorization: sessionStorage.getItem("token") }
      })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  function AddData(data) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/contact/save",
      data: {
        userid: data.key,
        first_name: data.first_name,
        last_name: data.last_name,
        home_phone: data.home_phone,
        mobile_phone: data.mobile_phone,
        work_phone: data.work_phone,
        email: data.email,
        city: data.email,
        state_or_province: data.state_or_province,
        postal_code: data.postal_code,
        country: data.country
      },
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  function EditData(newdata, olddata) {
    console.log("old data : " + olddata.active);

    axios
      .put(
        `http://localhost:5000/api/contact/update/${olddata.id}`,
        {
          first_name: newdata.first_name,
          last_name: newdata.last_name,
          home_phone: newdata.home_phone,
          mobile_phone: newdata.mobile_phone,
          work_phone: newdata.work_phone,
          email: newdata.email,
          city: newdata.email,
          state_or_province: newdata.state_or_province,
          postal_code: newdata.postal_code,
          country: newdata.country
        },
        {
          headers: { Authorization: sessionStorage.getItem("token") }
        }
      )
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  return (
    <MaterialTable
      style={{ borderRadius: 0 }}
      title="Contact List"
      columns={state.columns}
      components={state.components}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
        selection: true,
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
            highprops.prepareNewData()
          }
        }
      ]}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       setState(prevState => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }).then(AddData(newData)),

        // onRowUpdate: (newData, oldData) =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       if (oldData) {
        //         setState(prevState => {
        //           const data = [...prevState.data];
        //           data[data.indexOf(oldData)] = newData;
        //           return { ...prevState, data };
        //         });
        //       }
        //     }, 600);
        //   }).then(EditData(newData, oldData)),

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
  );
}
