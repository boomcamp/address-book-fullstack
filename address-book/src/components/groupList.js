import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import GroupIcon from "@material-ui/icons/Group";
import { height } from "@material-ui/system";
import axios from "axios";
import Button from '@material-ui/core/Button';
import NewGroups from "./modal/newGroups"
export default class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: "",
      dense: false,
      list: []
    };
  }

  componentDidMount() {
    this.handleSelect();
  }
  handleSelect = element => {
    const id = localStorage.getItem("id");
    axios.get(`/getGroups/${id}`).then(res => {
      this.setState({
        list: res.data
      });
      console.log(this.state.list);
    });
  };
  handleClickButton=()=>{

  }
  render() {
    return (
      <React.Fragment>
        <div
          stye={{
            margin: "theme.spacing(4, 0, 2)"
          }}
        >
          <Typography variant="h6">Groups</Typography>
          <div
            style={{
              backgroundColor: "#01579b",
              color: "#fff",
              height: 620,
              overflowX: "scroll"
            }}
          >
            {this.state.list.map(group => (
              <List key={group.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Button style={{
                color:"#fff"
              }}>
                    <ListItemText primary={group.group_name} />
                  </Button>

                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))}
          </div>
        </div>

        <NewGroups handleSelect={this.handleSelect()} />
      </React.Fragment>
    );
  }
}
