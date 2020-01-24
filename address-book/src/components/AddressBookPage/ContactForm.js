import React, { useState, Fragment, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import GroupForm from "./GroupForm/GroupForm";

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

  const [datatransfered, setDataTranfered] = useState();

  const [grpState, setgrpState] = useState({
    selectedGroupName: {
      title: "Default"
    },
    recentGroupState: {
      title: ""
    },
    groupList: [
      {
        title: "Defualt"
      }
    ]
  });

  useEffect(() => {

    const {contactData} = highprops;
    if (contactData === null) {
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

    if (contactData) {
      const data =  Object.assign({}, contactData)
      // const data = highprops.contactData;
      setDataTranfered(data);
      setState(data);

      setGroup(contactData.id);
    }
    getGroup();
  }, [highprops.contactData]);

  const setGroup = id => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/contacts/groups/reference/retrieve/${id}`,
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        try {
          if (data.data[0].group_name) {
            setgrpState(prevState => {
              return {
                ...prevState,
                selectedGroupName: {
                  title: data.data[0].group_name
                },
                recentGroupState: {
                  title: data.data[0].group_name ? data.data[0].group_name : ""
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

  const [upContactData, setUpContactData] = useState();

  const addtoGroup = data => {
    setUpContactData(data);
  };

  const stateUpdate = e => {
    const { name, value } = e.target;

    setState(prevState => {
      if (value === null) {
        prevState[name] = "";
      } else {
        prevState[name] = value;
      }

      return { ...prevState };
    });

    return null;
  };

  function EditData(newdata, olddata) {
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
        city: data.city,
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

    console.log(state)
    if (highprops.contactData === null) {
      AddData(state);
    } else {
      EditData(state, highprops.contactData);
    }

    alert("Registering data, please wait");

    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const cancel = () => {

    // axios({
    //   method:"get",
    //   url:`http://localhost:5000/api/contacts/${highprops.contactData.id}`,
    //   headers: { Authorization: sessionStorage.getItem("token") }
    // })
    // .then(data=>{
    //   setState(data.data)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })

    // console.log(highprops.contactData);

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
    } else if (highprops.contactData) {
      setState(highprops.contactData);
    }

    window.location.reload();
  };

  const getGroup = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/contacts/get/groups",
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
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
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <div
        style={{
          padding: "30px",
          background: "white",
          marginTop: "25px"
        }}
      >
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            autoComplete="off"
            onError={errors => console.log(errors)}
            style={styles.inputfields}
            onSubmit={saveData}
            autoComplete
          >
            <div
              className={classes.groupContainer}
              style={styles.groupContainer}
            >
              <TextValidator
                className={classes.textfields_dual}
                id="outlined-required"
                name="first_name"
                value={state.first_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="First Name"
                variant="outlined"
                onChange={e => stateUpdate(e)}
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
                className={classes.textfields_dual}
              />
            </div>
            <div
              className={classes.groupContainer}
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
                className={classes.textfields_tres}
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
                className={classes.textfields_tres}
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
                className={classes.textfields_tres}
              />
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
                className={classes.textfields_tres}
              />
            </div>
            <div
              className="address-group-container"
              style={styles.groupContainer}
            >
              <TextValidator
                id="outlined-required"
                name="city"
                value={state.city}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="City"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields_dual}
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
                className={classes.textfields_dual}
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
                className={classes.textfields_dual}
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
                className={classes.textfields_dual}
              />
            </div>
            <div className={classes.textfields_uno}>
              <GroupForm
                reference_contact={
                  highprops.contactData ? highprops.contactData.id : null
                }
                newContactData={upContactData}
              />
            </div>

            <div className={classes.btnContainer}>
              <button className={classes.SubmitButton} type="submit">
                Save
              </button>

              <p className={classes.CancelButton} onClick={() => cancel()}>
                Cancel
              </p>
            </div>
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
    width: "350px",
    margin: "0 10px 10px 25px"
  },
  textfields_dual: {
    marginRight: "10px",
    width: "290px",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {
      marginRight: "10px",
      width: "290px",
      marginBottom: "10px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "350px",
      marginBottom: "10px"
    }
  },
  textfields_tres: {
    marginRight: "10px",
    width: "590px",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {
      marginRight: "10px",
      width: "590px",
      marginBottom: "10px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "350px",
      marginBottom: "10px"
    }
  },
  textfields_uno: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-14px"
    }
  },
  groupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "1000px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  SubmitButton: {
    width: "186px",
    height: "50px",
    background: "#2196F3",
    color: "white",
    border: "none",
    marginBottom: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      width: "230px"
    }
  },
  CancelButton: {
    width: "186px",
    height: "50px",
    background: "rgb(202, 202, 202)",
    color: "white",
    border: "none",
    marginBottom: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8em",
    marginTop: "0px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      width: "242px"
    }
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
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8em"
  }
};
