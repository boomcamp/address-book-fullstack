import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Avatar, Typography, Chip } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function AddressBookTable({
  handleClickOpen,
  teal,
  avatar,
  setValues,
  buttonGroup,
  setWillEdit,
  setWillOpenViewer,
  setIds,
  userId,
  data,
  setLoadData,
  handleSortAsc,
  handleSortDesc
}) {
  let history = useHistory();
  const handleClickDetails = id => {
    axios
      .get(`http://localhost:3004/contacts/${userId}/${id}`)
      .then(res => {
        setWillOpenViewer(true);
        setValues(res.data[0]);
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Failed to Retrieve Details",
          text: e
        });
      });
  };
  const handleClickEdit = id => {
    setWillEdit(true);
    axios
      .get(`http://localhost:3004/contacts/${userId}/${id}`)
      .then(res => {
        axios
          .get(`http://localhost:3004/groupmember/${id}`)
          .then(res => setIds(res.data));
        setValues(res.data[0]);
        handleClickOpen();
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Failed to Retrieve Contact",
          text: e
        });
      });
  };
  const handleClickDelete = rowData => {
    setWillEdit(true);
    Swal.fire({
      title: `Are you sure you want to delete ${rowData.firstname} ${rowData.lastname} from your contacts?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .all([
            axios.delete(`http://localhost:3004/contacts/${rowData.id}`),
            axios.delete(`http://localhost:3004/groupmember/${rowData.id}`)
          ])
          .then(() => {
            setValues({});
            setLoadData(true);
            setWillEdit(false);
            Swal.fire({
              title: "Contact Successfully Deleted",
              icon: "success"
            }).then(() => history.push("/addressbook"));
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Failed to Delete Contact",
              text: err
            });
          });
      }
    });
  };
  if (!data) return localStorage.clear();
  return (
    <MaterialTable
      title="Users Data"
      components={{
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "2%"
              }}
            >
              <Typography style={{ paddingTop: "0.3%", marginRight: 5 }}>
                Sort Lastname by:
              </Typography>
              <Chip
                label="ASC"
                onClick={() => handleSortAsc()}
                style={{ marginRight: 5 }}
              />
              <Chip
                label="DESC"
                onClick={() => handleSortDesc()}
                style={{ marginRight: 5 }}
              />
            </div>
          </div>
        )
      }}
      columns={[
        {
          title: "",
          sorting: false,
          render: rowData => (
            <Avatar className={avatar}>
              {`${String(rowData.firstname)
                .charAt(0)
                .toUpperCase()}${
                rowData.lastname
                  ? String(rowData.lastname)
                      .charAt(0)
                      .toUpperCase()
                  : ""
              }`}
            </Avatar>
          )
        },
        {
          title: "Name",
          headerStyle: {
            fontWeight: "bold"
          },
          render: rowData =>
            rowData.firstname +
            " " +
            (rowData.lastname ? rowData.lastname : ""),
          customFilterAndSearch: (term, rowData) =>
            (
              rowData.firstname +
              " " +
              (rowData.lastname ? rowData.lastname : "")
            )
              .toLowerCase()
              .indexOf(term.toLowerCase()) !== -1,
          sorting: false
        },
        {
          title: "Home Phone No",
          headerStyle: {
            fontWeight: "bold"
          },
          sorting: false,
          field: "home_phone"
        },
        {
          title: "Mobile Phone No",
          headerStyle: {
            fontWeight: "bold"
          },
          sorting: false,
          field: "mobile_phone"
        },
        {
          title: "Work Phone No",
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
      data={[...data]}
      actions={[
        {
          icon: "add",
          tooltip: "Add User",
          isFreeAction: true,
          onClick: () => {
            handleClickOpen();
          }
        }
      ]}
    />
  );
}
