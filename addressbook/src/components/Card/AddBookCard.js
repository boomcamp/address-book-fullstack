import React, { Component } from "react";
import {
  Button,
  Tooltip,
  Modal,
  Form,
  Icon,
  Input,
  Select,
  Popconfirm
} from "antd";
import axios from "axios";
import { message } from "antd";
import "./adduser.css";
const { Option } = Select;
class AddBookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastname: "",
      firstname: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      stae_or_province: "",
      postal_code: "",
      country: ""
    };
  }

  handleChange = e => {
    console.log(e.value);
    e.name === "lname"
      ? this.setState({ lastname: e.value })
      : e.name === "fname"
      ? this.setState({ firstname: e.value })
      : e.name === "homephonenum"
      ? this.setState({ home_phone: e.value })
      : e.name === "mobilePhone"
      ? this.setState({ mobile_phone: e.value })
      : e.name === "workPhone"
      ? this.setState({ work_phone: e.value })
      : e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "city"
      ? this.setState({ city: e.value })
      : e.name === "state"
      ? this.setState({ stae_or_province: e.value })
      : e.name === "postalCode"
      ? this.setState({ postal_code: e.value })
      : e.name === "country"
      ? this.setState({ country: e.value })
      : console.log(this.state.lastname);
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    axios.post("http://localhost:3003/api/create", this.state).then(res => {
      console.log(res);
      // this.props.history.push("/homepage");
      message.success("adedd");
    });
  };
  onChange = checked => {
    this.setState({ loading: !checked });
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  confirm = () => {
    message.info("Clicked on Yes.");
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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const { visible, onCancel, onCreate, form } = this.props;
    // const { getFieldDecorator } = form;
    return (
      <div>
        <div className="addContainer">
          <div className="adding">
            <Tooltip title="Add Contact" placement="bottom">
              <Icon
                type="user-add"
                style={{ fontSize: "25px", color: "#fff" }}
                theme="outlined"
                className="add-user"
                onClick={this.showModal}
              ></Icon>
            </Tooltip>
            <Tooltip title="Add Group" placement="bottom">
              <Icon
                type="usergroup-add"
                style={{ fontSize: "25px", color: "#fff" }}
                theme="outlined"
                className="add-user"
                onClick={this.showModal}
              ></Icon>
            </Tooltip>
          </div>
        </div>

        <Modal
          title="Add Contact"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Form.Item>
                  {getFieldDecorator("Last Name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Last Name!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Last Name"
                      name="lname"
                      required
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("First Name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your First Name!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="First Name"
                      name="fname"
                      required
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Item>
                  {getFieldDecorator("home phone", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your home phone number!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      style={{ width: "100%" }}
                      placeholder="Home Phone Number"
                      name="homephonenum"
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("mobile phone", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Mobile phone number!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      style={{ width: "100%" }}
                      placeholder="Mooile Phone Number"
                      name="mobilePhone"
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("work phone", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Work phone number!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      style={{ width: "100%" }}
                      placeholder="Work Phone Number"
                      name="workPhone"
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
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(
                    <Input
                      name="email"
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      onChange={e => this.handleChange(e.target)}
                      placeholder="Email"
                    />
                  )}
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Form.Item>
                  {getFieldDecorator("City", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your City!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="environment"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="City"
                      name="city"
                      required
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="bank" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="State or Province"
                    name="state"
                    required
                    onChange={e => this.handleChange(e.target)}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="code" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Postal Code"
                    name="postalCode"
                    required
                    onChange={e => this.handleChange(e.target)}
                  />
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("Country", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Country Name!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="flag"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Country"
                      name="country"
                      required
                      onChange={e => this.handleChange(e.target)}
                    />
                  )}
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Popconfirm
                    placement="topLeft"
                    title="Want to Add ?"
                    onConfirm={e => this.handleSubmit(e)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onSubmit={e => this.handleSubmit(e)}
                    >
                      Save
                    </Button>
                  </Popconfirm>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AddBookCard);
