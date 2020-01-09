import React, { Component } from "react";
import { Form, Icon, Input, Button, Card, Avatar } from "antd";

const cardholder = {
  backgroundColor: "#696969",
  height: "85%",
  width: "30%"
};

export default class login extends Component {
  render() {
    return (
      <React.Fragment>
        <Card style={cardholder}>
          <Form>
            <Avatar size={64} icon="user" />
            <h1>Log In</h1>
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
              Login
            </Button>
            {/* <a href="">Log in</a> */}
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
