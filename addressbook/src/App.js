import React from "react";
import LoginForm from "./components/Login/Login";
import Register from "./components/Register/Registration";
import Home from "./components/Homepage/AddHomePage";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { Tabs } from "antd";
function App() {
  return (
    <div>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={LoginForm} />
          <Route path="/signup" component={Register} />
          <Route path="/homepage" component={Home} />
        

        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
