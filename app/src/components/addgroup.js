import React, { Component } from "react";
import { Modal, Button, Input, Icon } from "antd";
import axios from "axios";
export default class addgroup extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      loading: false,
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
    this.setState({ loading: true, visible: false });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);

    console.log("");
    axios({
      method: "post",
      url: `/create/group/${localStorage.getItem("id")}`,
      data: {
        group_name: this.state.group_name
      }
    }).then(res => {});
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
            <Icon type="usergroup-add" /> Add Group
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
