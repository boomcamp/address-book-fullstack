import React, { Component } from "react";
import {
  Layout,
  message,
  Typography,
  Button,
  Menu,
  Icon,
  Avatar,
  Card,
  List
} from "antd";
import "./user.css";
import Contact from "./contactTable";
import Addcontact from "./addcontact";
import Addgroup from "./addgroup";
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
      openModal: false,
      query: "",
      group: []
    };
  }
  componentDidMount = () => {
    axios({
      method: "get",
      url: `/group/list`,
      data: {
        group_name: this.state.group
      }
    }).then(res => {
      // console.log(res.group);
      // this.setState({
      //   data: res.group
      // });
    });
  };

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

  search = e => {
    this.setState({
      query: ""
    });
  };
  handleCancel = () => {
    this.setState({ openModal: false });
  };

  handleLoad = e => {
    this.setState({ user: e });
  };

  render() {
    console.log(this.props);
    const { Title } = Typography;
    const { Header, Content, Sider } = Layout;
    const { Meta } = Card;
    const { SubMenu } = Menu;
    return (
      <Layout>
        <Header style={header}>
          <div> Address Book</div>
          <div>
            <Button ghost style={logout} onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </Header>

        <Content>
          <Layout style={{ padding: "20px 50px" }}>
            <Sider width={350} style={{ background: "#fff" }}>
              <div className="logo" />
              <Card
                style={{ width: 350 }}
                cover={
                  <img
                    alt="example"
                    src={
                      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                  />
                }
                actions={[<Addcontact load={this.handleLoad} />, <Addgroup />]}
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
                style={{ width: 350, padding: 20 }}
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
                  <List
                    itemLayout="horizontal"
                    dataSource="Group 1"
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar>
                              {" "}
                              <Icon type="folder-add" />
                            </Avatar>
                          }
                          title="Group 1"
                          width="20px"
                        />
                      </List.Item>
                    )}
                  />
                </SubMenu>
              </Menu>
            </Sider>

            <Layout
              style={{
                padding: "0 24px 24px",
                height: "100vh"
              }}
            >
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0
                }}
              >
                {<Contact user={this.state.handleLoad} />}
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
