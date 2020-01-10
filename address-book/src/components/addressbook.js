import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
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
import Contacts from "@material-ui/icons/Contacts";
import Add from "@material-ui/icons/Add";
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
    localStorage.removeItem("create");
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
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Address Book
              </Typography>
              <Button
                color="inherit"
                onClick={e => {
                  this.handleLogout(e);
                }}
              >
                LogOut
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <Container maxWidth="xl" className={classes.outer}></Container>

        <Container maxWidth="xl" className={classes.root}>
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
                      <Contacts />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Address Book
                    </Typography>
                  </Grid>
                </Box>
                <Box>
                  <Tooltip title="Add New Contact">
                    <IconButton
                      onClick={() =>
                        this.setState({
                          open: true
                        })
                      }
                    >
                      <Add className={classes.addIcon} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <IconButton onClick={e => this.handleLogout(e)}>
                      <ExitToApp className={classes.exitIcon} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Toolbar>
          </AppBar>

          <Dialog
            fullWidth
            maxWidth="sm"
            open={this.state.open}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Contact</DialogTitle>

            <form
              noValidate
              autoComplete="off"
              onSubmit={e => this.formCreateContact(e)}
            >
              <DialogContent>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textField}
                    required
                    id="standard-required"
                    error={this.state.firstNameError}
                    label="First Name"
                    value={this.state.fName}
                    onChange={e =>
                      this.setState({
                        fName: e.target.value
                      })
                    }
                  />

                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="Last Name"
                    type="text"
                    value={this.state.lName}
                    onChange={e =>
                      this.setState({
                        lName: e.target.value
                      })
                    }
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="Mobile Phone Number"
                    type="text"
                    value={this.state.mobile_phone}
                    onChange={e =>
                      this.setState({
                        mobile_phone: e.target.value
                      })
                    }
                  />

                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="Work Phone Number"
                    value={this.state.work_phone}
                    type="text"
                    onChange={e =>
                      this.setState({
                        work_phone: e.target.value
                      })
                    }
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    value={this.state.home_phone}
                    label="Home Phone Number"
                    type="text"
                    onChange={e =>
                      this.setState({
                        home_phone: e.target.value
                      })
                    }
                  />

                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="Email"
                    value={this.state.email}
                    type="email"
                    onChange={e =>
                      this.setState({
                        email: e.target.value
                      })
                    }
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="City"
                    type="text"
                    value={this.state.city}
                    onChange={e =>
                      this.setState({
                        city: e.target.value
                      })
                    }
                  />

                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="State/Province"
                    type="text"
                    value={this.state.state_or_province}
                    onChange={e =>
                      this.setState({
                        state_or_province: e.target.value
                      })
                    }
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    value={this.state.postal_code}
                    label="Postal Code"
                    type="text"
                    onChange={e =>
                      this.setState({
                        postal_code: e.target.value
                      })
                    }
                  />

                  <TextField
                    className={classes.textField}
                    margin="dense"
                    id="name"
                    label="Country"
                    value={this.state.country}
                    type="text"
                    onChange={e =>
                      this.setState({
                        country: e.target.value
                      })
                    }
                  />
                </Grid>

                <FormHelperText
                  id="component-error-text"
                  style={{
                    color: `${this.state.helperColor}`,
                    marginTop: "15px",
                    justifyContent: "center",
                    display: `${this.state.formHelper}`
                  }}
                >
                  {this.state.errorMessege}
                </FormHelperText>
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary">
                  Add
                </Button>
                <Button
                  onClick={() =>
                    this.setState({
                      open: false,
                      formHelper: "none"
                    })
                  }
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          <Dialog open={this.state.editDialog}>
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
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Addressbook);
