import React, { Component } from "react";
import "./login.css";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/");
    }
  }
  changeHandler = e => {
    // console.log(e);
    e.name === "username"
      ? this.setState({ username: e.value })
      : this.setState({ password: e.value });
  };
  handleSubmit = e => {
    const { username, password } = this.state;
    e.preventDefault();
    if (username === "" || password === "") {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    } else
      axios
        .post("http://localhost:4000/api/login", this.state)
        .then(result => {
          // console.log(result.data.firstname + " " + result.data.lastname);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem(
            "name",
            result.data.firstname + " " + result.data.lastname
          );
          message.success(
            `Hi ${result.data.firstname}  ${result.data.lastname}!`
          );
          this.props.history.push("/homepage");
        })
        .catch(err => {
          message.error("Incorrect email or password!");
        });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <img alt="" src={require("./user.png")} />
        <br />
        <Form onSubmit={this.handleSubmit} className="login-form">
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
                onChange={e => this.changeHandler(e.target)}
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
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => this.changeHandler(e.target)}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <p>
              Dont' have an account?
              <Link to="/register"> REGISTER HERE</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);
