import React, { Component } from "react";
import { message } from "antd";
import axios from "axios";
import { Layout, Menu, Icon, Popconfirm, Button, Tooltip } from "antd";
import "./home.css";
import Footers from '../Footer/Footer'
import Card from "../Card/AddBookCard";
import Headers from "../Header/Header";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class AddHomePage extends Component {
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/");
    }

    axios.get(`http://localhost:3003/api/users`).then(data => {
      console.log(data);
    });
  }

  handleLogout = e => {
    localStorage.clear();
    this.props.history.push("/");
    message.success("You have been logged out!");
  };

  cancel = e => {
    console.log(e);
    message.error("Click on No");
  };

  logout = e => {};
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <div>
        <div className="addHeader">
          <div className="addBook">
            <Icon
              type="book"
              style={{ fontSize: "60px", color: "#fff" }}
              theme="outlined"
            />
            <p>Address Book</p>
          </div>
          <div className="pop">
            <Popconfirm
              placement="leftTop"
              title="Are you Sure to logout?"
              onConfirm={this.handleLogout}
              okText="Yes"
              cancelText="No"
            >
              {/* <Chip icon={<ExitToAppIcon />} label="Logout" /> */}
              <Tooltip title="Logout">
                <Button icon="logout"></Button>
              </Tooltip>
              ,
            </Popconfirm>
          </div>
        </div>

        <Headers />
        <Card/>
        <Footers/>
      </div>
    );
  }
}
