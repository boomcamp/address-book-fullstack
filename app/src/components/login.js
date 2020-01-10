import React, { Component } from "react";
import { Form, Icon, Input, Button, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const cardholder = {
  backgroundColor: "",
  height: "85%",
  width: "30%",
  alignItem: "center"
};

class login extends Component {
  constructor() {
    super();

    this.state = {
      redirect: true,
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.name + "Error"]: e.value ? false : true,
      [e.name]: e.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/login",
      data: this.state
    })
      .then(response => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
      })
      .catch(err => {
        console.log("Invalid email and password");
      });
  };
  handleClick = () => {
    this.setState({
      redirect: false
    });
    // localStorage.setItem("token", response.data.token);
    this.props.history.push(`/main`);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // if (this.state.redirect) {
    // }
    return (
      <React.Fragment>
        <Card style={cardholder}>
          <Form onSubmit={this.handleSubmit}>
            <Avatar size={64} icon="user" />
            <h1>Log In</h1>
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
                  name="username"
                  onChange={e => this.handleChange(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input.Password
                  allow="true"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={e => this.handleChange(e.target)}
                />
              )}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleClick()}
            >
              Login
            </Button>
            <Link to="/register">Register</Link>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
const LoginForm = Form.create()(login);
export default LoginForm;
