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
    super(props)  
  
    this.state = {
       id:'',
       lastname:'',
       allContacts:[],
       ids:parseInt(localStorage.getItem('id'))
    }
  }
  
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/");
    }
    this.getCont()
  }

  getCont = () => {
  const  id = localStorage.getItem('id')
    axios.get(`http://localhost:3003/api/allContacts/${id}`).then(data => {
        // console.log(data.lastname);
        // console.log(data)
        this.setState({ allContacts: data.data });
        // data.data.map(e => {
        //   console.log(e.lastname);
        //   console.log(e);
        //   this.setState({ lastname: e.lastname, firstname: e.firstname });
        // });
      });
  }
handleSearch =(e)=>{
  console.log(e)
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
            <Card getCont={this.getCont}/>
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

            <Addcontacts   />
          </div>
        </div>
        
        <div className="allContacts">
          <Allcontacts getCont={this.getCont} allContacts={this.state.allContacts}/>
        </div>
        <Footers />
      </div>
    );
  }
}
