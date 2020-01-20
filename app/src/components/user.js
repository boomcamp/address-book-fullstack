import React, { Component } from "react";
import {
  Layout,
  message,
  Typography,
  Button,
  Menu,
  Icon,
  Avatar,
  Card
} from "antd";
import Contact from "./contactTable";
import Addcontact from "./addcontact";
import Addgroup from "./addgroup";

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
      data: []
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
                  {/* <List
                    itemlayout="horizontal"
                    datasource={this.state.data}
                    renderitem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar>
                              {" "}
                              <Icon type="folder-add" />
                            </Avatar>
                          }
                          title={<a href="https://ant.design">{item.title}</a>}
                          description={this.state.data.group_name}
                        />
                      </List.Item>
                    )}
                  /> */}
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
