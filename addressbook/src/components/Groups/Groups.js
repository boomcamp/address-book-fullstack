import React, { Component } from "react";
import {
  Drawer,
  Tooltip,
  Icon,
  Modal,
  Button,
  Input,
  Form,
  Card,
  Popconfirm,
  Avatar
} from "antd";
import axios from "axios";
import { message } from "antd";
import { Menu } from "antd";
import { Select } from "antd";

const { Option } = Select;

const { SubMenu } = Menu;
class Groups extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  constructor(props) {
    super(props);

    this.state = {
      getAllgroups:[],
      visibleDrawer: false,
      visibleModal: false,
      openKeys: ["sub1"],
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      grpName: [],
      userid: this.props.userid
    };
  }

  state = {};


componentDidMount( ){
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:3003/api/allgroups/${id}`).then(datas => {
      console.log(datas.data);
    this.setState({getAllgroups:datas.data})
      //  this.setState({allGroups:dat})
    });
  
}

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  handleSub = e => {
    e.preventDefault();
    console.log(this.state.grpName);
    if (this.state.grpName !== "") {
      axios
        .post("http://localhost:3003/api/addgroup", {
          userid: this.state.userid,
          groupname: this.state.grpName
        })
        .then(res => {
          console.log(res);
          // console.log(this.state.userId);
          message.success("Added Successfully!");

          // this.props.getCont()
          setTimeout(window.location.reload.bind(window.location), 250);
        });
    } else {
      message.warning("Please Fill Out the Form");
    }
  };

  showDrawer = () => {
    this.setState({
      visibleDrawer: true
    });
  };
  handleChangeGrpName = e => {
    console.log(e.value);
    // console.log(this.props.userid);
    e.name === "grpName"
      ? this.setState({ grpName: e.value })
      : console.log(this.state.grpName);
  };
  onClose = () => {
    this.setState({
      visibleDrawer: false
    });
  };
  ///Modal Handlers

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };
  render() {
    console.log(this.state);
    console.log(this.props.allGroups)
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: "inline-flex" }}>
        <Tooltip title="Show Groups" placement="bottom">
          <Icon
            type="usergroup-add"
            style={{ fontSize: "25px", color: "#fff" }}
            theme="outlined"
            className="add-user"
            onClick={this.showDrawer}
          ></Icon>
        </Tooltip>
        <Drawer
          title="GROUPS"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visibleDrawer}
        >
          
          <Tooltip title="Add Group" placement="bottom">
            <Icon
              type="usergroup-add"
              style={{ fontSize: "25px", color: "black" }}
              theme="outlined"
              className="add-user"
              onClick={this.showModal}
            ></Icon>
          </Tooltip>
          <span>Select Group</span>
          <hr />
          <Select
            defaultValue="-- q    Select--"
            style={{ width: 120 }}
            onChange={e=>this.handleChange(e)}
          >
          {this.state.getAllgroups.map(groups=>{
            console.log(groups.groupname)
            return<Option value={groups.id}>{groups.groupname}</Option>
          
           
         
          })}
          </Select>
          <Tooltip title="Delete" placement="bottom">
            <Icon
              type="delete"
              style={{ fontSize: "25px", color: "black" }}
              theme="outlined"
              className="add-user"
              onClick={this.showModal}
            ></Icon>
          </Tooltip>
        </Drawer>
        {
          //Modal add to Gruops
        }
        <div>
          <Modal
            title="Add Group"
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
                    {getFieldDecorator("Group Name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Group Name!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="usergroup-add"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Group Name"
                        name="grpName"
                        required
                        onChange={e => this.handleChangeGrpName(e.target)}
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Popconfirm
                      placement="topLeft"
                      title="Want to Add ?"
                      onConfirm={e => this.handleSub(e)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        // onSubmit={e => this.handleSubmit(e)}
                      >
                        Save
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Form.create()(Groups);
