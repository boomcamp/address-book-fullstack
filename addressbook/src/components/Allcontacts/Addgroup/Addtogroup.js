import React, { Component } from "react";
import { Modal, Select } from "antd";
import axios from "axios";
const { Option } = Select;
export default class Addtogroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getAllgroups: [],
      visible: this.props.allgroups
    };
  }
  componentDidMount() {
    //    this.setState({visible:this.props.allgroups})
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:3003/api/allgroups/${id}`).then(datas => {
      //   console.log(datas.data);
      this.setState({ getAllgroups: datas.data });
    });
    // console.log(this.props.allgroups);
   
    // console.log(this.state.visible)
  }

  handleChangeGroup = e => {
    console.log(e);
  };
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
   
  };
  render() {
    // console.log(this.props.allgroups);
    console.log(this.state.visible);
    return (
      <div>
        <Modal
          title="Add to Group"
          visible={
            this.props.allgroups 
              
          }
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
    );
  }
}
