import React, { Component } from "react";
import { Select } from "antd";

export default class sort extends Component {
  render() {
    const { Option } = Select;
    return (
      <React.Fragment>
        <Select
          defaultValue="ASC"
          style={{ width: 120, margin: "2px" }}
          onChange={this.props.sort}
        >
          <Option value="ASC">A-Z</Option>
          <Option value="DESC">Z-A</Option>
        </Select>
      </React.Fragment>
    );
  }
}
