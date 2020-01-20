import React from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";
import MaterialTable from "material-table";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import "../../App.css";
import axios from "axios";
import { TableSize, H3, TitleCont, Boxbtn } from "../Styled-Component/style";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Add from "@material-ui/icons/GroupAdd";
import ReorderIcon from "@material-ui/icons/Reorder";
import Button from "@material-ui/core/Button";

import Modal from "../Modal/modal";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";
import Group from "../Group/Group";
import SideDrawer from "../SideDrawer/SideDrawer";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "Name",
          field: "last_name",
          render: rowData => (
            <React.Fragment>
              <AccountBoxIcon style={{ fontSize: 40 }} />
              <span>
                {rowData.first_name} {rowData.last_name}
              </span>
            </React.Fragment>
          )
        },
        { title: "Contact Number", field: "mobile_phone" },
        { title: "Email Address", field: "email" },
        {
          title: "",
          field: "",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <Button onClick={() => this.props.handleOpenEdit(rowData)}>
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                <Button onClick={() => this.props.handleOpenDel(rowData)}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      data: [],
      isOpen: false,
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:4005/contact-list/${user.id}`).then(results => {
      this.setState({ data: results.data });
    });
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      myhandleLogout,
      editContact,
      addContact,
      handleChange,
      handleOpenAdd,
      handleCloseAdd,
      toggleAdd,
      handleOpenEdit,
      handleCloseEdit,
      toggleEdit,
      rowValue,
      deleteContact,
      handleOpenDel,
      handleCloseDel,
      toggleDel,
      addGroup,
      handleOpenGroup,
      handleCloseGroup,
      toggleG,
      handleOpenSide,
      handleCloseSide,
      left
    } = this.props;
    return (
      <div>
        <MDBNavbar color="primary-color" dark expand="md">
          <Boxbtn>
            <Button onClick={handleOpenSide}>
              <ReorderIcon />
            </Button>
          </Boxbtn>
          <MDBNavbarBrand>
            <strong className="white-text">Address Book</strong>
          </MDBNavbarBrand>
        </MDBNavbar>
        <span>
          <TableSize>
            <MaterialTable
              title={
                <TitleCont>
                  <H3>All Contact</H3>
                  <Boxbtn>
                    <Button onClick={this.props.handleOpenGroup}>
                      <Add />
                      Create a Group
                    </Button>
                  </Boxbtn>
                </TitleCont>
              }
              columns={this.state.columns}
              data={this.state.data}
              actions={[
                {
                  tooltip: "Add Contact",
                  isFreeAction: true,
                  icon: "add",
                  onClick: handleOpenAdd
                }
              ]}
              options={{
                pageSize: 10,
                sorting: false,
                pageSizeOptions: [10, 15, 20],
                actionsColumnIndex: -1,
                selection: false
              }}
            />
          </TableSize>
        </span>
        <Modal
          toggleAdd={toggleAdd}
          handleCloseAdd={handleCloseAdd}
          addContact={addContact}
          handleChange={handleChange}
        />
        <Edit
          toggleEdit={toggleEdit}
          handleOpenEdit={handleOpenEdit}
          handleCloseEdit={handleCloseEdit}
          editContact={editContact}
          rowValue={rowValue}
          handleChange={handleChange}
        />
        <Delete
          deleteContact={deleteContact}
          handleOpenDel={handleOpenDel}
          handleCloseDel={handleCloseDel}
          rowValue={rowValue}
          toggleDel={toggleDel}
        />
        <Group
          handleChange={handleChange}
          addGroup={addGroup}
          handleOpenGroup={handleOpenGroup}
          handleCloseGroup={handleCloseGroup}
          toggleG={toggleG}
        />
        <SideDrawer
          handleCloseSide={handleCloseSide}
          left={left}
          myhandleLogout={myhandleLogout}
        />
      </div>
    );
  }
}
