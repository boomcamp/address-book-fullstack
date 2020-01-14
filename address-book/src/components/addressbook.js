import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import Table from "./addressbooktable";
import Search from "./search";

import RecentActorsIcon from '@material-ui/icons/RecentActors';
import {
  TextField,
  Grid,
  Button,
  Snackbar,
  Typography,
  Toolbar,
  IconButton,
  AppBar
} from "@material-ui/core";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

class Addressbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarState: false,
      snackbarMessage: "",
      icon: ""
    };
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };
  handleLogout = () => {
    this.props.history.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.setItem("out", "logout");
  };

  componentDidMount() {
    let loginAuth = localStorage.getItem("auth") ? true : false;
    let newUsers = localStorage.getItem("create") ? true : false;
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    if (loginAuth) {
      this.handleOpenSnackbar("Successfully Log in", "darkgreen");
      this.setState({
        icon: "check"
      });
      localStorage.removeItem("auth");
    }
    if (newUsers) {
      this.handleOpenSnackbar("Successfully Create", "darkgreen");
      this.setState({
        icon: "check"
      });
      localStorage.removeItem("create");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ marginRight: 5 }}>{this.state.icon}</Icon>
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />
       
        {/* sample */}
  

        <Container maxWidth="xl" className={classes.root}
          style={{marginTop: '70px',
          
          }}

        >
          <AppBar>
            <Toolbar>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Box>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <RecentActorsIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Address Book
                    </Typography>
                  </Grid>
                </Box>
                <Box>
                 
                  <Tooltip title="Logout">
                    <IconButton onClick={e => this.handleLogout(e)}>
                      <ExitToApp className={classes.exitIcon} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Toolbar>
          </AppBar>
          {/* <Dialog open={this.state.editDialog}>
            <form onSubmit={e => this.formSubmitUpdateGroup(e)}>
              <DialogTitle>Edit Group Name</DialogTitle>
              <DialogContent>
                <TextField
                  className={classes.textField}
                  helperText={this.state.editHelpertextError}
                  error={this.state.editHelperError}
                  margin="dense"
                  value={this.state.nameValue}
                  label="Group Name"
                  type="text"
                  onChange={e =>
                    this.setState({
                      nameValue: e.target.value
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </DialogContent>

              <DialogActions>
                <Button>Save</Button>

                <Button
                  onClick={() =>
                    this.setState({
                      editDialog: false,
                      editHelpertextError: ""
                    })
                  }
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog> */}
        </Container>
        <Search />
        <Table />
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Addressbook);
