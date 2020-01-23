import React, { Component } from "react";
import { Modal, Select, Button, message } from "antd";
import axios from "axios";
const { Option } = Select;
const key = "updatable";
export default class AddtoGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupid: null,
      name: []
    };
  }
  onChange = value => {
    // console.log(value);
    this.setState({
      groupid: value
    });
  };
  onBlur() {
    // console.log("blur");
  }
  onFocus() {
    // console.log("focus");
  }
  onSearch(val) {
    // console.log("search:", val);
  }
  submitToGroups = () => {
    const c_id = this.props.contactId;
    const id = localStorage.getItem("id");
    if (this.state.groupid == null) {
      message.error("Select group first or Create group first! ^_^");
    } else
      axios
        .post("http://localhost:4000/api/addtogroups", {
          groupid: this.state.groupid,
          userid: id,
          contactid: c_id
        })
        .then(res => {
          this.props.getAll();
          this.props.onClickCancel();
          message.loading({ content: "Adding to the group...", key });
          setTimeout(() => {
            message.success({
              content: "Successfully added!",
              key,
              duration: 2
            });
          }, 1000);
        })
        .catch(err => {
          message.error("Select group first or Create groupfirst");
        });
  };
  render() {
    return (
      <div>
        <Modal
          title="Add to Groups"
          visible={this.props.visible}
          onCancel={this.props.onClickCancel}
          footer={null}
        >
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a group"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.props.groups.map(res => {
              return (
                <Option value={res.id} key={res.id}>
                  {res.groupname}
                </Option>
              );
            })}
          </Select>
          <br />
          <br />
          <Button onClick={this.props.onClickCancel}>cancel</Button>&nbsp;&nbsp;
          <Button type="primary" onClick={() => this.submitToGroups()}>
            save
          </Button>
        </Modal>
      </div>
    );
  }
}
