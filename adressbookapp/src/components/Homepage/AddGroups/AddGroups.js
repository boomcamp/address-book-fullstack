import React, { Component } from "react";
import { Icon, Tooltip } from "antd";
import { Modal, Button } from "antd";
import { Form, Input, message } from "antd";
import axios from "axios";
const key = "updatable";
class AddGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      groupname: ""
    };
  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  changeHandler(e) {
    if (e.name === "group") {
      this.setState({ groupname: e.value });
    }
  }
  handleSubmit = e => {
    const id = localStorage.getItem("id");
    e.preventDefault();
    const { groupname } = this.state;
    if (groupname === "") {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    } else
      axios
        .post("http://localhost:4000/api/groups", {
          userid: id,
          groupname: this.state.groupname
        })
        .then(result => {
          message.loading({ content: "Saving group...", key });
          setTimeout(() => {
            message.success({
              content: "Successfully added!",
              key,
              duration: 2
            });
            this.props.form.setFieldsValue({
              group: ""
            });
            this.props.getAll();
          }, 1000);
          this.setState({
            visible: false
          });
        });
  };
  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {" "}
        <Tooltip title="add group" placement="bottom">
          <Icon
            type="usergroup-add"
            style={{ fontSize: "30px", color: "#08c", cursor: "pointer" }}
            onClick={this.showModal}
          />
        </Tooltip>
        <Modal
          visible={visible}
          title="Add Groups"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("group", {
                rules: [{ required: true, message: "Please input groupname!" }]
              })(
                <Input
                  prefix={
                    <Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="text"
                  placeholder="group name"
                  name="group"
                  onChange={e => this.changeHandler(e.target)}
                />
              )}
            </Form.Item>
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

export default Form.create()(AddGroups);
