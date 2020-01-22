import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  Container,
  Button,
  Tooltip,
  Grid,
  Chip,
  Typography
} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddGroup from "../Group/AddGroup";
import AppBarAddress from "../AppBar/appBarAddress";
import AddContact from "../AddContact/addContact";
import ContactDetails from "../ContactDetails/contactDetails";
import { useHistory } from "react-router-dom";

export const LoadContext = React.createContext();

export default function AddressBook() {
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [home_phone, setHome_phone] = React.useState("");
  const [mobile_phone, setMobile_phone] = React.useState("");
  const [work_phone, setWork_phone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state_or_province, setState_or_province] = React.useState("");
  const [postal_code, setPostal_code] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [id, setId] = React.useState("");
  const [groupData, setgroupData] = React.useState([]);
  const [order, setOrder] = useState("asc");
  let history = useHistory();
  const [load, setLoad] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Name",
        headerStyle: {
          fontWeight: "bold"
        },
        render: rowData =>
          rowData.firstname + " " + (rowData.lastname ? rowData.lastname : ""),
        customFilterAndSearch: (term, rowData) =>
          (rowData.firstname + " " + (rowData.lastname ? rowData.lastname : ""))
            .toLowerCase()
            .indexOf(term.toLowerCase()) !== -1,
        sorting: false
      },
      {
        title: "Home Phone No.",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        field: "home_phone",
        type: "numeric"
      },
      {
        title: "Mobile No.",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        field: "mobile_phone",
        type: "numeric"
      },
      {
        title: "Work No.",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        field: "work_phone",
        type: "numeric"
      },
      {
        title: "Actions",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        render: (rowData, prevState) => (
          <React.Fragment>
            <Tooltip title="View Details">
              <Button onClick={() => handleViewDetails(rowData.id)}>
                <VisibilityOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={() => handleDelete(rowData)}>
                <DeleteOutlineOutlinedIcon />
              </Button>
            </Tooltip>
          </React.Fragment>
        )
      }
    ],
    data: []
  });

  var userId;
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      icon: "warning",
      title: "You must login first"
    }).then(function() {
      history.push("/");
    });
  } else {
    userId = jwt.decode(localStorage.getItem("Token")).userId;
  }

  const handleSortAsc = () => {
    setOrder("asc");
    setLoad(true);
  };

  const handleSortDesc = () => {
    setOrder("desc");
    setLoad(true);
  };

  useEffect(() => {
    (async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/contacts/${userId}?order=${order}`
      }).then(res => {
        setState({ ...state, data: res.data });
      });
    })();
    setLoad(false);
  }, [load]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenView(false);
  };

  const handleViewDetails = id => {
    axios({
      method: "get",
      url: `http://localhost:3004/contacts/${userId}/${id}`
    }).then(res => {
      axios({
        method: "get",
        url: `http://localhost:3004/groupmembers/${res.data[0].id}`
      }).then(res => {
        setgroupData(res.data);
      });
      const data = res.data[0];
      setId(data.id);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setHome_phone(data.home_phone);
      setMobile_phone(data.mobile_phone);
      setWork_phone(data.work_phone);
      setEmail(data.email);
      setCity(data.city);
      setState_or_province(data.state_or_province);
      setPostal_code(data.postal_code);
      setCountry(data.country);
      setOpenView(true);
    });
  };

  const handleDelete = rowData => {
    Swal.fire({
      title: `Are you sure you want to delete ${rowData.firstname} from your contacts?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios({
          method: "delete",
          url: `http://localhost:3004/contacts/${rowData.id}`
        })
          .then(response => {
            Swal.fire({
              title: "Contact Deleted  Successfully",
              icon: "success"
            }).then(() => {
              history.push("/addressbook");
            });
          })
          .then(() => setLoad(true))
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Failed to Delete Contact",
              text: err
            });
          });
      }
    });
  };

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <LoadContext.Provider value={{ load: load, setLoad: () => setLoad() }}>
        <div>
          <AppBarAddress />
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              paddingTop: "2%"
            }}
          >
            <Grid container>
              <Container>
                <AddContact
                  open={open}
                  handleClose={handleClose}
                  openView={openView}
                  firstnameView={firstname}
                  lastnameView={lastname}
                  home_phoneView={home_phone}
                  mobile_phoneView={mobile_phone}
                  work_phoneView={work_phone}
                  emailView={email}
                  cityView={city}
                  state_or_provinceView={state_or_province}
                  postal_codeView={postal_code}
                  countryView={country}
                />
                <ContactDetails
                  setgroupData={setgroupData}
                  groupData={groupData}
                  handleClose={handleClose}
                  openView={openView}
                  idView={id}
                  firstnameView={firstname}
                  lastnameView={lastname}
                  home_phoneView={home_phone}
                  mobile_phoneView={mobile_phone}
                  work_phoneView={work_phone}
                  emailView={email}
                  cityView={city}
                  state_or_provinceView={state_or_province}
                  postal_codeView={postal_code}
                  countryView={country}
                />
                <Grid item xs={12} sm={12} lg={12} md={12}>
                  <MaterialTable
                    components={{
                      Toolbar: props => (
                        <div>
                          <MTableToolbar {...props} />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginRight: "4%"
                            }}
                          >
                            <Typography
                              style={{ paddingTop: "0.3%", marginRight: 5 }}
                            >
                              Sort by Lastname:
                            </Typography>
                            <Chip
                              label="ASC"
                              onClick={() => handleSortAsc()}
                              style={{ marginRight: 5 }}
                            />
                            <Chip
                              label="DESC"
                              onClick={() => handleSortDesc()}
                              style={{ marginRight: 10 }}
                            />
                          </div>
                        </div>
                      )
                    }}
                    title="Contact List"
                    columns={state.columns}
                    data={state.data}
                    actions={[
                      {
                        icon: "add",
                        tooltip: "Add Contact",
                        isFreeAction: true,
                        onClick: () => handleOpen()
                      }
                    ]}
                  />
                </Grid>
              </Container>
              <Container>
                <Grid item style={{ display: "flex", width: "100%" }}>
                  <AddGroup />
                </Grid>
              </Container>
            </Grid>
          </div>
        </div>
      </LoadContext.Provider>
    );
  }
}
