import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

export default function AddressBookTable({
  handleClickOpen,
  teal,
  avatar,
  setValues,
  buttonGroup,
  setWillEdit,
  setWillOpenViewer
}) {
  const [state, setState] = useState({
    columns: [],
    data: []
  });

  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const handleClickDetails = id => {
    axios({
      method: "get",
      url: `http://localhost:3004/contacts/${tokenDecoded.userId}/${id}`
    })
      .then(res => {
        setWillOpenViewer(true);
        setValues(res.data[0]);
      })
      .catch(err => console.log(err));
  };
  const handleClickEdit = id => {
    setWillEdit(true);
    axios({
      method: "get",
      url: `http://localhost:3004/contacts/${tokenDecoded.userId}/${id}`
    })
      .then(res => {
        setValues(res.data[0]);
        handleClickOpen();
      })
      .catch(err => console.log(err));
  };
  const handleClickDelete = rowData => {
    setWillEdit(true);
    Swal.fire({
      title: `Are you sure you want to delete from ${rowData.firstname} ${rowData.lastname} your contacts?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios({
          method: "delete",
          url: `http://localhost:3004/contacts/${rowData.id}`
        })
          .then(response => {
            Swal.fire({
              title: "Contact Successfully Deleted",
              icon: "success"
            }).then(() => {
              window.location = "/addressbook";
            });
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Failed to Delete Contact",
              text: err
            });
          });
      }
    });
  };
  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/contacts/${tokenDecoded.userId}`
      })
        .then(res => {
          setState({ ...state, data: res.data });
        })
        .catch(err => console.log(err));
    }
    result();
  }, [state, tokenDecoded.userId]);
  if (!state.data) {
    localStorage.clear();
    return null;
  }
  return (
    <MaterialTable
      title="Users Data"
      columns={[
        {
          title: "",
          sorting: false,
          render: rowData => (
            <Avatar className={avatar}>
              {`${String(rowData.firstname).charAt(0)}${String(
                rowData.lastname
              ).charAt(0)}`}
            </Avatar>
          )
        },
        {
          title: "First Name",
          headerStyle: {
            fontWeight: "bold"
          },
          sorting: false,
          field: "firstname"
        },
        {
          title: "Last Name",
          headerStyle: {
            fontWeight: "bold"
          },
          field: "lastname"
        },
        // {
        //   title: "Home Phone Number",
        //   headerStyle: {
        //     fontWeight: "bold"
        //   },
        //   sorting: false,
        //   field: "home_phone"
        // },
        // {
        //   title: "Mobile Phone Number",
        //   headerStyle: {
        //     fontWeight: "bold"
        //   },
        //   sorting: false,
        //   field: "mobile_phone"
        // },
        // {
        //   title: "Work Phone Number",
        //   headerStyle: {
        //     fontWeight: "bold"
        //   },
        //   sorting: false,
        //   field: "work_phone"
        // },
        {
          title: "",
          field: "",
          lookup: {
            true: "Active",
            false: "Inactive"
          },
          // render: rowData => rowData,
          filtering: true
        },
        {
          title: "Actions",
          headerStyle: {
            fontWeight: "bold"
          },
          sorting: false,
          render: rowData => (
            <div className={buttonGroup}>
              <Button
                variant="contained"
                className={teal}
                onClick={() => handleClickDetails(rowData.id)}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickEdit(rowData.id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClickDelete(rowData)}
              >
                Delete
              </Button>
            </div>
          )
        }
      ]}
      options={{
        filtering: false
      }}
      data={[...state.data]}
      actions={[
        {
          icon: "add",
          tooltip: "Add User",
          isFreeAction: true,
          onClick: event => {
            handleClickOpen();
          }
        }
      ]}
      // editable={{
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         if (oldData) {
      //           setState(prevState => {
      //             const data = [...prevState.data];
      //             data[data.indexOf(oldData)] = newData;
      //             return { ...prevState, data };
      //           });
      //         }
      //       }, 400);
      //       axios
      //         .patch(
      //           `http://localhost:3000/users/${newData.id}`,
      //           {
      //             email: newData.email,
      //             username: newData.username,
      //             firstName: newData.firstName,
      //             lastName: newData.lastName,
      //             active: newData.active
      //           },
      //           {
      //             headers: {
      //               Authorization: `Bearer ${localStorage.getItem("Token")}`
      //             }
      //           }
      //         )
      //         .then(
      //           Swal.fire({
      //             title: "Account has been edited!",
      //             icon: "success",
      //             button: true
      //           })
      //         );
      //     }),
      //   onRowDelete: oldData =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         setState(prevState => {
      //           const data = [...prevState.data];
      //           data.splice(data.indexOf(oldData), 1);
      //           return { ...prevState, data };
      //         });
      //       }, 600);
      //       axios
      //         .delete(`http://localhost:3000/users/${oldData.id}`, {
      //           headers: {
      //             Authorization: `Bearer ${localStorage.getItem("Token")}`
      //           }
      //         })
      //         .then(
      //           Swal.fire({
      //             icon: "success",
      //             title: "Account has been successfully deleted!"
      //           })
      //         );
      //     })
      // }}
    />
  );
}
