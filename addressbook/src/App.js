import React, { useState } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
import Axios from "axios";
import { port } from "./port";
import { useLocalStorage } from "./components/customHooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [loginData, setloginData] = useState({});
  const [user, setUser] = useLocalStorage("user", {});

  const handleOnChange = data => {
    setloginData({ ...loginData, [data.name]: data.value });
  };

  const handleLogin = () => {
    Axios.post(`http://localhost:${port}/api/login`, loginData)
      .then(res => {
        setUser(res.data);
        toast.info("Login sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(err => console.error(err));
  };
  return (
    <HashRouter>
      <ToastContainer />
      <Routes
        handleOnChange={handleOnChange}
        handleLogin={handleLogin}
        user={user}
        setUser={setUser}
      />
    </HashRouter>
  );
}

export default App;
