import React, { Component } from "react";
import {
  Drawer,
  Form,
  Icon,
  Input,
  Select,
  Button,
  message,
  Col,
  Row
} from "antd";
import axios from "axios";
import Image from "./img/logos.jpg";

class editContact extends Component {
  constructor() {
    super();

    this.state = {
      placement: "right",
      loading: false,
      visible: false
    };
  }
  componentDidUpdate = nextProps => {
    const con = this.props.update;
    if (nextProps.update !== this.props.update && con) {
      this.setState({
        contact: {
          key: con.key,
          first_name: con.first_name,
          last_name: con.last_name,
          email: con.email,
          home_phone: con.home_phone,
          mobile_phone: con.mobile_phone,
          work_phone: con.work_phone,
          city: con.city,
          state_or_province: con.state_or_province,
          postal_code: con.postal_code,
          country: con.country
        }
      });
    }
  };
  handleUpdate = id => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);

    axios({
      method: "patch",
      url: `/update/${id}`,
      data: {
        first_name: this.state.contact.first_name,
        last_name: this.state.contact.last_name,
        email: this.state.contact.email,
        home_phone: this.state.contact.home_phone,
        mobile_phone: this.state.contact.mobile_phone,
        work_phone: this.state.contact.work_phone,
        state_or_province: this.state.contact.state_or_province,
        city: this.state.contact.city,
        postal_code: this.state.contact.postal_code,
        country: this.state.contact.country
      }
    }).then(res => {
      console.log(res.data);
    });
    setTimeout(() => {
      message.success({ content: "Successfully Updated", duration: 2 });
      this.setState({ data: true, visible: false });
    }, 3000);
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+63"
    })(
      <Select style={{ width: 70 }}>
        <Option value="09">09</Option>
      </Select>
    );

    return (
      <div>
        <React.Fragment>
          <Drawer
            width="600"
            title="Update Contact"
            placement={this.state.placement}
            closable={true}
            onClose={this.props.handleCancel}
            visible={this.props.visible}
          >
            <img
              src={Image}
              alt=""
              style={{ padding: "10px", width: "500px", height: "190px" }}
            />
            <Form className="login-form" layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First name">
                    <Input
                      required
                      placeholder="Firstname"
                      prefix={
                        <Icon
                          type="user"
                          twoToneColor="#eb2f96"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact
                          ? this.state.contact.first_name
                          : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            first_name: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last name">
                    <Input
                      placeholder="Lastname"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact ? this.state.contact.last_name : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            last_name: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Home phone">
                    <Input
                      placeholder="Home phone"
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact
                          ? this.state.contact.home_phone
                          : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            home_phone: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Mobile name">
                    <Input
                      placeholder="Mobile phone"
                      addonBefore={prefixSelector}
                      prefix={
                        <Icon
                          type="mobile"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact
                          ? this.state.contact.mobile_phone
                          : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            mobile_phone: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Work name">
                    <Input
                      placeholder="Work phone"
                      addonBefore={prefixSelector}
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact
                          ? this.state.contact.work_phone
                          : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            work_phone: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email Address">
                    <Input
                      placeholder="email"
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      value={
                        this.state.contact ? this.state.contact.email : null
                      }
                      onChange={e =>
                        this.setState({
                          contact: {
                            ...this.state.contact,
                            email: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="City">
                <Input
                  placeholder="City"
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={this.state.contact ? this.state.contact.city : null}
                  onChange={e =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        city: e.target.value
                      }
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="State or Province">
                <Input
                  placeholder="State or Province"
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact
                      ? this.state.contact.state_or_province
                      : null
                  }
                  onChange={e =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        state_or_province: e.target.value
                      }
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Postal Code">
                <Input
                  placeholder="Postal code"
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact ? this.state.contact.postal_code : null
                  }
                  onChange={e =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        postal_code: e.target.value
                      }
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Country">
                <Input
                  placeholder="Country"
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={this.state.contact ? this.state.contact.country : null}
                  onChange={e =>
                    this.setState({
                      contact: {
                        ...this.state.contact,
                        country: e.target.value
                      }
                    })
                  }
                />
              </Form.Item>
            </Form>
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button
                onClick={this.props.handleCancel}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                onClick={e => this.handleUpdate(this.props.update.key)}
                type="primary"
                loading={loading}
              >
                Save
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
const UpdateForm = Form.create()(editContact);
export default UpdateForm;
