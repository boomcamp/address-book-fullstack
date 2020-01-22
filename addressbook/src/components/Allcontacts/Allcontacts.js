import React, { Component } from "react";
import {
  Empty,
  Card,
  Icon,
  Avatar,
  Tooltip,
  Popconfirm,
  Form,
  Modal,
  Input,
  Button,
  Typography,
  Select
} from "antd";
import { message } from "antd";
import Search from "./Search/Searches";
import Sort from "./Sort";
// import Groups from "./Groups/Groups"
import Addtogroup from "./Addgroup/Addtogroup";
import "./allcontacts.css";
import axios from "axios";
const { Option } = Select;
const { Paragraph } = Typography;
class Allcontacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
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
      country: "",
      disabled: true,
      search: [],
      ids: "",
      datas: [],
      contactId: "",
      userids: "",
      getAllgroups: [],

      groupids: "",
      user: "",
      sort: "",
      query: "",
      allContacts: []
    };
  }
  showModal = e => {
    // console.log(this.props.allContacts)
    // console.log(e.id);
    // console.log(this.state)
    this.setState({
      ids: e.id,
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
  handleChange = e => {
    // console.log(this.props.allContacts);
    // this.setState({userId:ids})
    // console.log(this.state.userid);
    // console.log(this.state.ids);
    e.name === "lname"
      ? this.setState({ lastname: e.value })
      : e.name === "fname"
      ? this.setState({ firstname: e.value })
      : e.name === "homephonenum"
      ? this.setState({ home_phone: e.value })
      : e.name === "mobilePhone"
      ? this.setState({ mobile_phone: e.value })
      : e.name === "workPhone"
      ? this.setState({ work_phone: e.value })
      : e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "city"
      ? this.setState({ city: e.value })
      : e.name === "state"
      ? this.setState({ stae_or_province: e.value })
      : e.name === "postalCode"
      ? this.setState({ postal_code: e.value })
      : e.name === "country"
      ? this.setState({ country: e.value })
      : console.log("object");

    this.setState({ disabled: false });
  };
  componentDidMount() {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:3003/api/allgroups/${id}`).then(datas => {
      //   console.log(datas.data);
      this.setState({ getAllgroups: datas.data });
    });
    // console.log(this.props.allgroups);

    // console.log(this.state.visible)
  }

  handleSubmit = e => {
    // console.log(e);
    // console.log();

    if (
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.home_phone !== "" &&
      this.state.mobile_phone !== "" &&
      this.state.work_phone !== "" &&
      this.state.email !== "" &&
      this.state.city !== "" &&
      this.state.stae_or_province !== "" &&
      this.state.postal_code !== "" &&
      this.state.country !== ""
    ) {
      axios
        .patch(`http://localhost:3003/api/update/${this.state.ids}`, this.state)
        .then(res => {
          // console.log(res);
          // console.log(this.state.userId);
          message.success("Updated!");
          this.setState({
            lastname: "",
            firstname: "",
            home_phone: "",
            mobile_phone: "",
            work_phone: "",
            email: "",
            city: "",
            stae_or_province: "",
            postal_code: "",
            country: "",
            disabled: true,
            visible: false,
            search: [],
            addtogroupModal: false
          });
          this.props.getCont();
          setTimeout(window.location.reload.bind(window.location), 100);
        });
    } else {
      message.warning("Please Fill Out the Form");
    }
  };
  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };

  ///addto groups
  showAddtoGroup = e => {
    // console.log("contactd", e);
    localStorage.setItem("userids", e);
    this.setState({ userids: e, addtogroupModal: true });
  };
  handleAdd = () => {
    axios.post("http://localhost:3003/api/addtogroup", {
      userid: this.state.user,
      contactid: this.state.userids,
      groupid: this.state.groupids
    });
    this.props.getCont();
    message.success("Added to Successfully!");
    setTimeout(window.location.reload.bind(window.location), 100);
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
      disabled: true,
      addtogroupModal: false
    });
  };

  handleChangeGroup = value => {
    const lo = localStorage.getItem("id");
    // console.log(lo);
    // console.log(`selected ${value}`);
    this.setState({ groupids: value, user: lo });
  };
  //delete contact
  onDelete = e => {
    // console.log(e);
    axios.delete(`http://localhost:3003/api/deleteContact/${e}`).then(res => {
      // console.log(res);
      // console.log("DELETE");
      message.success("Deleted!");
      this.props.getCont();
    });
  };
  handleEdit = e => {
    this.setState({
      disabled: false
    });
  };
  ///search contact
  handleSearch = e => {
    this.props.getCont();
    this.setState({ input: e.target.value });
    const search = this.props.allContacts.filter(
      data =>
        new RegExp(`${e.target.value}`, "i").test(
          data.firstname + data.lastname
        )
      //  console.log(data)
    );
    this.setState({
      search: search
    });
    //console.log(search);
  };

  // SORT
  handleSort = value => {
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:3003/api/allContacts/${id}?sort=${value}`)
      .then(res => this.setState({ allContacts: res.data }))
      .catch(err => console.log(err));
  };
  componentDidUpdate(nextProps) {
    if (nextProps != this.props) {
      this.setState({ allContacts: this.props.allContacts });
    }
  }

  render() {
    // console.log(this.state.allContacts);

    // console.log(this.state.datas)
    // console.log(this.props.allContacts == null ? "nani" : "eupo");
    // console.log(this.state.search);
    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* <Addtogroup
          userids={this.state.userids}
          allgroups={this.state.addtogroupModal}
        /> */}
        <div>
          <Modal
            title="Add to Group"
            visible={this.state.addtogroupModal}
            onOk={this.handleAdd}
            onCancel={this.handleCancel}
            width={280}
            //   footer={null}
          >
            <Select
              defaultValue="--Select Group--"
              style={{ width: "210px" }}
              onChange={e => this.handleChangeGroup(e)}
            >
              {this.state.getAllgroups.map(groups => {
                //  localStorage.setItem('grpids',groups.id)
                //   console.log(groups.id);
                return <Option value={groups.id}>{groups.groupname}</Option>;
              })}
            </Select>
          </Modal>
        </div>
        <div className="conts">
          <h1
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bolder",
              flexWrap: "wrap"
            }}
            className="contsHead"
          >
            Contacts
          </h1>
          <div className="serts">
            <Search
              search={this.handleSearch}
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: "10px"
              }}
            />
            <Sort sort={this.handleSort} className="sort" />
          </div>
          {/* <button onClick={e=>this.handleSort()}>sort</button> */}
        </div>
        <hr className="underline"></hr>

        <div className="mainCon">
          {/* {this.props.allContacts == [] ? <div>dtae</div> : <div>nani</div>} */}
          {this.props.allContacts.length === 0 ? (
            <div>
              {" "}
              <Empty
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                imageStyle={{
                  height: 60
                }}
                description={
                  <span style={{ color: "grey", fontWeight: "bolder" }}>
                    No Contact Available
                  </span>
                }
              ></Empty>
            </div>
          ) : (
            <div style={{ display: "none" }}>con</div>
          )}
          {
            //Search Contacts Data
          }

          {!this.state.search.length ? (
            this.state.input.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  imageStyle={{
                    height: 60
                  }}
                  description={
                    <span style={{ color: "grey", fontWeight: "bolder" }}>
                      No Contact Available
                    </span>
                  }
                ></Empty>
              </div>
            ) : (
              this.state.allContacts.map(contact => {
                let conID = contact.id;
                let contacts = contact;
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
                        // height:'10px',
                        backgroundColor: "#102844",
                        justifyContent: "center",
                        width: "100%",
                        boxShadow: "5px 4px 10px #888888"
                      }}
                      icon="user"
                      size={70}
                      shape="square"
                    />
                    <hr className="underline"></hr>
                    <div className="additional">
                      <p className="lastFirstname">
                        Name:{" "}
                        <span className="names1">
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
                      {/* <Tooltip placement="bottomRight" title="Edit">
                      <Icon
                        type="edit"
                        key="edit"
                        style={{ fontSize: "20px" }}
                      />
                    </Tooltip> */}
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
                          onClick={() => this.showModal(contacts)}
                          style={{
                            fontSize: "20px"
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Add Group" placement="bottom">
                        <Icon
                          type="usergroup-add"
                          key="edit"
                          onClick={() => this.showAddtoGroup(conID)}
                          style={{
                            fontSize: "20px"
                          }}
                        ></Icon>
                      </Tooltip>
                    </div>
                  </Card>
                ); //mapsreturnstail
              })
            ) //mapstail
          ) : (
            //SEARCH CONTACT
            this.state.search
              // this.state.search
              .map(contact => {
                let conID = contact.id;
                let contacts = contact;
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
                        // height:'10px',
                        backgroundColor: "#102844",
                        justifyContent: "center",
                        width: "100%",
                        boxShadow: "5px 4px 10px #888888"
                      }}
                      icon="user"
                      size={70}
                      shape="square"
                    />
                    <hr className="underline"></hr>
                    <div className="additional">
                      <p className="lastFirstname">
                        Name:{" "}
                        <span className="names1">
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
                      {/* <Tooltip placement="bottomRight" title="Edit">
                      <Icon
                        type="edit"
                        key="edit"
                        style={{ fontSize: "20px" }}
                      />
                    </Tooltip> */}
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
                          onClick={() => this.showModal(contacts)}
                          style={{
                            fontSize: "20px"
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Add to Group" placement="bottom">
                        <Icon
                          type="usergroup-add"
                          key="edit"
                          onClick={() => this.showAddtoGroup(conID)}
                          style={{
                            fontSize: "20px"
                          }}
                        ></Icon>
                      </Tooltip>
                    </div>
                  </Card>
                ); //mapsreturnstail
              })
          ) //mapstail
          }
          {/* { !Array.isArray(this.props.allContacts) ?<div>nodata</div>:<div>asdasd</div>} */}
        </div>

        {
          //All Contacts Data
        }
        {this.props.allContacts
          // .sort((a, b) => a.lastname.localeCompare(b.lastname))
          // .sort((b, a) => b.lastname.localeCompare(a.lastname))

          .map(contact => {
            let conID = contact.id;
            // console.log(conID)
            let contacts = contact;
            return (
              <div>
                <Modal
                  title="Contact Info"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                  <div>
                    <Form onSubmit={e => this.handleSubmit(conID)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%"
                        }}
                      >
                        <Form.Item>
                          <Tooltip placement="bottomRight" title="Last Name">
                            <Input
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              placeholder="Last Name"
                              name="lname"
                              required
                              value={this.state.lastname}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip placement="bottomRight" title="First Name">
                            <Input
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              placeholder="First Name"
                              name="fname"
                              required
                              value={this.state.firstname}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <Form.Item>
                          <Tooltip
                            placement="bottomRight"
                            title="Home Phone Number"
                          >
                            <Input
                              prefix={
                                <Icon
                                  type="phone"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              style={{ width: "100%" }}
                              placeholder="Home Phone Number"
                              name="homephonenum"
                              value={this.state.home_phone}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip
                            placement="bottomRight"
                            title="Mobile Phone Number"
                          >
                            <Input
                              prefix={
                                <Icon
                                  type="phone"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              style={{ width: "100%" }}
                              placeholder="Mobile Phone Number"
                              name="mobilePhone"
                              value={this.state.mobile_phone}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip
                            placement="bottomRight"
                            title="Work Phone Number"
                          >
                            <Input
                              prefix={
                                <Icon
                                  type="phone"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              style={{ width: "100%" }}
                              placeholder="Work Phone Number"
                              name="workPhone"
                              value={this.state.work_phone}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip placement="bottomRight" title="Email">
                            <Input
                              name="email"
                              prefix={
                                <Icon
                                  type="mail"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              onChange={e => this.handleChange(e.target)}
                              placeholder="Email"
                              value={this.state.email}
                              required
                            />
                          </Tooltip>
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
                          <Tooltip placement="bottomRight" title="City">
                            <Input
                              prefix={
                                <Icon
                                  type="environment"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              placeholder="City"
                              name="city"
                              required
                              value={this.state.city}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip
                            placement="bottomRight"
                            title="State or Province"
                          >
                            <Input
                              prefix={
                                <Icon
                                  type="bank"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              placeholder="State or Province"
                              name="state"
                              value={this.state.stae_or_province}
                              required
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
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
                          <Tooltip placement="bottomRight" title="Postal Code">
                            <Input
                              prefix={
                                <Icon
                                  type="code"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              placeholder="Postal Code"
                              name="postalCode"
                              required
                              value={this.state.postal_code}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                        <Form.Item>
                          <Tooltip placement="bottomRight" title="Country">
                            <Input
                              prefix={
                                <Icon
                                  type="flag"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              disabled={this.state.disabled}
                              disabled={this.state.disabled}
                              placeholder="Country"
                              name="country"
                              required
                              value={this.state.country}
                              onChange={e => this.handleChange(e.target)}
                            />
                          </Tooltip>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row"
                            }}
                          >
                            <Popconfirm
                              placement="topLeft"
                              title="Want to Add ?"
                              onConfirm={e => this.handleSubmit(this.state.ids)}
                              okText="Yes"
                              cancelText="No"
                              disabled={this.state.disabled}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                disabled={this.state.disabled}
                                onSubmit={e =>
                                  this.handleSubmit(this.state.ids)
                                }
                              >
                                Save
                              </Button>
                            </Popconfirm>
                            <Button
                              type="primary"
                              style={{
                                width: "100%",
                                marginLeft: "5px"
                              }}
                              onClick={() => this.handleEdit(conID)}
                            >
                              Edit
                            </Button>
                          </div>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </Modal>
              </div>
            );
          })}
      </div>
    );
  }
}
export default Form.create()(Allcontacts);
