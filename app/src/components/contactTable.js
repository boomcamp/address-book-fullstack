import React, { Component } from "react";
import { Table, Icon, Tabs, message, Modal, Layout, Divider } from "antd";
import axios from "axios";
import Edit from "./editContact";
import Search from "./search";
import Grouplist from "./grouplist";
import Sort from "./sort";

export default class addressTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      openModal: false,
      searching: false,
      disabled: true,
      sortVal: "ASC"
    };
  }
  componentDidMount = () => {
    this.loadAgain();
  };

  handleChange = value => {
    this.setState(
      {
        sortVal: value
      },
      () => {
        this.loadAgain();
      }
    );
  };

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props || this.state.deleted) {
      setTimeout(() => {
        this.loadAgain();
      }, 2000);
    }
  }

  loadAgain = () => {
    var arr = [];
    axios({
      method: "get",
      url: `/contact/list/${localStorage.getItem("id")}?sort=${
        this.state.sortVal
      }`
    }).then(res => {
      res.data.forEach(data => {
        arr.push({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          home_phone: data.home_phone,
          mobile_phone: data.mobile_phone,
          work_phone: data.work_phone,
          postal_code: data.postal_code,
          state_or_province: data.state_or_province,
          city: data.city,
          key: `'${data.id}'`,
          country: data.country
        });
      });
      this.setState({
        data: arr
      });
    });
  };
  handleDelete = id => {
    const { confirm } = Modal;
    const these = this;
    // console.log(this);
    confirm({
      title: "Do you want to delete these contact?",
      okType: "danger",

      onOk() {
        axios({
          method: "delete",
          url: `/delete/${id.slice(1, -1)}`
        }).then(res => {
          setTimeout(() => {
            message.success({ content: "Successfully Deleted", duration: 2 });
            these.setState({ deleted: true });
          }, 1000);
          // console.log("deleted");
        });
      },
      onCancel() {}
    });
  };

  handleOk = e => {
    this.setState({
      openModal: true,
      contact: e
    });
  };
  handleCancel = e => {
    this.setState({
      openModal: false
    });
  };
  handleColumn = e => {
    this.setState({
      openModal: true
    });
    console.log(e);
  };

  search = e => {
    this.setState({
      data: e
    });
  };

  render() {
    const { TabPane } = Tabs;
    const { Column } = Table;
    const { Content } = Layout;
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Address Book" key="1">
            <Content
              style={{
                display: "flex",
                padding: "15px",
                justifyContent: "flex-end"
              }}
            >
              <Sort sort={this.handleChange} />
              <Search user={this.search} />
            </Content>

            <Table dataSource={this.state.data}>
              <Column
                title="First Name"
                dataIndex="first_name"
                key="first_name"
              />
              <Column title="Last Name" dataIndex="last_name" key="last_name" />

              <Column
                title="Mobile phone"
                dataIndex="mobile_phone"
                key="mobile_phone"
              />
              <Column
                title="More"
                key="more"
                render={(text, record) => (
                  <span>
                    <Icon type="left" onClick={e => this.handleOk(record)} />

                    <Edit
                      visible={this.state.openModal}
                      handleCancel={this.handleCancel}
                      update={this.state.contact}
                    />
                  </span>
                )}
              />

              <Column
                title="Delete"
                key="delete"
                render={(record, text) => (
                  <span>
                    <Divider type="vertical" />
                    <Icon
                      type="delete"
                      onClick={e => this.handleDelete(record.key)}
                    />
                  </span>
                )}
              />
            </Table>
          </TabPane>
          <TabPane tab="Groups" key="2">
            <Grouplist />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
