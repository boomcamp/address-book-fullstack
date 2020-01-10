import React, { Component } from "react";
import { Form, Icon, Input, Button, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const cardholder = {
  height: "85%",
  width: "30%"
};

const form = {};

class register extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: " ",
      username: " ",
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
      url: "/users/register",
      data: this.state
    }).then(response => {
      console.log(response.data);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <Card style={cardholder}>
          <Form style={form}>
            <Avatar size={64} icon="user" />
            <h1>Register</h1>
            <Form.Item>
              {getFieldDecorator("first_name", {
                rules: [{ required: true, message: "Firstname is required" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Firstname"
                  name="first_name"
                  onChange={e => this.handleChange(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("last_name", {
                rules: [{ required: true, message: "Lastname is required" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Lastname"
                  name="last_name"
                  onChange={e => this.handleChange(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Email is required!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  name="email"
                  onChange={e => this.handleChange(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Username is required" }]
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
                  {
                    required: true,
                    message: "Password is required"
                  }
                ]
              })(
                <Input
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

            <Button type="primary" htmlType="submit">
              Register
            </Button>

            <Link to="/">{"Have already  an account? LogIn"}</Link>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
const RegisterForm = Form.create()(register);
export default RegisterForm;
