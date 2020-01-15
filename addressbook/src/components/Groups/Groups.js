import React, { Component } from "react";
import { Drawer, Tooltip, Icon } from "antd";
export default class Groups extends Component {
  state = { visible: false };

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      
        <div style={{display:'inline-flex'}}>
          <Tooltip title="Add Group" placement="bottom">
            <Icon
              type="usergroup-add"
              style={{ fontSize: "25px", color: "#fff" }}
              theme="outlined"
              className="add-user"
              onClick={this.showDrawer}
            ></Icon>
          </Tooltip>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
    
    );
  }
}
