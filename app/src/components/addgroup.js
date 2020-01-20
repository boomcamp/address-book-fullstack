import React, { Component } from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";
export default class addgroup extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      group_name: ""
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleAddgroup = e => {
    console.log(e.value);
    this.setState({
      group_name: e.value
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
    console.log("");
    axios({
      method: "post",
      url: `/create/group/${localStorage.getItem("id")}`,
      data: {
        group_name: this.state.group_name
      }
    }).then(res => {
      console.log(res.data);
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Button type="link" onClick={this.showModal}>
            Add Group
          </Button>
          <Modal
            title="Add Group"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            Group
            <Input
              placeholder="Group name"
              onChange={e => this.handleAddgroup(e.target)}
            />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
