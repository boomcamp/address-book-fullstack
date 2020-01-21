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
import Button from "@material-ui/core/Button";
import NewGroups from "./modal/newGroups";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Table from "./addressbooktable";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Confrimation from "./modal/confirmation";
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContent
} from "@material-ui/core";
import EditGroup from "./modal/editGroup";

export default class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: "",
      dense: false,
      list: [],
      openModal: false,
      contacts: [],
      selectValue: [],
      idArray: [],
      query: "ASC",
      bygroups: [],
      open: false,
      openMods: false,
      openEdit: false,
      disabled: true,
      editButton: true,
      saveButton: "none",
      groupEdit: ""
    };
  }
  handleCancelGroups = () => {
    this.setState({
      disabled: true,
      editButton: true,
      saveButton: "none"
    });
    this.handleCloseEditGroup();
  };
  handleSave = () => {
    const name = localStorage.getItem("name");
    if (name === this.state.groupEdit) {
      alert("pair");
      this.setState({
        groupEdit: "",
        disabled: false,
        saveDisabled: false,
        editButton: "none",
        saveButton: "flex"
      });
      localStorage.removeItem("idGroup");
      localStorage.removeItem("name");
    } else {
      const idGroup = localStorage.getItem("idGroup");
      const id = localStorage.getItem("id");
      axios.patch(`/editgroup/${id}/${idGroup}`,{
        group_name: this.state.groupEdit
      }).then(res => {
        localStorage.removeItem("idGroup");
        localStorage.removeItem("name");
      });
      this.handleSelect()
    }
  };
  handleEditGroup = () => {
    console.log(this.setFields);
    this.setState({
      disabled: false,
      saveDisabled: false,
      editButton: "none",
      saveButton: "flex"
    });
  };
  componentDidMount() {
    this.handleSelect();
  }
  handleSelect = element => {
    const id = localStorage.getItem("id");
    axios.get(`/getGroups/${id}`).then(res => {
      this.setState({
        list: res.data
      });
    });
  };

  handleGetContacts = () => {
    const id = localStorage.getItem("id");
    axios.get(`/addressbook/${id}?sort=${this.state.query}`).then(res => {
      this.setState({
        contacts: res.data
      });
    });
  };

  handleGetByGroups = id => {
    localStorage.setItem("idGroups", id);
    const userid = localStorage.getItem("id");
    axios.get(`/addressbook/${userid}?groups=${id}`).then(res => {
      this.setState({
        bygroups: res.data,
        open: true
      });
    });
  };

  handleOpenModal = id => {
    this.handleGetContacts();
    this.setState({ openModal: true, currentGroupId: id });
  };

  handleCloseModal = () => {
    localStorage.removeItem("idGroups");
    this.setState({ openModal: false, openMods: false });
  };
  handleClose = () => {
    localStorage.removeItem("idGroups");
    this.setState({ open: false });
  };

  handleAddToGroups = e => {
    console.log(e.target.value);
  };
  setValue = e => {
    console.log(e);

    this.setState({
      selectValue: e
    });

    this.setState({
      ...this.state,
      idArray: [...e]
    });
  };

  handleAdd = () => {
    console.log(this.state.idArray);

    if (this.state.idArray.length <= 0) {
      console.log("No selected");
    } else {
      this.state.idArray.map(item => {
        const idLocal = localStorage.getItem("id");
        axios
          .patch(`/addressbook/addtogroup/${idLocal}/${item.id}`, {
            groupid: this.state.currentGroupId
          })
          .then(() => this.handleCloseModal())
          .catch(err => {
            console.log(err);
          });
      });
    }
  };
  handleRemove = idRemove => {
    localStorage.setItem("idRemove", idRemove.idRemove.list.id);
    this.setState({
      openMods: true
    });
  };
  handleCloseMods = () => {
    localStorage.removeItem("idRemove");
    this.setState({
      openMods: false
    });
  };
  handleRemoveYes = () => {
    const id = localStorage.getItem("idGroups");
    const userid = localStorage.getItem("id");
    const iD = localStorage.getItem("idRemove");
    axios.patch(`/addressbook/removeToGroup/${iD}`).then(res => {
      axios.get(`/addressbook/${userid}?groups=${id}`).then(resdata => {
        this.setState({
          bygroups: resdata.data
        });
        this.handleCloseMods();
      });
    });
  };
  handleOpenEditGroup = id => {
    localStorage.setItem("idGroup", id.id);
    localStorage.setItem("name", id.group_name);
    this.setState({
      openEdit: true,
      groupEdit: id.group_name
    });
  };
  handleCloseEditGroup = () => {
    localStorage.removeItem("idGroup");
    localStorage.removeItem("name");
    this.setState({
      openEdit: false
    });
  };
  setFields = event => {
    console.log(event);
    var fieldname = event.target.name;
    var value = event.target.value;
    this.setState({
      groupEdit: value
    });
  };
  render() {
    // console.log(this.state.list);
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

                  <Button
                    style={{
                      color: "#fff"
                    }}
                    onClick={() => this.handleOpenModal(group.id)}
                  >
                    <ListItemText primary={group.group_name} />
                  </Button>

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Show"
                      onClick={() => this.handleGetByGroups(group.id)}
                    >
                      <Tooltip title="Show Member">
                        <VisibilityIcon>
                          <Table
                            handleGetByGroups={this.handleGetByGroups}
                            bygroups={this.state.bygroups}
                          />
                        </VisibilityIcon>
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="Edit"
                      onClick={() => this.handleOpenEditGroup(group)}
                    >
                      <Tooltip title="Edit Group">
                        <EditIcon>
                          <EditGroup
                            handleCloseEditGroup={this.handleCloseEditGroup}
                            openEdit={this.state.openEdit}
                          />
                        </EditIcon>
                      </Tooltip>
                    </IconButton>

                    <IconButton edge="end" aria-label="delete">
                      <Tooltip title="Delete Group">
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))}
          </div>
        </div>

        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add To Group</DialogTitle>
          <DialogContent>
            <Autocomplete
              onChange={(option, value) => this.setValue(value)}
              multiple
              id="size-small-outlined-multi"
              size="small"
              value={this.selectValue}
              options={this.state.contacts}
              getOptionLabel={option => (option ? option.first_name : null)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="--Select--"
                  fullWidth
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              onClick={e => this.handleAdd(e)}
            >
              Add
            </Button>

            <Button onClick={() => this.handleCloseModal()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Displaying Members */}

        <Dialog
          style={{
            border: "solid 1px",
            overflow: "scroll"
          }}
          fullWidth
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          placement="top"
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              borderBottom: "solid 3px black"
            }}
          >
            List of Group
            <CancelIcon onClick={this.handleClose}style={{float:"right"}}/>
          </DialogTitle>
          <DialogContent style={{ height: "600px  " }}>
            <Grid
              container
              justify="flex-start"
              style={{ width: "100%", boder: "solid yellow" }}
            >
              {this.state.bygroups.map(list => {
                return (
                  <Grid item style={{ margin: 30 }} lg={3}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h5"
                          style={{ textTransform: "capitalize" }}
                        >
                          {list.first_name} {list.last_name}
                        </Typography>
                        <Typography variant="h6" style={{ color: "#999" }}>
                          <em>{list.mobile_phone}</em>
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{ border: "solid 1px", margin: 0, padding: 0 }}
                      >
                        <Button
                          size="small"
                          style={{ textAlign: "center !important" }}
                          onClick={idRemove =>
                            this.handleRemove({ idRemove: { list } })
                          }
                        >
                          Remove from Group
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
        </Dialog>

        <div>
          <Dialog
            maxWidth="xs"
            open={this.state.openMods}
            onClose={this.handleCloseMods}
            aria-labelledby="form-dialog-title"
            placement="top"
          >
            <Confrimation
              handleCloseMods={this.handleCloseMods}
              handleRemoveYes={this.handleRemoveYes}
            />
          </Dialog>
        </div>
        {/* modal in edit */}
        <Dialog
          maxWidth="sm"
          open={this.state.openEdit}
          onClose={this.handleCloseEditGroup}
          aria-labelledby="form-dialog-title"
          placement="top"
        >
          <DialogTitle>Edit Group Name</DialogTitle>
          <EditGroup
            saveButton={this.state.saveButton}
            editButton={this.state.editButton}
            disabled={this.state.disabled}
            handleEditGroup={this.handleEditGroup}
            handleCancelGroups={this.handleCancelGroups}
            groupEdit={this.state.groupEdit}
            setFields={this.setFields}
            handleSave={this.handleSave}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}
