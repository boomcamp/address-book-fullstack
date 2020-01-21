import React, { Component } from "react";
import { Select, Icon, Collapse, Modal, List, message } from "antd";
import axios from "axios";
export default class grouplist extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      visible: false,
      contacts: [],
      sortVal: "ASC",
      userid: "",
      contactid: "",
      groupid: "",
      members: []
    };
  }
  componentDidMount = () => {
    var group = [];
    var contact = [];

    axios.get(`/group/list/${localStorage.getItem("id")}`).then(res => {
      console.log(res.data);
      res.data.forEach(data => {
        group.push({
          id: data.id,
          userid: data.userid,
          group_name: data.group_name
        });
      });
      this.setState({
        data: group
      });
    });

    axios({
      method: "get",
      url: `/contact/list/${localStorage.getItem("id")}?sort=${
        this.state.sortVal
      }`
    }).then(res => {
      res.data.forEach(data => {
        contact.push({
          first_name: data.first_name,
          last_name: data.last_name,
          id: data.id,
          contactid: data.userid
        });
      });
      this.setState({
        contacts: contact
      });
    });
  };

  allmember = e => {
    var selectmem = [];
    console.log(e);
    axios.get(`/member/${localStorage.getItem("id")}?gr_id=${e}`).then(res => {
      res.data.map(data => {
        axios
          .get(
            `/selected/contact/${localStorage.getItem("id")}?contact_id=${
              data.contactid
            }`
          )
          .then(res => {
            res.data.map(datas => {
              console.log(datas);
              selectmem.push({
                id: datas.id,
                first_name: datas.first_name,
                last_name: datas.last_name
              });
            });
            this.setState({
              members: selectmem
            });
          });
      });
    });
  };

  showModal = e => {
    console.log("groupid", e);
    this.setState({
      visible: true,
      groupid: e
    });
  };
  handleSubmit = e => {
    axios
      .post(`/add/members/${localStorage.getItem("id")}`, {
        contactid: this.state.contactid,
        groupid: this.state.groupid
      })
      .then(res => {
        this.setState({
          contactid: res.data.contactid,
          visible: false
        });
        console.log(this.state.contactid);
      });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  onChange = value => {
    console.log(`contact ${value}`);
    this.setState({
      contactid: value
    });
  };

  handleDelete = id => {
    axios.delete(`/member/delete/${id}`).then(res => {
      console.log("deleted");
    });
    setTimeout(() => {
      message.success({ content: "Successfully Deleted", duration: 2 });
    }, 2000);
  };

  render() {
    const { Panel } = Collapse;
    const { Option } = Select;
    return (
      <div>
        {this.state.data.map(data => {
          return (
            <Collapse accordion key={data.id} onChange={this.allmember}>
              <Panel
                header={data.group_name}
                key={data.id}
                extra={
                  <Icon type="plus" onClick={e => this.showModal(data.id)} />
                }
              >
                <Modal
                  title="Select Member"
                  visible={this.state.visible}
                  onOk={this.handleSubmit}
                  onCancel={this.handleCancel}
                >
                  <div>
                    <Select
                      showSearch
                      style={{ width: 450 }}
                      placeholder="Select member"
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
                      {this.state.contacts.map(cont => (
                        <Option value={cont.id} key={cont.id}>
                          {cont.first_name}, {cont.last_name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Modal>
                {this.state.members
                  ? this.state.members.map(item => (
                      <List key={item.id} itemLayout="horizontal">
                        <List.Item
                          actions={[
                            <Icon
                              type="delete"
                              onClick={e => this.handleDelete(item.id)}
                            />
                          ]}
                        >
                          {" "}
                          {item.first_name} {item.last_name}
                        </List.Item>
                      </List>
                    ))
                  : null}
              </Panel>
            </Collapse>
          );
        })}
      </div>
    );
  }
}
