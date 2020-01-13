import React, { Component } from "react";
import "./register.css";
import { Form, Input, Button, Icon, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
      confirmDirty: false,
      autoCompleteResult: []
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/register");
    }
  }
  changeHandler(e) {
    e.name === "firstname"
      ? this.setState({ firstname: e.value })
      : e.name === "lastname"
      ? this.setState({ lastname: e.value })
      : e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "username"
      ? this.setState({ username: e.value })
      : e.name === "password"
      ? this.setState({ password: e.value })
      : this.setState({ confirm: e.value });
  }
  handleSubmit = e => {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      confirm
    } = this.state;
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirm === "" ||
      firstname === "" ||
      lastname === ""
    ) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    } else if (password !== confirm) {
      message.error("Password and confirm password doesn't match!");
    } else
      axios
        .post("http://localhost:4000/api/register", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "name",
            res.data.firstname + " " + res.data.lastname
          );
          message.success(
            `Sucessfully registered, Welcome ${res.data.firstname} &nbsp; ${res.data.lastname}`
          );
          console.log(res);
          this.props.history.push("/homepage");
        });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="register-container">
        <img alt="" src={require("./user.png")} />
        <br />
        <Form onSubmit={this.handleSubmit} className="register-form">
          <Form.Item>
            {getFieldDecorator("firstname", {
              initialValue: this.state.firstname,
              rules: [
                {
                  required: true,
                  message: "Please input your firstname!",
                  whitespace: true
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder="Enter firstname"
                name="firstname"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.firstname}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("lastname", {
              initialValue: this.state.lastname,
              rules: [
                {
                  required: true,
                  message: "Please input your lastname!",
                  whitespace: true
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder="Enter lastname"
                name="lastname"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.lastname}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              initialValue: this.state.email,
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.email}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("username", {
              initialValue: this.state.username,
              rules: [
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.username}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              initialValue: this.state.password,
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.password}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("confirm", {
              initialValue: this.state.confirm,
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm Password"
                name="confirm"
                onChange={e => this.changeHandler(e.target)}
                setfieldsvalue={this.state.confirm}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            <p>
              Already have an account?
              <Link to="/"> SIGN-IN HERE</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Register);
