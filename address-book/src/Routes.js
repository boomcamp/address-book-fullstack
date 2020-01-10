import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Register from "./components/register"
import Login from "./components/login"
import addressbook from "./components/addressbook"
export default function Routes(){
    return(
        <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route  exact path="/Register" component={Register}/>
        <Route  exact path="/addressbook" component={addressbook}/>
        </BrowserRouter>
    )
}
