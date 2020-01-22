import React, { Component } from "react";
import { Icon, Tooltip } from "antd";
import { Modal, Button } from "antd";
import { Form, Input, message, Select } from "antd";
import axios from "axios";
import "./addcontact.css";
const key = "updatable";
const { Search } = Input;

class AddContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      firstname: "",
      lastname: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city: "",
      state: "",
      postal: "",
      country: ""
    };
  }
  // componentDidMount() {}
  // getAll = () => {};
  showModal = () => {
    this.setState({
      name: "add contact",
      visible: true
    });
  };
  changeHandler(e) {
    // console.log(e);
    e.name === "firstname"
      ? this.setState({ firstname: e.value })
      : e.name === "lastname"
      ? this.setState({ lastname: e.value })
      : e.name === "home_phone"
      ? this.setState({ home_phone: e.value })
      : e.name === "mobile_phone"
      ? this.setState({ mobile_phone: e.value })
      : e.name === "work_phone"
      ? this.setState({ work_phone: e.value })
      : e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "city"
      ? this.setState({ city: e.value })
      : e.name === "state"
      ? this.setState({ state: e.value })
      : e.name === "postal"
      ? this.setState({ postal: e.value })
      : this.setState({ country: e.value });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = e => {
    const id = localStorage.getItem("id");
    e.preventDefault();
    const {
      firstname,
      lastname,
      home_phone,
      mobile_phone,
      email,
      city,
      state,
      postal,
      country
    } = this.state;
    if (
      home_phone === "" ||
      mobile_phone === "" ||
      city === "" ||
      firstname === "" ||
      lastname === "" ||
      state === "" ||
      email === "" ||
      postal === "" ||
      country === ""
    ) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    } else
      axios
        .post("http://localhost:4000/api/contacts", {
          id: id,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          home_phone: this.state.home_phone,
          mobile_phone: this.state.mobile_phone,
          work_phone: this.state.work_phone,
          email: this.state.email,
          city: this.state.city,
          state_or_province: this.state.state,
          postal_code: this.state.postal,
          country: this.state.country
        })
        .then(result => {
          message.loading({ content: "Saving contact...", key });
          setTimeout(() => {
            message.success({
              content: "Successfully added!",
              key,
              duration: 2
            });
            this.props.form.setFieldsValue({
              firstname: "",
              lastname: "",
              home_phone: "",
              mobile_phone: "",
              work_phone: "",
              email: "",
              city: "",
              state_or_province: "",
              postal_code: "",
              country: ""
            });
            this.props.getAll();
          }, 1000);
          this.setState({
            visible: false
          });
        });
  };

  render() {
    const { Option } = Select;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Tooltip title="add contacts" placement="bottom">
          <Icon
            type="user-add"
            style={{ fontSize: "30px", color: "#08c", cursor: "pointer" }}
            onClick={this.showModal}
          />
        </Tooltip>

        <Search
          placeholder="search names"
          onChange={e => this.props.handleSearch(e)}
          className="searchContacts"
        />
        <Select
          showSearch
          // style={{  }}
          defaultValue={this.props.selectValue}
          optionFilterProp="children"
          onChange={e => this.props.onChange(e)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          className="selectContacts"
        >
          <Option value="ASC">A-Z</Option>
          <Option value="DESC">Z-A</Option>
        </Select>
        <Modal
          visible={visible}
          title="Contacts information"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
                  setfieldsvalue={this.state.firstname}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.lastname}
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
                  setfieldsvalue={this.state.home_phone}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.mobile_phone}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.work_phone}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.email}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.state}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.postal}
                  onChange={e => this.changeHandler(e.target)}
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
                  setfieldsvalue={this.state.country}
                  onChange={e => this.changeHandler(e.target)}
                />
              )}
            </Form.Item>
            <br />
            <br />
            <Button onClick={this.handleCancel}>cancel</Button>&nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              save
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddContacts);
