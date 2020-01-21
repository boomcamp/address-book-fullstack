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
  const [redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState({});
  const [contact, setContact] = useState({});
  const [group, setGroup] = useState(null);
  const [sort, setSort] = useState("");

  const resetStates = () => {
    setUser({});
    setUserData({});
    setSort("asc");
    setContact({});
    setGroup(null);
  };
  useEffect(() => {
    if (user) {
      getUserData(user, sort).then(user => setUserData(user));
    }
  }, []);

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
        resetStates={resetStates}
      />
    </HashRouter>
  );
}
export default App;
