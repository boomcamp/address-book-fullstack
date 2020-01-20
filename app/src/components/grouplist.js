import React, { Component } from "react";
import { Select, Icon, Collapse, Modal } from "antd";
import axios from "axios";
export default class grouplist extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      visible: false,
      contacts: []
    };
  }
  componentDidMount = () => {
    var group = [];
    axios.get(`/group/list/${localStorage.getItem("id")}`).then(res => {
      res.data.forEach(data => {
        group.push({ userid: data.userid, group_name: data.group_name });
      });
      this.setState({
        data: group
      });
    });
  };

  showModal = e => {
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
    const { Panel } = Collapse;
    const { Option } = Select;

    return (
      <div>
        {this.state.data.map((data, index) => {
          return (
            <Collapse accordion key={index}>
              <Panel
                header={data.group_name}
                key="2"
                extra={
                  <Icon
                    type="plus"
                    onClick={e => this.showModal(e.stopPropagation())}
                  />
                }
              >
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <div>
                    <Select
                      defaultValue="lucy"
                      style={{ width: 450 }}
                      onChange={this.handleChange}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </div>
                </Modal>
                <p>hjyj</p>
              </Panel>
            </Collapse>
          );
        })}
      </div>
    );
  }
}
