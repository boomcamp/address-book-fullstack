import React, { Component } from "react";
import { Icon } from "antd";
import axios from "axios";

export default class deleteContact extends Component {
  handleClick = id => {
    axios({
      method: "delete",
      url: `/delete/${id}`
    }).then(res => {
      console.log("deleted");
    });
  };
  render() {
    return (
      <div>
        <React.Fragment>
          <Icon type="delete" theme="twoTone" onClick={this.handleClick} />
        </React.Fragment>
      </div>
    );
  }
}
