import React, { Component } from "react";
import { Drawer, message, Form, Icon, Input, Select, Button } from "antd";
import axios from "axios";

class editContact extends Component {
  constructor() {
    super();

    this.state = {
      placement: "right",
      contact: null,
      loading: false,
      visible: false
    };
  }
  componentDidUpdate = nextProps => {
    const con = this.props.update;
    if (nextProps.update !== this.props.update && con) {
      // console.log("yeah");
      this.setState({
        contact: {
          key: con.key,
          first_name: con.first_name,
          last_name: con.last_name,
          email: con.email,
          home_phone: con.home_phone,
          mobile_phone: con.mobile_phone,
          work_phone: con.work_phone,
          postal_code: con.postal_code,
          city: con.city,
          state_or_province: con.state_or_province,
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
        state_or_province: this.state.contact.work_phone,
        city: this.state.contact.city,
        postal_code: this.state.postal_code,
        country: this.state.contact.country
      }
    }).then(res => {
      console.log(res.data);
    });
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
            <Form className="login-form">
              <Form.Item>
                <Input
                  required
                  placeholder="Firstname"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact ? this.state.contact.first_name : null
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
              <Form.Item>
                <Input
                  placeholder="Lastname"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
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

              <Form.Item>
                <Input
                  placeholder="Home phone"
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact ? this.state.contact.home_phone : null
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
              <Form.Item>
                <Input
                  placeholder="Mobile phone"
                  addonBefore={prefixSelector}
                  prefix={
                    <Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact ? this.state.contact.mobile_phone : null
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
              <Form.Item>
                <Input
                  placeholder="Work phone"
                  addonBefore={prefixSelector}
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={
                    this.state.contact ? this.state.contact.work_phone : null
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
              <Form.Item>
                <Input
                  placeholder="email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  value={this.state.contact ? this.state.contact.email : null}
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
              <Form.Item>
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
              <Form.Item>
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
                  onChange={e => this.handleChange(e.target)}
                />
              </Form.Item>
              <Form.Item>
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
              <Form.Item>
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
