import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter } from 'react-router-dom';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
