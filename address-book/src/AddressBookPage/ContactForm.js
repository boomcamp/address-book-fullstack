import React, { useState, Fragment, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

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

  useEffect(() => {
    console.log("high props update");

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
    }

    if (highprops.contactData) {
      let datatransfer = Object.assign({}, highprops.contactData);

      setState(prevState => {
        return { ...datatransfer };
      });
    }
  }, [highprops.contactData]);

  const stateUpdate = e => {
    e.persist();
    let property = e.target.name;

    console.log(e.target.value);

    setState(prevState => {
      console.log(prevState);
      if (e.target.value === null) {
        prevState[property] = "";
      } else {
        prevState[property] = e.target.value;
      }

      return { ...prevState };
    });
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
      .then(data => console.log(data))
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
        city: data.email,
        state_or_province: data.state_or_province,
        postal_code: data.postal_code,
        country: data.country
      },
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  const saveData = () => {
    if (highprops.prepareNewData) {
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
    } else {
      setState(highprops.contactData);
    }
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
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="Home Phone"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="mobile_phone"
                value={state.mobile_phone}
                validators={["required"]}
                errorMessages={["this field is required"]}
                label="Mobile Phone"
                variant="outlined"
                onChange={stateUpdate}
                className={classes.textfields}
              />
              <TextValidator
                id="outlined-required"
                name="work_phone"
                value={state.work_phone}
                validators={["required"]}
                errorMessages={["this field is required"]}
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
                validators={["required"]}
                errorMessages={["this field is required"]}
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
                validators={["required"]}
                errorMessages={["this field is required"]}
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

            <Button type="submit">Save</Button>
            <Button onClick={() => cancel()}>Cancel</Button>
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
  }
};
