import React, { Component } from "react";
import { Layout, Icon, message, Tabs, Modal, Popconfirm } from "antd";
import "./homepage.css";
import Contacts from "./Contacts/Contacts";

import AddContacts from "./AddContacts/AddContacts";
import axios from "axios";
import ViewContacts from "./ViewContacts/ViewContacts";

const { confirm } = Modal;
const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchinput: "",
      contacts: [],
      search: [],
      info: [],
      visible: false,
      disabled: true,
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
  onCancel = () => {
    this.setState({ visible: false, disabled: true, edit: "edit" });
  };
  getAll = () => {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:4000/api/contacts/${id}`).then(res => {
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
    // console.log(this);
    confirm({
      title: "Do you want to delete these person?",
      onOk() {
        const id = e;
        axios.delete(`http://localhost:4000/api/contacts/${id}`).then(res => {
          // console.log(this);
          current.getAll();
          message.success("Sucessfully deleted");
        });
      },
      onCancel() {
        // console.log("Cancel");
      }
    });
  };

  updateHandler = e => {
    this.setState({
      disabled: false
    });
  };

  onSave = e => {
    const id = e;
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
  render() {
    return (
      <div>
        <Layout>
          <Header
            className="header"
            style={{
              background: "#004d40",
              paddingLeft: 50,
              paddingRight: 50,
              width: "100%"
            }}
          >
            <div className="logo" style={{ color: "white" }}>
              <img
                alt=""
                src={require("./phone.png")}
                style={{ height: "40px" }}
              />
              &nbsp; Adress Book App
            </div>
            <div
              style={{
                color: "white",
                float: "right",
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              <Icon type="logout" />{" "}
              <Popconfirm
                title="Are you sure want to logout?"
                onConfirm={this.logout}
                onCancel={this.cancel}
              >
                Logout
              </Popconfirm>
            </div>
          </Header>
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
                  />
                  <br></br>
                  <Contacts
                    contacts={this.state.contacts}
                    getAll={this.getAll}
                    deleteHandler={this.deleteHandler}
                    viewHandler={this.viewHandler}
                    search={this.state.search}
                    searchinput={this.state.searchinput}
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
                  Tab 2
                </TabPane>
              </Tabs>
            </Layout>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Address Book App ©2020
          </Footer> */}
        </Layout>
      </div>
    );
  }
}
