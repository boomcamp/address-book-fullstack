import React, { Component } from "react";
import { Form, Icon, Input, Button, Card, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "./img/logos.jpg";

const container = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  width: "100%",
  height: "100vh",
  padding: "2%"
};
const formholder = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  padding: "30px",
  width: "500px",
  marginTop: "50px",
  textAlign: "center",
  height: "80%"
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
      password: "",

      nameErr: false,
      passErr: false,
      disButton: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.name + "Error"]: e.value ? false : true,
      [e.name]: e.value
    });
  };

  handleSubmit = (e, key) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "/users/register",
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => {
      if (e.target.value === "") {
        console.log("nothing here");
      }
      console.log(response.data);

      message.success({ content: "Successfully Register", key, duration: 2 });
      this.props.history.replace("/user");
    });
  };

  validatePassword = e => {
    if (e.target.value.length < 8) {
      console.log("invalid pass");
    } else {
      console.log("passw");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <div style={container}>
          <Card style={formholder}>
            <Form style={form} layout="vertical">
              <img src={Image} alt="" />
              <h1>Sign up </h1>
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
                    },
                    { validator: this.validatePassword }
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

              <Button
                type="primary"
                style={{
                  backgroundColor: "#607C98",
                  width: "400px",
                  borderRadius: "20px"
                }}
                htmlType="submit"
                onChange={this.handleSubmit}
              >
                REGISTER
              </Button>
              <Form.Item>
                Have already an account? <Link to="/">SignIn</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
const RegisterForm = Form.create()(register);
export default RegisterForm;
