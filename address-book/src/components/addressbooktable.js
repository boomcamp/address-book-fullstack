import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Contact from "./new";
import MaterialTable from "material-table";
import { Grid, IconButton } from "@material-ui/core";
import GroupList from "./groupList";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditContacts from "./modal/editContacts";
import Tooltip from "@material-ui/core/Tooltip";
import GroupIcon from "@material-ui/icons/Group";
const styles = {
  main: {
    ["@media (max-width:640px)"]: {
      display: "flex",
      flexDirection: "column"
    }
  }
};

class Addressbooktable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempData: [],
      disabled: true,
      buttonChange: "Edit",
      saveDisabled: true,
      editButton: "flex",
      saveButton: "none",
      openAdd: false,
      fname: "",
      lname: "",
      mobilephone: "",
      workphone: "",
      homephone: "",
      prov: "",
      city: "",
      email: "",
      postal: "",
      country: "",
      dataEdit: "",
      openModal: false,
      data: [],
      open: false,
      list: [],
      columns: [
        {
          title: "FullName",
          field: "first_name",

          render: rowData => (
            // console.log(rowdata)
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.first_name} {rowData.last_name}
            </span>
          )
        },
        {
          title: "Contact",
          field: "mobile_phone",

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.mobile_phone}
            </span>
          )
        },
        {
          title: "Actions",

          render: rowData => (
            <div>
              <span
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                  marginRight: 20
                }}
              >
                <Tooltip title="Edit Contact">
                  <EditIcon
                    onClick={() => this.handleOpenModal({ item: { rowData } })}
                  />
                </Tooltip>
              
              </span>

              <span
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",

                  marginRight: 20
                }}
              >
                <Tooltip title="Delete Contact">
                  <DeleteIcon
                    onClick={() => this.handleGetid({ item: { rowData } })}
                  />
                </Tooltip>
              </span>
            </div>
          )
        }
      ]
    };
  }
  handleEdit = () => {
    this.setState({
      disabled: false,
      saveDisabled: false,
      editButton: "none",
      saveButton: "flex"
    });
  };
  handleCancel = () => {
    this.handleCloseModal();
    this.setState({
      fname: "",
      lname: "",
      homephone: "",
      mobilephone: "",
      workphone: "",
      email: "",
      city: "",
      stateOrProvince: "",
      postalcode: "",
      country: "",
      disabled: true,
      editButton: true,
      saveButton: "none"
    });
  };
  handleOpenModal = item => {
    const idEdit = item.item.rowData.contactid;
    localStorage.setItem("idEdit", item.item.rowData.contactid);
    axios.get(`/addressbook/view/${idEdit}`).then(res => {
      this.setState({
        fname: res.data.first_name,
        lname: res.data.last_name,
        city: res.data.city,
        prov: res.data.state_or_province,
        country: res.data.country,
        mobilephone: res.data.mobile_phone,
        homephone: res.data.home_phone,
        workphone: res.data.work_phone,
        email: res.data.email,
        postal: res.data.postal_code
      });

      // console.log(this.state.mobilephone)
    });
    this.setState({
      openModal: true,
      disabled: true
    });
  };

  handleCloseModal = () => {
    localStorage.removeItem("idEdit");
    this.setState({
      openModal: false
    });
    this.props.getAll();
  };

  componentDidMount() {
    this.props.getAll();
  }

  handleGetid = item => {
    console.log(item.item.rowData.contactid);
    localStorage.setItem("idDelete", item.item.rowData.contactid);

    this.handleOpen();
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    localStorage.removeItem("idDelete");
    this.setState({
      open: false
    });
    this.props.getAll();
  };
  handleYes = () => {
    axios
      .delete(`/addressbook/deleteContact/${localStorage.getItem("idDelete")}`)
      .then(res => {
        localStorage.removeItem("idDelete");
        this.props.getAll();
        this.setState({
          open: false
        });
      });
  };
  setFields = event => {
    // console.log(event.target)
    // this.setState({
    //   fname: event.target.value
    // })
    var fieldname = event.target.name;
    var fieldError = fieldname + "Error";
    var value = event.target.value;
    this.setState({
      [fieldname]: value,
      [fieldError]: value ? false : true
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to Delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                No
              </Button>
              <Button onClick={() => this.handleYes()} color="primary">
                Yes
              </Button>
          
            </DialogActions>
          </Dialog>
        </div>
        <CssBaseline />
        <Container maxWidth="xl">
          <Typography
            component="div"
            style={{
              backgroundColor: "#cfe8fc",
              height: "100vh"
            }}
          >
            {/* Root container */}
            <Grid container>
              {/* Contact Modal */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Contact />
              </Grid>

              {/* Main container */}
              <Grid
                className={classes.main}
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{
                  border: "solid 1.5px #999",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 15
                }}
              >
                {/* Group */}
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <GroupList />
                </Grid>

                {/*Contact Table */}
                <Grid item lg={8} md={9} sm={12} xs={12}>
                  <MaterialTable
                    options={{
                      search: false,
                      paging: false,
                      headerStyle: {
                        backgroundColor: "#01579b",
                        textAlign: "center",
                        color: "white",
                        fontSize: "15px"
                      },
                      cellStyle: {
                        textAlign: "center"
                      }
                    }}
                    style={{ height: "650px", overflowX: "scroll" }}
                    title="Contacts"
                    fullWidth
                    columns={this.state.columns}
                    data={
                      this.props.searchValue.length > 0
                        ? this.props.tempData
                        : this.props.data
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </Container>

        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
          <EditContacts
                  handleCloseModal={this.handleCloseModal}
                  openModal={this.state.openModal}
                  dataEdit={this.state.dataEdit}
                  setFields={this.setFields}
                  fname={this.state.fname}
                  lname={this.state.lname}
                  email={this.state.email}
                  postal={this.state.postal}
                  city={this.state.city}
                  prov={this.state.prov}
                  mobilephone={this.state.mobilephone}
                  homephone={this.state.homephone}
                  workphone={this.state.workphone}
                  country={this.state.country}
                  disabled={this.state.disabled}
                  buttonChange={this.state.buttonChange}
                  saveDisabled={this.state.saveDisabled}
                  editButton={this.state.editButton}
                  saveButton={this.state.saveButton}
                  handleCancel={this.handleCancel}
                  handleEdit={this.handleEdit}
                />
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Addressbooktable);
