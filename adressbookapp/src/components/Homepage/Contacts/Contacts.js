import React, { Component } from "react";
import "./contact.css";
import { Card, Icon, Tooltip, Avatar } from "antd";
const { Meta } = Card;
export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // contacts: []
    };
  }

  componentDidMount() {
    this.props.getAll();
  }
  render() {
    return (
      <div className="card">
        {this.props.contacts.map(result => {
          const e = result.contactid;
          const a = result;
          return (
            <Card
              style={{ width: 240, marginRight: 10, marginBottom: 10 }}
              actions={[
                <Tooltip title="view" placement="bottom">
                  <Icon
                    type="eye"
                    key="view"
                    style={{ fontSize: "22px", color: "#08c" }}
                    onClick={() => this.props.viewHandler(a)}
                  />
                </Tooltip>,
                <Tooltip title="delete" placement="bottom">
                  <Icon
                    type="delete"
                    key="view"
                    onClick={() => this.props.deleteHandler(e)}
                    style={{ fontSize: "22px", color: "red" }}
                  />
                </Tooltip>
              ]}
              key={result.contactid}
            >
              <Meta
                avatar={
                  <Avatar src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" />
                }
                title={`${result.firstname} ${result.lastname}`}
                description={result.home_phone}
              />
            </Card>
          );
        })}
      </div>
    );
  }
}
