import React, { Component } from "react";
import { Form, Input, Icon, Button, AutoComplete } from "antd";
import "./reg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";
// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/homepage");
    } else {
      this.props.history.push("/signup");
    }
  }

  handleChange = e => {
    console.log(e.value);
    e.name === "userName"
      ? this.setState({ username: e.value })
      : e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "password"
      ? this.setState({ password: e.value })
      : this.setState({ confirmPassword: e.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    if (this.state.confirmPassword === this.state.password) {
      axios.post("http://localhost:3003/api/register", this.state).then(res => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id",res.data.id)
        this.props.history.push("/homepage");
        message.success("Welcome " + this.state.username);
      });
    } else {
      message.warning("Password and Confirm Password didn't match");
    }
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="bodyClass">
        <div className="formMainContainer">
          <div className="FormContainer">
            <div className="container">
              <Form {...formItemLayout} onSubmit={e => this.handleSubmit(e)}>
                <div className="signUp">
                  {/* <Avatar size={100} icon="user" /> */}
                  Sign Up
                </div>

                <hr className="kel"></hr>
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                      onChange={e => this.handleChange(e.target)}
                      name="userName"
                      required
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
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(
                    <Input
                      required
                      placeholder="Email"
                      name="email"
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item hasFeedback>
                  {getFieldDecorator("password", {
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
                      required
                      placeholder="Password"
                      name="password"
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item hasFeedback>
                  {getFieldDecorator("confirm", {
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
                      placeholder="Confirm Password"
                      onChange={e => this.handleChange(e.target)}
                      name="confirmPassword"
                      required
                    />
                  )}
                </Form.Item>
                <div className="regContainer">
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "100%"
                      }}
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <p className=" accountAlready"> already have an account?</p>
                  <Link to="/">Login</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Registration);
