import React, { Component } from "react";
import { Card, Icon, Tooltip, Avatar } from "antd";
const { Meta } = Card;
export default class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    // console.log(this.props.groups);
    return (
      <div className="card">
        {this.props.groups.map(res => {
          return (
            <Card
              style={{ width: 240, marginRight: 10, marginBottom: 10 }}
              actions={[
                <Tooltip title="view members" placement="bottom">
                  <Icon
                    type="eye"
                    key="view"
                    style={{ fontSize: "22px", color: "#08c" }}
                    // onClick={() => this.props.viewHandler(a)}
                  />
                </Tooltip>,
                <Tooltip title="edit group" placement="bottom">
                  <Icon
                    type="edit"
                    key="view"
                    style={{ fontSize: "22px", color: "#08c" }}
                    // onClick={() => this.props.viewHandler(a)}
                  />
                </Tooltip>,
                <Tooltip title="delete group" placement="bottom">
                  <Icon
                    type="delete"
                    key="view"
                    // onClick={() => this.props.deleteHandler(e)}
                    style={{ fontSize: "22px", color: "red" }}
                  />
                </Tooltip>
              ]}
              key={res.id}
            >
              <Meta
                avatar={
                  <Avatar src="data:image/png;base64,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" />
                }
                title={res.groupname}
                description="Group Name"
              />
            </Card>
          );
        })}
      </div>
    );
  }
}
