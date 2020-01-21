import React, { useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import MaterialTable, { MTableToolbar } from "material-table";
import { Container, Button, Tooltip, Grid } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddGroup from "../Group/AddGroup";
import AppBarAddress from "../AppBar/appBarAddress";
import AddContact from "../AddContact/addContact";
import ContactDetails from "../ContactDetails/contactDetails";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();

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

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Firstname",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        field: "firstname"
      },
      {
        title: "Lastname",
        headerStyle: {
          fontWeight: "bold"
        },
        field: "lastname"
      },

      {
        title: "Actions",
        headerStyle: {
          fontWeight: "bold"
        },
        sorting: false,
        render: rowData => (
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

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/contacts/${userId}`
      }).then(res => {
        setState({ ...state, data: res.data });
      });
    }
    result();
  }, [state, userId]);

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <div>
        <AppBarAddress />
        <div
          style={{
            display: "flex",
            marginTop: "50px",
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
    );
  }
}
