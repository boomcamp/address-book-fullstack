import React, { Component } from "react";
import { Form, Icon, Input, Button, Card, Avatar } from "antd";
import Login from "./login";

const cardholder = {
  backgroundColor: "#696969",
  height: "85%",
  width: "30%"
};
const handler = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#303030",
  padding: "8%"
};
const form = {};

export default class register extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div style={handler}>
          <Card style={cardholder}>
            <Form style={form}>
              <Avatar size={64} icon="user" />
              <h1>Register</h1>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Firstname"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Lastname"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              {/* <a href="">Log in</a> */}
            </Form>
          </Card>
          <Login />
        </div>
      </React.Fragment>
    );
  }
}
