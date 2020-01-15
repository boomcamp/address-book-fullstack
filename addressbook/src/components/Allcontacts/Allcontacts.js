import React, { Component } from "react";
import {
  Card,
  Icon,
  Avatar,
  Tooltip,
  Popconfirm,
  Form,
  Modal,
  Input,
  Button
} from "antd";
import { message } from "antd";
import Groups from "../Groups/Groups";
import "./allcontacts.css";
import axios from "axios";
class Allcontacts extends Component {
constructor(props) {
  super(props)

  this.state = {
    visible: false,
    lastname: "",
    firstname: "",
    home_phone: "",
    mobile_phone: "",
    work_phone: "",
    email: "",
    city: "",
    stae_or_province: "",
    postal_code: "",
    country: ""
  }
}
showModal = (e) => {
  // console.log(this.props.allContacts)
  console.log(e)

  this.setState({
    visible: true,
    lastname: e.lastname,
    firstname: e.firstname,
    home_phone: e.home_phone,
    mobile_phone: e.mobile_phone,
    work_phone: e.work_phone,
    email: e.email,
    city: e.city,
    stae_or_province: e.stae_or_province,
    postal_code: e.postal_code,
    country: e.country
    
  });
};
handleOk = e => {
  console.log(e);
  this.setState({
    visible: false
  });
};

handleCancel = e => {
  console.log(e.lastname);
  this.setState({
    visible: false
  });
};
  onDelete = e => {
    console.log(e);
    axios.delete(`http://localhost:3003/api/deleteContact/${e}`).then(res => {
      console.log(res);
      console.log("DELETE");
      message.success("Deleted!");
      setTimeout(window.location.reload.bind(window.location), 250);
    });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Contacts</h1>
        <hr className="underline"></hr>

        <div className="mainCon">
          {/* <div style={{ display: "inline-flex" }}>
          <h1>Contacts</h1>
        </div> */}
          {this.props.allContacts.map(contact => {
            let conID = contact.id;
            let contacts =contact
            // console.log(conID)
            return (
              <Card
                // hoverable
                style={{
                  width: 240,
                  marginTop: "15px",
                  marginLeft: "10px",
                  borderRadius: "10px",
                  boxShadow: "5px 10px 18px #888888"
                  // backgroundColor: "aqua"
                }}
                key={contact.id}
              >
                <Avatar
                  style={{
                    backgroundColor: "#102844",
                    justifyContent: "center",
                    width: "100%",
                    boxShadow: "5px 4px 10px #888888"
                  }}
                  icon="user"
                  size={64}
                  shape="square"
                />
                <hr className="underline"></hr>
                <div className="additional">
                  <p className="price">
                    Name:{" "}
                    <span className="names">
                      {contact.lastname} {contact.firstname}
                    </span>
                  </p>
                  <p>
                    Contact Number:{" "}
                    <span className="names">{contact.mobile_phone}</span>
                  </p>
                </div>

                <hr className="underline"></hr>

                <div className="allActions">
                  <Tooltip placement="bottomRight" title="Edit">
                    <Icon type="edit" key="edit" style={{ fontSize: "20px" }} />
                  </Tooltip>
                  <Popconfirm
                    placement="top"
                    title="Sure to delete?"
                    onConfirm={re => this.onDelete(conID)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip placement="bottomRight" title="Delete">
                      <Icon type="delete" style={{ fontSize: "20px" }} />
                    </Tooltip>
                  </Popconfirm>

                  <Tooltip placement="bottomRight" title="Show All Info">
                    <Icon
                      type="eye"
                      key="edit"
                      onClick={()=>this.showModal(contacts)}
                      style={{
                        fontSize: "20px"
                      }}
                    />
                  </Tooltip>
                </div>
                <div>
                  
                    <Modal
                      title="Add Contact"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={null}
                    >
                      <div>
                        <Form
                          onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit(e);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%"
                            }}
                          >
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="user"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Last Name"
                                  name="lname"
                                  required
                                  value={this.state.lastname}
                                onChange={e => this.handleChange(e.target)}
                                 
                                />
                          
                            </Form.Item>
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="user"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="First Name"
                                  name="fname"
                                  required
                                  value={this.state.firstname}
                                  onChange={e => this.handleChange(e.target)}
                                />
                          
                            </Form.Item>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="phone"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  style={{ width: "100%" }}
                                  placeholder="Home Phone Number"
                                  name="homephonenum"
                                  value={this.state.home_phone}
                                  onChange={e => this.handleChange(e.target)}
                                />
                          
                            </Form.Item>
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="phone"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  style={{ width: "100%" }}
                                  placeholder="Mobile Phone Number"
                                  name="mobilePhone"
                                  value={this.state.mobile_phone}
                                  onChange={e => this.handleChange(e.target)}
                                />
                          
                            </Form.Item>
                            <Form.Item>
                             
                                <Input
                                  prefix={
                                    <Icon
                                      type="phone"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  style={{ width: "100%" }}
                                  placeholder="Work Phone Number"
                                  name="workPhone"
                                  value={this.state.work_phone}
                                  onChange={e => this.handleChange(e.target)}
                                />
                          
                            </Form.Item>
                            <Form.Item>
                              
                                <Input
                                  name="email"
                                  prefix={
                                    <Icon
                                      type="mail"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  onChange={e => this.handleChange(e.target)}
                                  placeholder="Email"
                                  value={this.state.email}
                                  required
                                />
                          
                            </Form.Item>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%"
                            }}
                          >
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="environment"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="City"
                                  name="city"
                                  required
                                  value={this.state.city}
                                  onChange={e => this.handleChange(e.target)}
                                />
                          
                            </Form.Item>
                            <Form.Item>
                              <Input
                                prefix={
                                  <Icon
                                    type="bank"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                placeholder="State or Province"
                                name="state"
                                value={this.state.stae_or_province}
                                required
                                onChange={e => this.handleChange(e.target)}
                              />
                            </Form.Item>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%"
                            }}
                          >
                            <Form.Item>
                              <Input
                                prefix={
                                  <Icon
                                    type="code"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                placeholder="Postal Code"
                                name="postalCode"
                                required
                                value={this.state.postal_code}
                                onChange={e => this.handleChange(e.target)}
                              />
                            </Form.Item>
                            <Form.Item>
                              
                                <Input
                                  prefix={
                                    <Icon
                                      type="flag"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  disabled
                                  placeholder="Country"
                                  name="country"
                                  required
                                  value={this.state.country}
                                  onChange={e => this.handleChange(e.target)}
                                />
                              
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item>
                              <Popconfirm
                                placement="topLeft"
                                title="Want to Add ?"
                                onConfirm={e => this.handleSubmit(e)}
                                okText="Yes"
                                cancelText="No"
                              >
                                {/* <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ width: "100%" }}
                                  onSubmit={e => this.handleSubmit(e)}
                                >
                                  Save
                                </Button> */}
                              </Popconfirm>
                            </Form.Item>
                          </div>
                        </Form>
                      </div>
                    </Modal>
                  </div>
                
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Form.create()(Allcontacts);
