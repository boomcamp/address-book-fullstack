import React from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import Modal from "../Modal/Modal";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        {
          title: "Actions",
          render: rowData => (
            <React.Fragment>
              <IconButton
                onClick={() => this.props.handleEditOpen(rowData, "edit")}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => this.props.handleEditOpen(rowData, "delete")}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          )
        }
      ],
      data: []
    };
  }
  componentDidMount = () => {
    this.fetchContact();
  };

  fetchContact = () => {
    axios
      .get(
        `http://localhost:4001/contacts/${localStorage.getItem("userId")}/all`
      )
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  componentDidUpdate = () => {
    if (this.props.isLoading) {
      this.fetchContact();
    }
  };

  render() {
    const {
      createContactHandler,
      changeHandler,
      handleEditOpen,
      handleAddOpen,
      handleAddClose,
      isModal,
      currentData,
      editContactHandler,
      deleteContactHandler,
      deleteContact
    } = this.props;
    return (
      <div>
        <MaterialTable
          title="All Contacts"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            actionsColumnIndex: -1,
            selection: true,
            grouping: true
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Add Contact",
              isFreeAction: true,
              onClick: handleAddOpen
            },
            {
              icon: "add",
              tooltip: "Add To Group",
              onClick: rowData => {
                console.log(rowData);
              }
            },
            {
              tooltip: "Remove All Selected Users",
              icon: "delete",
              onClick: (evt, data) =>
                alert("You want to delete " + data.length + " rows")
            }
          ]}
        />
        <Modal
          isModal={isModal}
          currentData={currentData}
          createContactHandler={createContactHandler}
          editContactHandler={editContactHandler}
          deleteContactHandler={deleteContactHandler}
          changeHandler={changeHandler}
          handleAddClose={handleAddClose}
          handleEditOpen={handleEditOpen}
          handleAddOpen={handleAddOpen}
          deleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default Users;
