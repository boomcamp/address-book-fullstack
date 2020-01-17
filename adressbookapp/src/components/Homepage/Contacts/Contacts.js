import React, { Component } from "react";
import "./contact.css";
import { Card, Icon, Tooltip, Avatar, Empty } from "antd";
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
        {!Array.isArray(this.props.search) || !this.props.search.length ? (
          this.props.searchinput.length > 0 ? (
            <Empty />
          ) : (
            this.props.contacts.map(res => {
              const e = res.contactid;
              const a = res;
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
                    <Tooltip title="add to group" placement="bottom">
                      <Icon
                        type="usergroup-add"
                        key="view"
                        style={{ fontSize: "22px", color: "#08c" }}
                        onClick={() => this.props.viewGroups(a)}
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
                  key={res.contactid}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" />
                    }
                    title={`${res.firstname} ${res.lastname}`}
                    description={res.home_phone}
                  />
                </Card>
              );
            })
          )
        ) : (
          this.props.search.map(res => {
            const e = res.contactid;
            const a = res;
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
                key={res.contactid}
              >
                <Meta
                  avatar={
                    <Avatar src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" />
                  }
                  title={`${res.firstname} ${res.lastname}`}
                  description={res.home_phone}
                />
              </Card>
            );
          })
        )}
      </div>
    );
  }
}
