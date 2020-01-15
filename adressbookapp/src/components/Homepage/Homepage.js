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
      contacts: [],
      info: [],
      visible: false
    };
    this.logout = this.logout.bind(this);
  }
  cancel(e) {}
  onCancel = () => {
    this.setState({ visible: false });
  };
  getAll = () => {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:4000/api/contacts/${id}`).then(res => {
      // console.log(res.data);
      this.setState({
        contacts: res.data
      });
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
    console.log("aw");
    // let current = this;
    // // console.log(this);
    // confirm({
    //   title: "Do you want to delete these person?",
    //   onOk() {
    //     const id = e;
    //     axios.delete(`http://localhost:4000/api/contacts/${id}`).then(res => {
    //       // console.log(this);
    //       current.getAll();
    //       message.success("Sucessfully deleted");
    //     });
    //   },
    //   onCancel() {
    //     // console.log("Cancel");
    //   }
    // });
  };

  viewHandler = e => {
    // console.log(e.firstname);
    this.setState({
      visible: true,
      info: e
    });
  };
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
  logout() {
    message.success("Sucessfully logout");
    this.props.history.push("/");
    localStorage.clear();
  }
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
                    getAll={this.getAll}
                  />
                  <br></br>
                  <Contacts
                    contacts={this.state.contacts}
                    getAll={this.getAll}
                    deleteHandler={this.deleteHandler}
                    updateHandler={this.updateHandler}
                    viewHandler={this.viewHandler}
                  />
                  <ViewContacts
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    info={this.state.info}
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
