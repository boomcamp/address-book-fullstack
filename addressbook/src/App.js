import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
import { useLocalStorage } from "./components/customHooks/useLocalStorage";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { getUserData } from "./components/customHooks/getUserData";
import Axios from "axios";
import { url } from "./url";

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

  useEffect(() => {
    if (user) {
      getUserData(user).then(user => setUserData(user));
    }
  }, [user]);

  const handleOnChange = (key, data) => {
    key === "login"
      ? setloginData({ ...loginData, [data.name]: data.value })
      : key === "register"
      ? setRegistrationData({
          ...registrationData,
          [data.name]: data.value
        })
      : setContact({ ...contact, [data.name]: data.value });
    if (data.name === "confirmPassword") {
      registrationData.password !== data.value
        ? setValidation({
            ...validation,
            confirmPassword: true,
            confirmPasswordMsg: "Password don't match!"
          })
        : setValidation({
            ...validation,
            confirmPassword: false,
            confirmPasswordMsg: ""
          });
    }
  };

  const handleFilterByGroup = async id => {
    if (!id) {
      setGroup(null);
      getUserData(user).then(user => setUserData(user));
    }
    const response = await Axios.get(`${url}/groups/${id}/list`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setGroup(id);
    setUserData({ ...userData, addressBook: response.data.contactList });
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
      />
    </HashRouter>
  );
}

export default App;
