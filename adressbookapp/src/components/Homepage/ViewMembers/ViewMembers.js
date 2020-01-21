import React, { Component, Fragment } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Modal, Button } from "antd";

export default class ViewMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
          <div style={{ marginTop: "-30px" }}>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th style={{ color: "black" }}>Name</th>
                  <th style={{ color: "black" }}>Mobile No.</th>
                  <th style={{ color: "black" }}>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.props.members.map(item => {
                  // return console.log(item.firstname + item.lastname);
                  return (
                    <Fragment key={item.id}>
                      <tr>
                        <td>{item.firstname + item.lastname}</td>
                        <td>{item.mobile_phone}</td>
                        <td>
                          <Button type="danger" icon="delete" />
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        </Modal>
      </div>
    );
  }
}
