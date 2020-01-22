import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;
export default class Sort extends Component {
  render() {
    return (
      <div>
        <div>
          <Select
            defaultValue="ASC"
            style={{ width: 120 }}
            onChange={e => this.props.sort(e)}
          >
            <Option value="ASC">A-Z</Option>
            <Option value="DESC">Z-A</Option>
          </Select>
        </div>
      </div>
    );
  }
}
