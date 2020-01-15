import React, { Component } from "react";
import { Icon } from "antd";
import { Modal, Button } from "antd";
import { Form, Input } from "antd";
class ViewContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(nextProps) {
    const contact = this.props.info;
    if (nextProps.info !== this.props.info) {
      this.props.form.setFieldsValue({
        firstname: contact.firstname,
        lastname: contact.lastname,
        home_phone: contact.home_phone,
        mobile_phone: contact.mobile_phone,
        work_phone: contact.work_phone,
        email: contact.email,
        city: contact.city,
        state_or_province: contact.state_or_province,
        postal_code: contact.postal_code,
        country: contact.country
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {" "}
        <Modal
          visible={this.props.visible}
          title={`${this.props.info.firstname} ${this.props.info.lastname}`}
          onOk={this.handleOk}
          onCancel={this.props.onCancel}
          footer={null}
        >
          <Form
            layout="inline"
            className="example-input"
            onSubmit={this.handleSubmit}
          >
            <Form.Item>
              {getFieldDecorator("firstname", {
                rules: [{ required: true, message: "Please input firstname!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="firstname"
                  name="firstname"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("lastname", {
                rules: [{ required: true, message: "Please input lastname!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  onChange={e => this.changeHandler(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("home_phone", {
                rules: [{ required: true, message: "Please input home_phone!" }]
              })(
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="home_phone"
                  name="home_phone"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("mobile_phone", {
                rules: [
                  { required: true, message: "Please input mobile_phone!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="mobile_phone"
                  name="mobile_phone"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("work_phone", {
                rules: [{ required: true, message: "Please input work_phone!" }]
              })(
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="work_phone"
                  name="work_phone"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="email"
                  name="email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("city", {
                rules: [{ required: true, message: "Please input city!" }]
              })(
                <Input
                  prefix={
                    <Icon
                      type="environment"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="text"
                  placeholder="city"
                  name="city"
                  setfieldsvalue={this.state.city}
                  onChange={e => this.changeHandler(e.target)}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("state_or_province", {
                rules: [
                  { required: true, message: "Please input state_or_province!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="bank" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="state or province"
                  name="state"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("postal_code", {
                rules: [
                  { required: true, message: "Please input postal_code!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="code" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="postal_code"
                  name="postal"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("country", {
                rules: [{ required: true, message: "Please input country!" }]
              })(
                <Input
                  prefix={
                    <Icon type="flag" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="country"
                  name="country"
                />
              )}
            </Form.Item>
            <br />
            <br />
            <Button onClick={this.props.onCancel}>cancel</Button>&nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              save
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ViewContacts);
