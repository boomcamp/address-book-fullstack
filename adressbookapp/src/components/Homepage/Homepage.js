import React, { Component } from "react";
import { Layout, Breadcrumb, Icon, message, Tabs } from "antd";
import "./homepage.css";
import Contacts from "./Contacts/Contacts";
const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
              paddingRight: 50
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
              <Icon type="logout" /> <span onClick={this.logout}>Logout</span>
            </div>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <Layout style={{ padding: "24px 30px", background: "#fff" }}>
              <Tabs defaultActiveKey="1" style={{ height: "80vh" }}>
                <TabPane
                  tab={
                    <span style={{ fontSize: "19px" }}>
                      <Icon type="user" />
                      List of Contacts
                    </span>
                  }
                  key="1"
                >
                  <Contacts />
                </TabPane>
                <TabPane
                  tab={
                    <span style={{ fontSize: "19px" }}>
                      <Icon type="team" />
                      List of Groups
                    </span>
                  }
                  key="2"
                >
                  Tab 2
                </TabPane>
              </Tabs>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}
