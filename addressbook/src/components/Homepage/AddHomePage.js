import React, { Component } from "react";
import { message } from "antd";
import axios from "axios";
import { Layout, Menu, Icon, Popconfirm, Button, Tooltip } from "antd";
import "./home.css";
import Footers from "../Footer/Footer";
import Card from "../Card/AddBookCard";
import Headers from "../Header/Header";
import Allcontacts from "../Allcontacts/Allcontacts";
import Addcontacts from "../Addcontacts/Addcontacts";
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

export default class AddHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      lastname: "",
      allGroups: [],
      allContacts: [],
      ids: parseInt(localStorage.getItem("id"))
    };
  }

  // componentDidMount() {
  //   console.log('BRYAN')
  // }

  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/");
      //   }
    }
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:3003/api/allContacts/${id}?sort=ASC`)
      .then(data => {
        //console.log(data.lastname);
        // console.log('hhh')

        this.setState({ allContacts: data.data });
      });
  }

  getCont = () => {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:3003/api/allContacts/${id}`).then(data => {
      //console.log(data.lastname);
      // console.log('hhh')

      this.setState({ allContacts: data.data });
    });
  };

  handleSearch = e => {
    // console.log(e);
  };
  handleLogout = e => {
    localStorage.clear();
    this.props.history.push("/");
    message.success("You have been logged out!");
  };

  cancel = e => {
    // console.log(e);
    message.error("Click on No");
  };

  logout = e => {};
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    // console.log(this.state.allContacts)
    return (
      <div>
        <div className="addHeader">
          <div className="addBook">
            {/* <h1>gggg</h1> */}
            <Icon
              type="book"
              style={{ fontSize: "60px", color: "#fff" }}
              theme="outlined"
            />
            <p>Address Book</p>
          </div>

          <div className="pop">
            <Card
              getCont={this.getCont}
              getAllgroups={this.state.allGroups}
              allContacts={this.state.allContacts}
            />
            <Popconfirm
              placement="leftTop"
              title="Are you Sure to logout?"
              onConfirm={this.handleLogout}
              okText="Yes"
              cancelText="No"
            >
              {/* <Chip icon={<ExitToAppIcon />} label="Logout" /> */}
              <Tooltip title="Logout">
                <Icon
                  className="logout"
                  type="logout"
                  style={{ fontSize: "25px", color: "#fff" }}
                  theme="outlined"
                ></Icon>
              </Tooltip>
            </Popconfirm>

            <Addcontacts />
          </div>
        </div>

        <div className="allContacts">
          <Allcontacts
            getCont={this.getCont}
            allContacts={this.state.allContacts}
            // allgroup ={this.state.}
          />
        </div>
        <Footers />
      </div>
    );
  }
}
