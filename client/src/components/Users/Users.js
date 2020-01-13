import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { toast } from "react-toastify";

import Modal from "../Modal/Modal";
class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      columns: [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        {
          title: "Home Phone",
          field: "home_phone"
        },
        {
          title: "Mobile Phone",
          field: "mobile_phone"
        },
        {
          title: "Work Phone",
          field: "work_phone"
        }
      ],
      data: [],
      addModal: false
    };
  }
  componentDidMount = () => {
    axios
      .get(
        `http://localhost:4001/contacts/${localStorage.getItem("userId")}/all`
      )
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleAddOpen = () => {
    this.setState({ addModal: true });
  };

  handleAddClose = () => {
    this.setState({ addModal: false });
  };

  render() {
    const { accessToken, createContactHandler, changeHandler } = this.props;
    // const userId = localStorage.getItem("userId");
    return (
      <div>
        <MaterialTable
          title="All Contacts"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: this.handleAddOpen
            }
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
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
                      headers: { Authorization: `Bearer ${accessToken}` }
                    }
                  )
                  .then(toast.success("Account has been Successfully Edited!"))
                  .catch(() => toast.success("Error Encountered!"));
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
                axios
                  .delete(`http://localhost:3000/users/${oldData.id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                  })
                  .then(toast.success("Account has been Successfully Deleted!"))
                  .catch(() => toast.success("Error Encountered!"));
              })
          }}
        />
        <Modal
          addModal={this.state.addModal}
          handleAddOpen={this.handleAddOpen}
          handleAddClose={this.handleAddClose}
          createContactHandler={createContactHandler}
          changeHandler={changeHandler}
        />
      </div>
    );
  }
}

export default Users;
