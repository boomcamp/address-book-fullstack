import React, { Component } from "react";
import { Select } from "antd";
import axios from "axios";
export default class selectgroup extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  componentDidMount = () => {
    var group = [];
    axios.get(`/group/list/${localStorage.getItem("id")}`).then(res => {
      res.data.forEach(data => {
        group.push({ id: data.id, group_name: data.group_name });
      });
      this.setState({
        data: group
      });
    });
  };
  onChange = value => {
    console.log(`selected ${value}`);
  };
  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };
  render() {
    console.log(this.state.data);
    const { Option } = Select;
    return (
      <div>
        <Select
          showSearch
          style={{ width: 550 }}
          placeholder="Select a group"
          optionFilterProp="children"
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSearch={this.onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          disabled={this.props.disabled}
        >
          {this.state.data.map(group => (
            <Option value={group.id} key={group.id}>
              {group.group_name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
