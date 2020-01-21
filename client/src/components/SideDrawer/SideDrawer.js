import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from "@material-ui/icons/Group";

import { List } from "../Styled-Component/style";

export default class Select extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      handleCloseSide,
      handleOpenSide,
      myhandleLogout,
      groupData
    } = this.props;
    return (
      <div>
        <Drawer open={handleOpenSide} onClose={handleCloseSide}>
          <List>
            <List>
              <ListItemText>Group List</ListItemText>
            </List>
            <List>
              {groupData
                ? groupData.map(val => (
                    <ListItem
                      button
                      onClick={() => console.log("hey")}
                      key={val.group_id}
                    >
                      <ListItemIcon>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText>{val.group_name}</ListItemText>
                    </ListItem>
                  ))
                : null}
            </List>
            <Divider />
            <List>
              <ListItem button onClick={myhandleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            </List>
          </List>
        </Drawer>
      </div>
    );
  }
}
