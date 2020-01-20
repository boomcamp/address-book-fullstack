import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Login from './component/user/login';
import Register from './component/user/register';
import Nav from './component/navigation';
import AccessBook from './component/accessbook/accessbook'  
function App() {
  return (
    <HashRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/addressbook" component={AccessBook} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
