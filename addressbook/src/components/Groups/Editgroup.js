import React, { Component } from "react";
import { Modal, Form, Input, Icon, Popconfirm, Button } from "antd";
class Editgroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupModal: false,
      grpId: ""
    };
  }
  handleCancelz = () => {
    // console.log("Clicked cancel button");
    this.setState({
      groupModal: false
    });
  };
  componentDidUpdate(nextProps) {
    if (nextProps != this.props) {
      this.setState({
        groupModal: this.props.editgrpNameModal,
        grpId: this.props.editgrpName
      });
    }
  }

  render() {
    console.log(this.props.editgrpNameModal);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title=" Group"
          visible={this.props.editgrpNameModal}
          onCancel={this.props.clsEdit}
          footer={null}
        >
          <div>
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.handleSub(e);
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
                    onConfirm={e => this.props.clsEdit(e)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onSubmit={e => this.clsEdit(e)}
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
    );
  }
}
export default Form.create()(Editgroup);
