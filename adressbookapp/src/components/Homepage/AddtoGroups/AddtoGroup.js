import React, { Component } from "react";
import { Modal, Button } from "antd";
export default class AddtoGroup extends Component {
  render() {
    return (
      <div>
        <Modal
          title="Add to Groups"
          visible={this.props.visible}
          onCancel={this.props.onClickCancel}
          footer={null}
        ></Modal>
      </div>
    );
  }
}
