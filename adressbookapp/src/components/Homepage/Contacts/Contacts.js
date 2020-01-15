import React, { Component } from "react";
import "./contact.css";
import axios from "axios";
import { Card, Icon, Tooltip } from "antd";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("id");
    axios.get(`http://localhost:4000/api/contacts/${id}`).then(res => {
      // console.log(res);
      this.setState({
        contacts: res.data
      });
    });
  }
  deleteHandler(e) {
    console.log(e);
    const id = e;
    axios.delete(`http://localhost:4000/api/contacts/${id}`).then(res => {
      setTimeout(window.location.reload.bind(window.location), 0);
    });
  }
  render() {
    return (
      <div className="card">
        {this.state.contacts.map(result => {
          // console.log(result.contactid);
          const e = result.contactid;
          return (
            <Card
              style={{ width: 240, marginRight: 10, marginBottom: 10 }}
              actions={[
                <Tooltip title="view" placement="bottom">
                  <Icon type="eye" key="view" />
                </Tooltip>,
                <Tooltip title="edit" placement="bottom">
                  <Icon type="edit" key="view" />
                </Tooltip>,
                <Tooltip title="delete" placement="bottom">
                  <Icon
                    type="delete"
                    key="view"
                    onClick={() => this.deleteHandler(e)}
                  />
                </Tooltip>
              ]}
            >
              {result.firstname} {result.lastname}
            </Card>
          );
        })}
      </div>
    );
  }
}
