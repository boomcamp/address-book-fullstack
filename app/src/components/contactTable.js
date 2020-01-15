import React, { Component } from "react";
import { Table, Icon, Tabs } from "antd";
import axios from "axios";
import Edit from "./editContact";

export default class addressTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      openModal: false
    };
  }
  componentDidMount = () => {
    var arr = [];
    axios({
      method: "get",
      url: `/contact/list/${localStorage.getItem("id")}`
    }).then(res => {
      res.data.map(data => {
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
          key: data.id,
          country: data.country
        });
        // console.log(data);
      });
      this.setState({
        data: arr
      });
    });
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.loadAgain();
    }, 4000);
  }

  loadAgain = () => {
    var arr = [];
    axios({
      method: "get",
      url: `/contact/list/${localStorage.getItem("id")}`
    }).then(res => {
      res.data.map(data => {
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
          key: data.id,
          country: data.country
        });
      });
      this.setState({
        data: arr
      });
    });
  };
  handleDelete = id => {
    axios({
      method: "delete",
      url: `/delete/${id}`
    }).then(res => {
      console.log("deleted");
    });
  };

  handleOk = e => {
    // localStorage.setItem(JSON.stringify(e));
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
  render() {
    const { TabPane } = Tabs;
    const { Column } = Table;
    // this.props.data ? this.loadAgain() : console.log("Null");
    // console.log(this.props.data);
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Address Book" key="1">
            <Table dataSource={this.state.data} key="table">
              <Column
                title="First Name"
                dataIndex="first_name"
                key="first_name"
              />

              <Column title="Last Name" dataIndex="last_name" key="last_name" />
              <Column title="City" dataIndex="city" key="city" />
              <Column
                title="state_or_province"
                dataIndex="state_or_province"
                key="state_or_province"
              />

              {/* <Column
                title="Home phone"
                dataIndex="home_phone"
                key="home_phone"
              />
              <Column
                title="Mobile phone"
                dataIndex="mobile_phone"
                key="mobile_phone"
              />
              <Column
                title="Work phone"
                dataIndex="work_phone"
                key="work_phone"
              /> */}
              <Column
                title="Postal Code"
                dataIndex="postal_code"
                key="postal_code"
              />

              <Column title="Country" dataIndex="country" key="country" />
              <Column
                title="Edit"
                key="edit"
                render={(text, record) => (
                  <span>
                    <Icon
                      type="edit"
                      theme="twoTone"
                      onClick={e => this.handleOk(record)}
                    />
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
                key="id"
                render={(record, text) => (
                  <span>
                    <Icon
                      type="delete"
                      theme="twoTone"
                      onClick={e => this.handleDelete(record.key)}
                    />
                  </span>
                )}
              />
            </Table>
          </TabPane>
          <TabPane tab="" key="2"></TabPane>
        </Tabs>
      </div>
    );
  }
}
