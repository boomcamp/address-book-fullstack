import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Modal,
  Select,
  message,
  Col,
  Row
} from "antd";
import axios from "axios";

class addcontact extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      visible: false,

      first_name: "",
      last_name: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      state_or_province: "",
      postal_code: "",
      country: ""
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleInput = input => e => {
    this.setState({ [input]: e.target.value });
    console.log(input);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    axios({
      method: "post",
      url: "/contact",
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        home_phone: this.state.home_phone,
        mobile_phone: this.state.mobile_phone,
        work_phone: this.state.work_phone,
        email: this.state.email,
        city: this.state.city,
        state_or_province: this.state.state_or_province,
        postal_code: this.state.postal_code,
        country: this.state.country,
        userid: localStorage.getItem("id")
      }
    }).then(response => {
      this.props.load(response.data);
      this.props.form.setFieldsValue({
        first_name: "",
        last_name: "",
        Home: "",
        phone: "",
        work: "",
        email: "",
        city: "",
        state: "",
        postal: "",
        country: ""
      });
      setTimeout(() => {
        message.success({ content: "Successfully added contact", duration: 2 });
        this.setState({ data: true });
      }, 3000);
    });
  };
  render() {
    const { Option } = Select;

    const { getFieldDecorator } = this.props.form;
    const { visible, loading } = this.state;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+63"
    })(
      <Select style={{ width: 70 }}>
        <Option value="09">09</Option>
      </Select>
    );
    return (
      <div>
        <div>
          <Button type="link" onClick={this.showModal}>
            <Icon type="user-add" /> Add Contact
          </Button>
          <Modal
            visible={visible}
            title="Add Contact"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Back
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            ]}
          >
            <Form className="login-form">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator("first_name", {
                      rules: [
                        { required: true, message: "Firstname is required" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        required={true}
                        placeholder="Firstname"
                        onChange={this.handleInput("first_name")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator("last_name", {
                      rules: [
                        { required: true, message: "Lastname is required" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Lastname"
                        onChange={this.handleInput("last_name")}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator("Home", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Home number!"
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        prefix={
                          <Icon
                            type="phone"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Home phone"
                        onChange={this.handleInput("home_phone")}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your mobile number!"
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        prefix={
                          <Icon
                            type="mobile"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Mobile phone"
                        onChange={this.handleInput("mobile_phone")}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                {getFieldDecorator("work", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your work number!"
                    }
                  ]
                })(
                  <Input
                    addonBefore={prefixSelector}
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Work phone"
                    onChange={this.handleInput("work_phone")}
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
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
                    onChange={this.handleInput("email")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("city", {
                  rules: [{ required: true, message: "City is required" }]
                })(
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="City"
                    onChange={this.handleInput("city")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("state", {
                  rules: [
                    { required: true, message: "State or province is required" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="State or Province"
                    onChange={this.handleInput("state_or_province")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("postal", {
                  rules: [
                    { required: true, message: "Postal code is required" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Postal code"
                    onChange={this.handleInput("postal_code")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("country", {
                  rules: [{ required: true, message: "Country is required" }]
                })(
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Country"
                    onChange={this.handleInput("country")}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}
const ContactForm = Form.create()(addcontact);
export default ContactForm;
