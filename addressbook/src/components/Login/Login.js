import React, { Component } from "react";
import "antd/dist/antd.css";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Avatar } from "antd";
import {message} from 'antd'
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/");
    }
  }
  handleChange = e => {
    console.log(e.value);
    e.name === "userName"
      ? this.setState({ username: e.value })
      : this.setState({ password: e.value });
  };
  handleSubmit = e => {
    e.preventDefault();
 
    axios
      .post(`http://localhost:3003/api/login`, this.state)
      .then(res => {
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        this.props.history.push("/homepage");
        message.success("Welcome " + this.state.username);
      })
      .catch(err => {
        message.error("Incorrect Username or Password");
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="bodyClass">
        <div className="formContainer">
          <div className="mainContainer">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: "55px"
              }}
            >
              <Avatar size={100} icon="user" />
            </div>
            <br />
            <Form onSubmit={e=>this.handleSubmit(e)} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                    name="userName"
                    onChange={e => {
                      this.handleChange(e.target);
                    }}
                    required
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                  required
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={e => {
                      this.handleChange(e.target);
                    }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
               <div style={{color:'white',display:'inline-flex'}}>Or</div>  <Link to="/signup">register now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);
