import React, { Component } from "react";
import { Layout, Menu, Icon, message } from "antd";
import "./user.css";
import Contact from "./contactTable";
import Addcontact from "./addcontact";

export default class user extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem("username")
    };
  }

  handleLogout = key => {
    localStorage.clear();
    this.props.history.push("/");
    message.success({ content: "Successfully Logout", key, duration: 2 });
  };
  callback(key) {
    console.log(key);
  }
  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item onClick={this.handleLogout}>Logout</Menu.Item>
            <Menu.Item>{this.state.username}</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px 50px", height: "94vh" }}>
          <Layout
            style={{
              padding: "24px 0",
              background: "#fff",
              width: "100%",
              height: "100%"
            }}
          >
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="contacts" />
                      Contacts
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Addcontact />
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="usergroup-add" />
                      Group
                    </span>
                  }
                >
                  <Menu.Item key="5"></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 30px" }}>
              <Contact />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
