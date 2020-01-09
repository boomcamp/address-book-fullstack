import React from 'react';
// import Login from './components/Login/Login'
import {BrowserRouter as Router} from 'react-router-dom'
import Pages from './components/Routing/Pages'

function App() {
  return (
    <Router>
      <Pages/>
    </Router>
  );
}

export default App;
