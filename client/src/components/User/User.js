import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import MaterialTable from "material-table";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import "../../App.css";
import axios from "axios";
import { message } from "antd";
import {
  TableSize,
  H4,
  TitleCont,
  Right,
  BtnCont
} from "../Styled-Component/style";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Add from "@material-ui/icons/GroupAdd";
import AddIcon from "@material-ui/icons/Add";
import ReorderIcon from "@material-ui/icons/Reorder";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";

import Modal from "../Modal/modal";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";
import Group from "../Group/Group";
import SideDrawer from "../SideDrawer/SideDrawer";
import ContactDetail from "../ContactDetail/ContactDetail";

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
              <Tooltip title="View full detail">
                <AccountBoxIcon
                  style={{ fontSize: 40 }}
                  onClick={() => this.handleDetailOpen(rowData)}
                />
              </Tooltip>
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
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <Tooltip title="Add to group">
                    <AddBoxIcon></AddBoxIcon>
                  </Tooltip>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  {this.state.groupData
                    ? this.state.groupData.map(x => (
                        <MDBDropdownItem
                          key={x.group_id}
                          onClick={() => this.selectGroup(x)}
                        >
                          {x.group_name}
                        </MDBDropdownItem>
                      ))
                    : ""}
                </MDBDropdownMenu>
              </MDBDropdown>
            </React.Fragment>
          )
        },
        {
          title: "",
          field: "",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <Button onClick={() => this.handleOpenEdit(rowData)}>
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Delete Contact">
                <Button onClick={() => this.handleOpenDel(rowData)}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      contactData: [],
      isOpen: false,
      toggleAdd: false,
      toggleEdit: false,
      toggleDel: false,
      rowValue: {},
      toggleG: false,
      left: false,
      detail: false,
      sort: "asc"
    };
  }

  componentDidMount = () => {
    this.fetchData(this.state.sort);
  };

  fetchData = data => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:4005/contact-list/${user.id}/?sort=${data}`)
      .then(results => {
        this.setState({ contactData: results.data });
        axios
          .get(`http://localhost:4005/group-list/${user.id}/?sort=${data}`)
          .then(res => {
            this.setState({ groupData: res.data });
          });
      });
  };

  addContact = () => {
    const Obj = {
      user_id: localStorage.getItem("userId"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      home_phone: this.state.home_phone,
      mobile_phone: this.state.mobile_phone,
      work_phone: this.state.work_phone,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postal_code,
      country: this.state.country
    };
    axios
      .post("http://localhost:4005/add-contact", Obj)
      .then(res => {
        message.success("Contact Successfully added");
        this.fetchData(this.state.sort);
        this.handleCloseAdd();
      })
      .catch(err => {
        console.log(err);
        try {
          message.error(err.response.data.error);
        } catch {
          console.log(err);
        }
      });
  };

  editContact = (event, rowValue) => {
    event.preventDefault();
    const inputs = {
      user_id: localStorage.getItem("userId"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      home_phone: this.state.home_phone,
      mobile_phone: this.state.mobile_phone,
      work_phone: this.state.work_phone,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postal_code,
      country: this.state.country
    };
    axios
      .patch(`http://localhost:4005/update-contact/${rowValue.id}`, inputs)
      .then(res => {
        message.info("Edit Successful!", 2);
        this.fetchData(this.state.sort);
        this.handleCloseEdit();
      });
  };

  deleteContact = (event, rowValue) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:4005/delete-contact/${rowValue.id}`)
      .then(() => {
        message.warning("Contact successfully deleted", 2);
        this.fetchData(this.state.sort);
        this.handleCloseDel();
      });
  };

  createGroup = () => {
    const inputs = {
      user_id: localStorage.getItem("userId"),
      group_name: this.state.group_name
    };
    axios
      .post("http://localhost:4005/create-group", inputs)
      .then(() => {
        message.success("Group successfully created");
        this.fetchData(this.state.sort);
      })
      .catch(err => {
        console.log(err);
        try {
          message.error(err.response.data.error);
        } catch {
          console.log(err);
        }
      });
  };

  handleSort = event => {
    this.setState({ sort: event.target.value });
    this.fetchData(event.target.value);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenAdd = () => {
    this.setState({ toggleAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ toggleAdd: false });
  };

  handleOpenEdit = rowValue => {
    this.setState({
      first_name: rowValue.first_name,
      last_name: rowValue.last_name,
      email: rowValue.email,
      home_phone: rowValue.home_phone,
      mobile_phone: rowValue.mobile_phone,
      work_phone: rowValue.work_phone,
      city: rowValue.city,
      state_or_province: rowValue.state_or_province,
      postal_code: rowValue.postal_code,
      country: rowValue.country
    });
    this.setState({ rowData: rowValue, toggleEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ toggleEdit: false });
  };

  handleOpenDel = rowValue => {
    this.setState({ rowData: rowValue, toggleDel: true });
  };

  handleCloseDel = () => {
    this.setState({ toggleDel: false });
  };

  handleOpenGroup = () => {
    this.setState({ toggleG: true });
  };

  handleCloseGroup = () => {
    this.setState({ toggleG: false });
  };

  handleOpenSide = () => {
    this.setState({ left: true });
  };

  handleCloseSide = () => {
    this.setState({ left: false });
  };

  handleDetailOpen = value => {
    this.setState({ rowData: value, detail: true });
  };

  handleDetailClose = () => {
    this.setState({ detail: false });
  };

  selectGroup = sel => {
    this.setState({ sel: this.state.groupData });
    axios
      .patch(`http://localhost:4005/add-to-group/${sel.group_id}`)
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    const { myhandleLogout } = this.props;
    return (
      <div>
        <MDBNavbar color="primary-color" dark expand="md">
          <div>
            <Button onClick={() => this.handleOpenSide()}>
              <ReorderIcon />
            </Button>
          </div>
          <MDBNavbarBrand>
            <strong className="white-text">Address Book</strong>
          </MDBNavbarBrand>
        </MDBNavbar>
        <TableSize>
          <Right>
            <MDBCol sm="3">
              <select
                name="sort"
                className="browser-default custom-select"
                onChange={this.handleSort}
              >
                <option value="asc">Sort by</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </MDBCol>
          </Right>
          <BtnCont>
            <ButtonGroup
              size="large"
              color="primary"
              aria-label="large button group"
            >
              <Tooltip title="Create a Group">
                <Button onClick={this.handleOpenGroup}>
                  <Add />
                </Button>
              </Tooltip>

              <Tooltip title="Add Contact">
                <Button onClick={this.handleOpenAdd}>
                  <AddIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </BtnCont>
          <MaterialTable
            title={
              <TitleCont>
                <H4>All Contact</H4>
              </TitleCont>
            }
            columns={this.state.columns}
            data={this.state.contactData}
            options={{
              pageSize: 10,
              sorting: false,
              pageSizeOptions: [10, 15, 20],
              actionsColumnIndex: -1,
              selection: false,
              paginationType: "stepped"
            }}
          />
        </TableSize>
        <Modal
          handleOpenAdd={this.state.toggleAdd}
          handleCloseAdd={this.handleCloseAdd}
          addContact={this.addContact}
          handleChange={this.handleChange}
        />
        <Edit
          handleOpenEdit={this.state.toggleEdit}
          handleCloseEdit={this.handleCloseEdit}
          editContact={this.editContact}
          rowValue={this.state.rowData}
          handleChange={this.handleChange}
        />
        <Delete
          deleteContact={this.deleteContact}
          handleOpenDel={this.state.toggleDel}
          handleCloseDel={this.handleCloseDel}
          rowValue={this.state.rowData}
        />
        <Group
          handleChange={this.handleChange}
          createGroup={this.createGroup}
          handleOpenGroup={this.state.toggleG}
          handleCloseGroup={this.handleCloseGroup}
        />
        <SideDrawer
          handleCloseSide={this.handleCloseSide}
          handleOpenSide={this.state.left}
          myhandleLogout={myhandleLogout}
          groupData={this.state.groupData}
        />
        <ContactDetail
          handleDetailOpen={this.state.detail}
          handleDetailClose={this.handleDetailClose}
          rowValue={this.state.rowData}
        />
      </div>
    );
  }
}
