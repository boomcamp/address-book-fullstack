import React from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default class Select extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { handleCloseSide, left, myhandleLogout } = this.props;
    return (
      <div>
        <Drawer open={left} onClose={handleCloseSide}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button onClick={myhandleLogout}>
            <ExitToAppIcon />
            Logout
          </Button>
        </Drawer>
      </div>
    );
  }
}
