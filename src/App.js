import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FridgeLocation from './components/FridgeLocation'

class App extends Component {
  render () {
  return (
    <div className="App">
      <FridgeLocation />
    </div>
  );
}
}

export default App;
