import React, { useState } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
import { useLocalStorage } from "./components/customHooks/useLocalStorage";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  const [loginData, setloginData] = useState({});
  const [registrationData, setRegistrationData] = useState({});
  const [user, setUser] = useLocalStorage("user", {});
  const [validation, setValidation] = useState({
    confirmPassword: false,
    confirmPasswordMsg: ""
  });
  const [redirect, setRedirect] = useState(false);

  const handleOnChange = (key, data, action) => {
    key === "login"
      ? setloginData({ ...loginData, [data.name]: data.value })
      : setRegistrationData({ ...registrationData, [data.name]: data.value });
    if (action && action === "confirmPassword") {
      registrationData.password !== data.value
        ? setValidation({
            ...validation,
            password: true,
            passwordMsg: "Password don't match!"
          })
        : setValidation({
            ...validation,
            confirmPassword: false,
            confirmPasswordMsg: ""
          });
    }
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
      />
    </HashRouter>
  );
}

export default App;
