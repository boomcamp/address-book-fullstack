import React, { Component } from "react";
import { Layout, Icon, message, Tabs, Modal, Popconfirm } from "antd";
import "./homepage.css";
import Contacts from "./Contacts/Contacts";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown
} from "mdbreact";

import AddContacts from "./AddContacts/AddContacts";
import axios from "axios";
import ViewContacts from "./ViewContacts/ViewContacts";
import AddGroups from "./AddGroups/AddGroups";
import AddtoGroup from "./AddtoGroups/AddtoGroup";
import Groups from "./Groups/Groups";

const { confirm } = Modal;
const { Content } = Layout;
const TabPane = Tabs.TabPane;
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      searchinput: "",
      contacts: [],
      contactId: null,
      groups: [],
      search: [],
      newGroups: [],
      info: [],
      arr: [],
      visible: false,
      visiblee: false,
      disabled: true,
      selectValue: "ASC",
      firstname: "",
      lastname: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      state_or_province: "",
      postal_code: "",
      country: ""
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
      this.setState({
        name: localStorage.getItem("name")
      });
    } else {
      this.props.history.push("/");
    }
  }
  cancel(e) {}
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  onCancel = () => {
    this.setState({ visible: false, disabled: true, edit: "edit" });
  };
  onClickCancel = () => {
    this.setState({ visiblee: false });
  };
  getAll = () => {
    const id = localStorage.getItem("id");
    axios
      .get(
        `http://localhost:4000/api/contacts/${id}?sort=${this.state.selectValue}`
      )
      .then(res => {
        this.setState({
          contacts: res.data
        });
      });
  };

  onUpdate = e => {
    const fieldName = e.target.name;
    const val = e.target.value;
    this.setState({
      [fieldName]: val
    });
  };

  deleteHandler = e => {
    let current = this;
    const x = e.contactid;
    confirm({
      title: "Do you want to delete these person?",
      onOk() {
        const id = x;
        axios.delete(`http://localhost:4000/api/contacts/${id}`).then(res => {
          // console.log(this);
          current.getAll();
          message.success("Sucessfully deleted");
        });
      },
      onCancel() {}
    });
  };

  updateHandler = e => {
    this.setState({
      disabled: false,
      firstname: e.firstname,
      lastname: e.lastname,
      home_phone: e.home_phone,
      work_phone: e.work_phone,
      mobile_phone: e.mobile_phone,
      email: e.email,
      city: e.city,
      state_or_province: e.state_or_province,
      postal_code: e.postal_code,
      country: e.country
    });
  };

  onSave = e => {
    const id = e.contactid;
    axios
      .patch(`http://localhost:4000/api/contacts/${id}`, {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        home_phone: this.state.home_phone,
        mobile_phone: this.state.mobile_phone,
        work_phone: this.state.work_phone,
        email: this.state.email,
        city: this.state.city,
        state_or_province: this.state.state_or_province,
        postal_code: this.state.postal_code,
        country: this.state.country
      })
      .then(res => {
        // console.log(res);
        this.getAll();
        message.success("Updated successfully");
        this.setState({
          disabled: true,
          visible: false
        });
      });
  };

  viewHandler = e => {
    this.setState({
      visible: true,
      info: e
    });
  };

  viewGroups = e => {
    this.setState({ newGroups: [] });
    let x = e.contactid;
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:4000/api/groupContact/${x}`)
      .then(req => {
        axios
          .get(`http://localhost:4000/api/selectedGroups/${id}`)
          .then(res => {
            // console.log(req.data, res.data);
            const a = req.data;
            const b = res.data;
            let valuesA = a.reduce(
              (a, { id }) => Object.assign(a, { [id]: id }),
              {}
            );
            let valuesB = b.reduce(
              (a, { id }) => Object.assign(a, { [id]: id }),
              {}
            );
            let result = [
              ...a.filter(({ id }) => !valuesB[id]),
              ...b.filter(({ id }) => !valuesA[id])
            ];
            result.map(i => {
              // console.log(i);
              return axios
                .get(`http://localhost:4000/api/newGroups/${i.id}`)
                .then(b => {
                  //
                  b.data.map(item =>
                    this.setState({
                      newGroups: this.state.newGroups.concat(item),
                      contactId: x
                    })
                  );
                })
                .catch(err => console.log(err));
            });
          });
        this.setState({
          visiblee: true
        });
      })

      .catch(err => console.log(err));
  };
  getGroups = e => {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:4000/api/groups/${id}`).then(res => {
      // console.log(res);
      this.setState({
        groups: res.data
      });
    });
  };
  logout() {
    message.success("Sucessfully logout");
    this.props.history.push("/");
    localStorage.clear();
  }
  handleSearch = e => {
    this.setState({ searchinput: e.target.value });
    const search = this.state.contacts.filter(data =>
      new RegExp(`${e.target.value}`, "i").test(data.firstname + data.lastname)
    );
    this.setState({
      search: search
    });
  };
  onChange = e => {
    this.setState(
      {
        selectValue: e
      },
      () => {
        this.getAll();
      }
    );
  };
  render() {
    // console.log(this.state.newGroups);
    return (
      <div>
        <Layout>
          <MDBNavbar dark expand="md" style={{ backgroundColor: "#004d40" }}>
            <MDBNavbarBrand>
              <strong className="white-text">
                <div className="logo" style={{ color: "white" }}>
                  <img
                    alt=""
                    src={require("./phone.png")}
                    style={{ height: "40px" }}
                  />
                  &nbsp; Adress Book App
                  {/* {localStorage.getItem("name")} */}
                </div>
              </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown style={{ color: "white" }}>
                    {/* LOGGED IN USER: CLARK */}
                    <div
                      style={{
                        color: "white",
                        float: "right",
                        cursor: "pointer",
                        fontSize: "12px",
                        marginLeft: "15px"
                      }}
                    >
                      <Icon type="logout" />
                      &nbsp;
                      <Popconfirm
                        title="Are you sure want to logout?"
                        onConfirm={this.logout}
                        onCancel={this.cancel}
                        style={{ width: "100px;" }}
                      >
                        LOGOUT
                      </Popconfirm>
                    </div>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>

          <Content>
            <Layout style={{ padding: "24px 30px", background: "#fff" }}>
              <Tabs defaultActiveKey="1" style={{ height: "auto" }}>
                <TabPane
                  tab={
                    <span style={{ fontSize: "19px" }}>
                      <Icon type="solution" />
                      Contacts
                    </span>
                  }
                  key="1"
                >
                  <AddContacts
                    // contacts={this.state.contacts}
                    visible={this.state.visible}
                    getAll={this.getAll}
                    contacts={this.state.contacts}
                    handleSearch={this.handleSearch}
                    onChange={this.onChange}
                    selectValue={this.state.selectValue}
                  />
                  <br></br>
                  <Contacts
                    contacts={this.state.contacts}
                    getAll={this.getAll}
                    deleteHandler={this.deleteHandler}
                    viewHandler={this.viewHandler}
                    search={this.state.search}
                    searchinput={this.state.searchinput}
                    viewGroups={this.viewGroups}
                  />
                  <ViewContacts
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    info={this.state.info}
                    updateHandler={this.updateHandler}
                    disabled={this.state.disabled}
                    edit={this.state.edit}
                    details={this.state.details}
                    onUpdate={this.onUpdate}
                    onSave={this.onSave}
                  />
                  <AddtoGroup
                    getAll={this.getAll}
                    visible={this.state.visiblee}
                    onClickCancel={this.onClickCancel}
                    getGroups={this.getGroups}
                    groups={this.state.newGroups}
                    onCancel={this.onCancel}
                    contactId={this.state.contactId}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span style={{ fontSize: "19px" }}>
                      <Icon type="team" />
                      Groups
                    </span>
                  }
                  key="2"
                >
                  <AddGroups getAll={this.getAll} getGroups={this.getGroups} />
                  <br></br>
                  <Groups
                    getGroups={this.getGroups}
                    groups={this.state.groups}
                  />
                </TabPane>
              </Tabs>
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}
