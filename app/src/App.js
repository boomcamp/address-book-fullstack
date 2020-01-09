import React from 'react';

import Routes from './routes';
import Navbar from './components/Navbar';

import './App.css';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}
