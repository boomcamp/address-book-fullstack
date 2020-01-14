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
  width: "450px",
  textAlign: "center",
  height: "60%"

  // ['@media (max-width:450px)']: {s
  //      width: '95%',
  //      marginTop: '50px',
  //     },
};

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount(props) {
    console.log(this.props);
    if (localStorage.getItem("token")) {
      this.props.history.push("/user");
    }
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
      url: "/login",
      data: this.state
    })
      .then(response => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("username", response.data.username);
        this.props.history.push("/user");
        message.success({ content: "Successfully Login", key, duration: 2 });
      })

      .catch(err => {
        console.log("invalid username and password");
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div style={container}>
          <Card style={formholder}>
            <Form onSubmit={this.handleSubmit}>
              <img src={Image} alt="" />
              <h1>SignIn</h1>
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
                    required={true}
                    placeholder="Username"
                    name="username"
                    setfieldsvalue={this.state.username}
                    onChange={e => this.handleChange(e.target)}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Password!"
                    }
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
                    setfieldsvalue={this.state.firstname}
                    onChange={e => this.handleChange(e.target)}
                  />
                )}
              </Form.Item>

              <Button
                style={{
                  backgroundColor: "#607C98",
                  width: "400px",
                  borderRadius: "20px"
                }}
                type="primary"
                htmlType="submit"
              >
                SIGNIN
              </Button>
            </Form>
            Don't have an account? <Link to="/register">SignUp Now!</Link>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
const LoginForm = Form.create()(login);
export default LoginForm;
