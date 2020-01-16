import React, { Component } from "react";
import {
  Layout,
  message,
  Typography,
  Input,
  Button,
  Menu,
  Icon,
  Avatar,
  Card,
  Dropdown
} from "antd";
import "./user.css";
import Contact from "./contactTable";
import Addcontact from "./addcontact";
import axios from "axios";
import Image from "./img/logos.jpg";

const header = {
  display: "flex",
  backgroundColor: "#607C98",
  color: "#fff"
};
const logout = {
  marginLeft: "1590px"
};
export default class user extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem("username"),
      openModal: false
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
  showModal = () => {
    this.setState({
      openModal: true
    });
  };

  handleCancel = () => {
    this.setState({ openModal: false });
  };
  // handleSearch = input => e => {
  //   axios.get("/search").then(res => {
  //     this.setState({ [input]: e.target.value });
  //     console.log(input);
  //   });
  // };
  handleSearch = e => {
    console.log(e.value);
  };

  render() {
    const { Title } = Typography;
    const { Search } = Input;
    const { Header, Content, Sider } = Layout;
    const { Meta } = Card;
    const { SubMenu } = Menu;
    let calendar = new Date();
    let date = calendar.getUTCDate();
    let month = calendar.getUTCMonth();
    let hours = calendar.getHours();
    let min = calendar.getUTCMinutes();
    let sec = calendar.getUTCSeconds();
    let year = calendar.getUTCFullYear();
    let Today = `${month}/${date}/${year}  ${hours}:${min}:${sec}`;
    return (
      <Layout>
        <Header style={header}>
          <div> Address Book</div>
          <div>
            {" "}
            <Button ghost style={logout} onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </Header>

        <Content>
          <Layout style={{ padding: "20px 50px", height: "94vh" }}>
            <Sider width={300} style={{ background: "#fff" }}>
              <div className="logo" />
              <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src={
                      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                  />
                }
                actions={[<Addcontact />, <Addcontact />]}
              >
                <Meta
                  avatar={<Avatar size="large" icon="user" />}
                  description=""
                  title={this.state.username}
                />
              </Card>

              <Title></Title>
              <Menu
                onClick={this.handleClick}
                style={{ width: 300 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="usergroup-add" /> <span>Group</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">Group 1</Menu.Item>
                  <Menu.Item key="2">Group 2</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout
              style={{
                padding: "0 24px 24px"
              }}
            >
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0
                }}
              >
                <Content
                  style={{
                    display: "flex",

                    padding: "5px",
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <Search
                    placeholder="input search text"
                    onChange={e => {
                      this.handleSearch(e.target);
                    }}
                    style={{ width: 400 }}
                  />
                </Content>
                <Content>
                  <Contact />
                </Content>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
