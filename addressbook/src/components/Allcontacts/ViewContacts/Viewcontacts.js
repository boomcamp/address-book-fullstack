import React, { Component } from 'react'
import {
    Card,
    Icon,
    Avatar,
    Tooltip,
    Popconfirm,
    Form,
    Modal,
    Input,
    Button,
    Typography
  } from "antd";
  import Search from '../Search/Searches'
export default class Viewcontacts extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       search:[]
    }
  }
  
  handleSearch = e => {
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
    console.log(search);
  };

  rend
    render() {
      console.log(this.props.search)
        return (
            <div>
                 <h1
          style={{
            whidth: "100px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          Contacts
          <Search
            searches={this.state.search}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </h1>


        <div className="mainCon">
          {// this.props.allContacts
 
          this.props.search
            .sort((a, b) => a.lastname.localeCompare(b.lastname))
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
                  </div>
                
                </Card>
              )
            })
          }
        </div>
            </div>
        )
    }
}
