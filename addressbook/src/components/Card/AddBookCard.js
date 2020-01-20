import React, { Component } from "react";
import { Tooltip, Modal, Form, Icon, Input, Select, Popconfirm } from "antd";
import { Drawer, Button } from "antd";
import Groups from "../Groups/Groups";
import axios from "axios";
import { message } from "antd";
import "./adduser.css";
const { Option } = Select;
class AddBookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGroups:this.props.getAllgroups,
      visible:false,
      lastname: "",
      firstname: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      stae_or_province: "",
      postal_code: "",
      country: "",
      userid:localStorage.getItem('id'),
    };
  }

  handleChange = e => {
   var ids =localStorage.getItem('id')
    console.log(e.value);
    // this.setState({userId:ids})
    console.log(this.state.userid)
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
      :console.log("object")
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);

    if (
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.home_phone !== "" &&
      this.state.mobile_phone !== "" &&
      this.state.work_phone !== "" &&
      this.state.email !== "" &&
      this.state.city !== "" &&
      this.state.stae_or_province !== "" &&
      this.state.postal_code !== "" &&
      this.state.country !== ""
    ) {
      axios.post("http://localhost:3003/api/create", this.state).then(res => {
        console.log(res); 
        console.log(this.state.userId)
        message.success("Added Successfully!");
        this.setState({
          lastname: "",
          firstname: "",
          home_phone: "",
          mobile_phone: "",
          work_phone: "",
          email: "",
          city: "",
          stae_or_province: "",
          postal_code: "",
          country: "",
          visible:false
        })
        this.props.getCont()
        setTimeout(window.location.reload.bind(window.location), 250);
      });
    } else {
      message.warning("Please Fill Out the Form");

    }
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
 
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 }
    //   }
    // };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8
    //     }
    //   }
    // };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
  console.log(this.state.getAllgroups)
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

            <Groups userid={this.state.userid} allGroups={this.state.allGroups}/>
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
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit(e);
              }}
            >
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
                      placeholder="Mobile Phone Number"
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
                      required
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
