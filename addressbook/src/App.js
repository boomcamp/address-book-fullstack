import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
import { useLocalStorage } from "./components/customHooks/useLocalStorage";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { getUserData, fetch } from "./components/customHooks/getUserData";

function App() {
  const [loginData, setloginData] = useState({});
  const [registrationData, setRegistrationData] = useState({});
  const [user, setUser] = useLocalStorage("user", {});
  const [validation, setValidation] = useState({
    confirmPassword: false,
    confirmPasswordMsg: ""
  });
  const [redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState({});
  const [contact, setContact] = useState({});
  const [group, setGroup] = useState(null);
  const [sort, setSort] = useState("");
  const [buttons, setButtons] = useState({
    addEditContactBtn: false,
    registerBtn: true
  });

  const resetStates = () => {
    setUser({});
    setUserData({});
    setSort("asc");
    setContact({});
    setGroup(null);
    setButtons({});
  };
  useEffect(() => {
    if (user) {
      getUserData(user, sort).then(user => setUserData(user));
    }
  }, []);

  const handleDisabledButtons = () =>
    setButtons({
      ...buttons,
      registerBtn: true
    });
  const handleEnabledButtons = () =>
    setButtons({
      ...buttons,
      registerBtn: false
    });
  const handleOnChange = (key, data) => {
    const { name, value } = data;

    key === "login"
      ? setloginData({ ...loginData, [name]: value })
      : key === "register"
      ? setRegistrationData({
          ...registrationData,
          [name]: value
        })
      : setContact({ ...contact, [name]: value });
    if (name === "confirmPassword") {
      if (registrationData.password !== value) {
        setValidation({
          ...validation,
          confirmPassword: true,
          confirmPasswordMsg: "Password don't match!"
        });
        handleDisabledButtons();
      } else {
        setValidation({
          ...validation,
          confirmPassword: false,
          confirmPasswordMsg: ""
        });
        handleEnabledButtons();
      }
    } else if (name === "password") {
      if (value.length < 6) {
        handleDisabledButtons();
        return setValidation({
          ...validation,
          password: true,
          passwordMsg: "Must have at least 6 characters!"
        });
      }

      handleEnabledButtons();
      setValidation({
        ...validation,
        password: false,
        passwordMsg: ""
      });
    } else if (name === "email") {
      if (!emailRegex.test(String(value))) {
        handleDisabledButtons();
        return setValidation({
          ...validation,
          email: true,
          emailMsg: "Must be a valid Email Address!"
        });
      }

      handleEnabledButtons();
      setValidation({
        ...validation,
        email: false,
        emailMsg: ""
      });
    } else if (name === "username") {
      if (!usernameRegex.test(value)) {
        handleDisabledButtons();
        return setValidation({
          ...validation,
          username: true,
          usernameMsg: "Must have at least 6 alpha-numeric characters"
        });
      }

      handleEnabledButtons();
      setValidation({
        ...validation,
        username: false,
        usernameMsg: ""
      });
    }
  };

  const handleFilterByGroup = async id => {
    if (!id) {
      setGroup(null);
      return getUserData(user, sort).then(user => setUserData(user));
    }
    setGroup(id);
    fetch(user, id, userData, setUserData, sort);
  };
  return (
    <HashRouter>
      <ToastContainer />
      <Routes
        handleOnChange={handleOnChange}
        loginData={loginData}
        setloginData={setloginData}
        user={user}
        setUser={setUser}
        validation={validation}
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        redirect={redirect}
        setRedirect={setRedirect}
        userData={userData}
        setUserData={setUserData}
        setContact={setContact}
        contact={contact}
        handleFilterByGroup={handleFilterByGroup}
        group={group}
        setGroup={setGroup}
        sort={sort}
        setSort={setSort}
        buttons={buttons}
        setButtons={setButtons}
        resetStates={resetStates}
      />
    </HashRouter>
  );
}
const emailRegex = /^(([^<>(),;:\s@]+([^<>(),;:\s@]+)*)|(.+))@(([^<>()[,;:\s@]+)+[^<>()[.,;:\s@]{2,})$/i;
const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
export default App;
