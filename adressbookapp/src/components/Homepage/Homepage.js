import React, { Component } from "react";
import { Layout, Icon, message, Tabs } from "antd";
import "./homepage.css";
import Contacts from "./Contacts/Contacts";
import AddContacts from "./AddContacts/AddContacts";
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
              <Icon type="logout" /> <span onClick={this.logout}>Logout</span>
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
                  <AddContacts />
                  <br></br>
                  <Contacts />
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
