import React, { Component } from "react";
import { Table, Divider, Tabs, Input } from "antd";

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    city: "Legazpi",
    address: "New York No. 1 Lake Park",
    postal_code: "4500",
    country: ""
  }
];
export default class addressTable extends Component {
  render() {
    const { TabPane } = Tabs;
    const { Column } = Table;
    const { Search } = Input;

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Contacts" key="1">
            {" "}
            <Table dataSource={data}>
              <Column
                title="First Name"
                dataIndex="firstName"
                key="firstName"
              />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
              <Column title="Address" dataIndex="address" key="address" />
              <Column title="City" dataIndex="city" key="city" />
              <Column
                title="Postal Code"
                dataIndex="postal_code"
                key="postal_code"
              />
              <Column title="Country" dataIndex="country" key="country" />

              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <a href="/">Invite {record.lastName}</a>
                    <Divider type="vertical" />
                    <a href="/">Delete</a>
                  </span>
                )}
              />
            </Table>
          </TabPane>
          {/* <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3"> 
            Content of Tab Pane 3
          </TabPane> */}
          <TabPane>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
