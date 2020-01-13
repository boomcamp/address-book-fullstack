import React, { Component } from "react";
import { Button, Tooltip, Modal, Form } from "antd";

import "./adduser.css";

export default class AddBookCard extends Component {
  onChange = checked => {
    this.setState({ loading: !checked });
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
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
      <div>
        <div className="addContainer">
          <div className="adding">
            <Tooltip title="Add Contact" placement="right">
              <Button
                icon="user-add"
                className="add-user"
                onClick={this.showModal}
              ></Button>
            </Tooltip>
            <Tooltip title="Add Group" placement="right">
              <Button icon="usergroup-add" className="add-user"></Button>
            </Tooltip>
          </div>
        </div>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form className='addcontactsForm'>
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
          </form>
        </Modal>
      </div>
    );
  }
}
