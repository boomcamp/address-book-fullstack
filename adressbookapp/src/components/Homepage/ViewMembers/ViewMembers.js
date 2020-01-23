import React, { Component, Fragment } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Modal, Button, Popconfirm, message, Empty } from "antd";
import axios from "axios";

export default class ViewMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  confirm(e) {
    const c_id = e;
    const g_id = this.props.groupId;
    axios
      .delete(`http://localhost:4000/api/deleteToGroups/${c_id}/${g_id}`)
      .then(res => {
        this.props.cancel();
        message.success("Successfully deleted from the group");
      });
  }
  cancel(e) {}
  render() {
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title={this.props.groupname + ` Members`}
          onOk={this.handleOk}
          onCancel={this.props.cancel}
          footer={null}
        >
          <div style={{ marginTop: "-10px" }}>
            <MDBTable color="primary-color">
              <MDBTableHead>
                <tr>
                  <th style={{ color: "black" }}>Name</th>
                  <th style={{ color: "black" }}>Mobile No.</th>
                  <th style={{ color: "black" }}>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.props.members.length === 0 ? (
                  <Fragment>
                    <tr>
                      <td></td>
                      <td>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                      <td></td>
                    </tr>
                  </Fragment>
                ) : (
                  this.props.members.map(item => {
                    const c_id = item.contactid;
                    return (
                      <Fragment key={item.id}>
                        <tr>
                          <td>{item.firstname + ` ` + item.lastname}</td>
                          <td>{item.mobile_phone}</td>
                          <td>
                            <Popconfirm
                              title={
                                `Delete ` +
                                item.firstname +
                                ` ` +
                                item.lastname +
                                ` from the group`
                              }
                              onConfirm={() => this.confirm(c_id)}
                              onCancel={this.cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="danger" icon="delete" />
                            </Popconfirm>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
        </Modal>
      </div>
    );
  }
}
