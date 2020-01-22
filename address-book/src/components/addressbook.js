import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import Table from "./addressbooktable";
import Search from "./search";

import RecentActorsIcon from "@material-ui/icons/RecentActors";
import {
  Grid,
  Snackbar,
  Typography,
  Toolbar,
  IconButton,
  AppBar
} from "@material-ui/core";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
      icon: "",
      data: [],
      tempData: [],
      searchValue:"",
      query:"ASC"

    };
   
  }
  getAll = () => {
    const id = localStorage.getItem("id");
    axios.get(`/addressbook/${id}?sort=${this.state.query}`).then(res => {
      this.setState({
        data: res.data
      });
    });
  };

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
      this.getAll();
      localStorage.removeItem("auth");
    }
    if (newUsers) {
      this.handleOpenSnackbar("Successfully Create", "darkgreen");
      this.setState({
        icon: "check"
      });
      this.getAll();
      localStorage.removeItem("create");
    }
  }

  handleSearch = e => {
    
    const contacts = this.state.data.filter(
      con =>
        con.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        con.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    this.setState({
      tempData: contacts,
      searchValue: e.target.value
    });
   
  };

  handleSort=(e)=>{
    this.setState({
      query: e.target.value
    }, ()=> {
      this.getAll()
    })
  
   
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

        <Container
          maxWidth="xl"
          className={classes.root}
          style={{ marginTop: "70px" }}
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
        </Container>
        <Search
          data={this.state.data}
          tempData={this.state.tempData}
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
        />
        <Table searchValue={this.state.searchValue} getAll={this.getAll} data={this.state.data} tempData={this.state.tempData}/>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Addressbook);
