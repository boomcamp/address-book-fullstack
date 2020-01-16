import React, { useState, Fragment, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function ContactForm(highprops) {
  const classes = useStyles();

  const [state, setState] = useState({
    first_name: "Default",
    last_name: "Default",
    home_phone: "Default",
    mobile_phone: "Default",
    work_phone: "Default",
    email: "Default",
    city: "Default",
    state_or_province: "Default",
    postal_code: "Default",
    country: "Default"
  });

  const [grpState, setgrpState] = useState({
    selectedGroupName: {
      title: "Default"
    },
    groupList: [
      {
        title: "work"
      },
      {
        title: "home"
      },
      {
        title: "crew"
      }
    ]
  });

  useEffect(() => {
    if (highprops.contactData === null) {
      setState({
        first_name: "",
        last_name: "",
        home_phone: "",
        mobile_phone: "",
        work_phone: "",
        email: "",
        city: "",
        state_or_province: "",
        postal_code: "",
        country: ""
      });
      setgrpState(prevState => {
        return { ...prevState, selectedGroupName: "" };
      });
    }

    if (highprops.contactData) {
      let datatransfer = Object.assign({}, highprops.contactData);

      setState(prevState => {
        return { ...datatransfer };
      });

      console.log(highprops.contactData.id);

      setGroup(highprops.contactData.id);
    }
    getGroup();
  }, [highprops.contactData]);

  const setGroup = id => {
    // here

    console.log("settting group", id);

    axios({
      method: "get",
      url: `http://localhost:5000/api/contacts/groups/reference/retrieve/${id}`,
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        // console.log(data.data[0].group_name)
        try {
          if (data.data[0].group_name) {
            setgrpState(prevState => {
              return {
                ...prevState,
                selectedGroupName: {
                  title: data.data[0].group_name
                },
                recentGroupState: {
                  title: data.data[0].group_name
                }
              };
            });
          }
        } catch (err) {
          setgrpState(prevState => {
            return {
              ...prevState,
              selectedGroupName: {
                title: ""
              }
            };
          });
        }
      })
      .catch(e => console.log(e));
  };

  const addtoGroup = data => {
    try {
      if (grpState.selectedGroupName) {
        let id;

        try {
          if (data.data[0].id) {
            id = data.data[0].id;
          }
        } catch (error) {
          id = data.data.id;
        }

        console.log("contact id is " + id);

        axios({
          method: "post",
          url: "http://localhost:5000/api/contacts/groups/reference",
          data: {
            group_name: grpState.selectedGroupName.title,
            contactid: id,
            past_group: grpState.recentGroupState.title
          },
          headers: { Authorization: sessionStorage.getItem("token") }
        })
          .then(data => console.log(data))
          .catch(e => console.log(e));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stateUpdate = e => {
    e.persist();

    let property = e.target.name;

    setState(prevState => {
      if (e.target.value === null) {
        prevState[property] = "";
      } else {
        prevState[property] = e.target.value;
      }

      return { ...prevState };
    });
    console.log(state);
  };

  const grpStateUpdate = (event, value, reason) => {
    setgrpState(prevState => {
      return {
        ...prevState,
        selectedGroupName: {
          title: value
        }
      };
    });

    console.log(grpState);
  };

  function EditData(newdata, olddata) {
    console.log(newdata.city);
    axios
      .put(
        `http://localhost:5000/api/contact/update/${olddata.id}`,
        {
          first_name: newdata.first_name,
          last_name: newdata.last_name,
          home_phone: newdata.home_phone,
          mobile_phone: newdata.mobile_phone,
          work_phone: newdata.work_phone,
          email: newdata.email,
          city: newdata.city,
          state_or_province: newdata.state_or_province,
          postal_code: newdata.postal_code,
          country: newdata.country
        },
        {
          headers: { Authorization: sessionStorage.getItem("token") }
        }
      )
      .then(data => {
        return data;
      })
      .then(addtoGroup)
      .catch(e => console.log(e));
  }

  function AddData(data) {
    let new_contact_reference;

    // for contacts table reference
    axios({
      method: "post",
      url: "/api/contact/save",
      data: {
        userid: sessionStorage.getItem("userid"),
        first_name: data.first_name,
        last_name: data.last_name,
        home_phone: data.home_phone,
        mobile_phone: data.mobile_phone,
        work_phone: data.work_phone,
        email: data.email,
        city: data.email,
        state_or_province: data.state_or_province,
        postal_code: data.postal_code,
        country: data.country
      },
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        return data;
      })
      .then(addtoGroup)
      .catch(e => console.log(e));
  }

  const saveData = () => {
    if (highprops.contactData === null) {
      AddData(state);
    } else {
      EditData(state, highprops.contactData);
    }
    // window.location.reload();
  };

  const cancel = () => {
    if (highprops.prepareNewData) {
      setState({
        first_name: "",
        last_name: "",
        home_phone: "",
        mobile_phone: "",
        work_phone: "",
        email: "",
        city: "",
        state_or_province: "",
        postal_code: "",
        country: ""
      });

      setgrpState(prevState => {
        return { ...prevState, selectedGroupName: "" };
      });
    } else {
      setState(highprops.contactData);
    }
  };

  const getGroup = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/contacts/groups",
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        console.log(grpState);

        let groupContainer = [];

        data.data.map(gdata => {
          groupContainer.push({ title: gdata.group_name });
        });

        setgrpState(prevState => {
          return {
            ...prevState,
            groupList: groupContainer
          };
        });

        console.log(grpState);
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <div
        style={{
          padding: "30px",
          border: "1px solid lightgrey",
          margin: "0 0 10px 0",
          width: "100%"
        }}
      >
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            autoComplete="off"
            onError={errors => console.log(errors)}
            style={styles.inputfields}
            onSubmit={saveData}
          >
            <div className="name-group-container" style={styles.groupContainer}>
              <TextValidator
                className={classes.textfields}
                id="outlined-required"
                name="first_name"
                value={state.first_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="First Name"
                variant="outlined"
                onChange={stateUpdate}
              />
              <TextValidator
                id="outlined-required"
                name="last_name"
                value={state.last_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="Last Name"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
            </div>
            <div
              className="phone-group-container"
              style={styles.groupContainer}
            >
              <TextValidator
                id="outlined-required"
                name="home_phone"
                value={state.home_phone}
                validators={[
                  "required",
                  "matchRegexp:^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                ]}
                errorMessages={[
                  "this field is required",
                  "Input is invalid, must be a number"
                ]}
                label="Home Phone"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="mobile_phone"
                value={state.mobile_phone}
                validators={[
                  "required",
                  "matchRegexp:^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                ]}
                errorMessages={[
                  "this field is required",
                  "Input is invalid, must be a number"
                ]}
                label="Mobile Phone"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="work_phone"
                value={state.work_phone}
                validators={[
                  "required",
                  "matchRegexp:^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                ]}
                errorMessages={[
                  "this field is required",
                  "Input is invalid, must be a number"
                ]}
                label="Work Phone"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
            </div>
            <div
              className="address-group-container"
              style={styles.groupContainer}
            >
              <TextValidator
                id="outlined-required"
                name="email"
                value={state.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "this field is required",
                  "Email format is invalid"
                ]}
                label="Email"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="city"
                value={state.city}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="City"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="state_or_province"
                value={state.state_or_province}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="State/Province"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="postal_code"
                value={state.postal_code}
                validators={["required", "matchRegexp:^[0-9]+$"]}
                errorMessages={[
                  "this field is required",
                  "Input format is invalid"
                ]}
                label="Postal Code"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="country"
                value={state.country}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="Country"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
            </div>

            <Autocomplete
              freeSolo
              id="group-box"
              value={grpState.selectedGroupName}
              options={grpState.groupList}
              getOptionLabel={option => option.title}
              // style={{ width: 300 }}
              onInputChange={grpStateUpdate}
              className={classes.textfields}
              renderInput={params => (
                <TextField
                  {...params}
                  // onChange={grpStateUpdate}
                  label="Add to a group"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            {/* <Button type="submit">Save</Button>
            <Button onClick={() => cancel()}>Cancel</Button> */}

            <button style={styles.submitBtn} type="submit">
              Save
            </button>

            <button style={styles.cancelBtn} onClick={() => cancel()}>
              Cancel
            </button>
          </ValidatorForm>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  textfields: {
    width: "250px",
    margin: "0 10px 10px 0"
  }
}));

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "400px",
    border: "1px solid grey",
    height: "400px",
    margin: "0 auto",
    marginTop: "20%"
  },
  inputfields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  siguplink: {
    cursor: "pointer",
    color: "grey",
    textDecoration: "underline"
  },
  groupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "900px"
  },
  submitBtn: {
    width: "186px",
    height: "40px",
    background: "#2196F3",
    color: "white",
    border: "none",
    marginTop: "25px",
    marginBottom: "10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  cancelBtn: {
    width: "186px",
    height: "40px",
    background: "rgb(202, 202, 202)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
