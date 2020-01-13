import React, { Component } from "react";
import { Form, Icon, Input, Button, Modal } from "antd";
import axios from "axios";
export default class addcontact extends Component {
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

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleChange = e => {
    this.setState({
      [e.name + "Error"]: e.value ? false : true,
      [e.name]: e.value
    });
  };
  handleSubmit = e => {
    axios
      .post("/contact", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        home_phone: this.state.home_phone,
        mobile_phone: this.state.mobile_phone,
        work_phone: this.state.work_phone,
        email: this.state.email,
        city: this.state.city,
        state_or_province: this.state.state_or_province,
        postal_code: this.state.postal_code,
        country: this.state.country
      })
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    const { visible, loading } = this.state;
    // const prefixSelector = getFieldDecorator("prefix", {
    //   initialValue: "+63"
    // });
    return (
      <div>
        <div>
          <h1 type="primary" onClick={this.showModal}>
            <Icon type="user-add" /> Add Contact
          </h1>
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
                loading={loading}
                onClick={this.handleOk}
              >
                Add
              </Button>
            ]}
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Firstname"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Lastname"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  //   addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Home phone"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Mobile phone"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Work phone"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="email"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="City"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="State or Province"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Postal code"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Country"
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}
