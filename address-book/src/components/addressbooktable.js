import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Contact from "./new";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import GroupList from "./groupList"
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
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
      data: [],
      columns: [
        {
          title: "FirstName",
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
              {rowData.first_name}
            </span>
          )
        },
        {
          title: "LastName",
          field: "last_name",

          render: rowData => (
            <span
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer"
              }}
            >
              {rowData.last_name}
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
        }
      ]
    };
  }

  componentDidMount() {
    const id = localStorage.getItem("id");
    axios.get(`/addressbook/${id}`).then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  render() {
    console.log(this.state.data);
    const { classes } = this.props;
    return (
      <React.Fragment>
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
                  border: "solid 1px",
                  display: "flex"
                }}
              >
                {/* Group */}
                <Grid item lg={2} md={3} sm={12} xs={12}>
                  <GroupList />
                </Grid>

                {/*Contact Table */}
                <Grid
                  item
                  xl={24}
                  lg={10}
                  md={9}
                  sm={12}
                  xs={12}
                  style={{
                    border: "solid 1px red"
                  }}
                >
                  <MaterialTable
                    options={{
                      search: false,
                      paging: false,
                      actionsColumnIndex: -1,
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
                    data={this.state.data}
                    editable={{
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            if (oldData) {
                              this.setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                              });
                            }
                          }, 600);
                        }),
                      onRowDelete: oldData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                            });
                          }, 600);
                        })
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Addressbooktable);
