import React from "react";
// import Login from './components/Login/Login'
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./components/Routing/Pages";

function App() {
  return (
    <>
      <Router>
        <Pages />
      </Router>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "rgb(230, 230, 230)",
          opacity: "0.7",
          zIndex: "-100",
          position: "absolute",
          top: "0"
        }}
      />
    </>
  );
}

export default App;
