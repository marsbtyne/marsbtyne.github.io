import React, { Component } from 'react';
import { Grommet, Box, TextInput, Text, Heading, Button } from 'grommet';
import {Helmet} from 'react-helmet'
import './App.css';
import firebase from './firebase';

import FridgeFinder from './containers/FridgeFinder'

class App extends Component {
  
  render () {
    const theme = {
      global: {
       colors: {
         'light-2': '#f5f5f5',
         'text': {
           light: 'rgba(0, 0, 0, 0.87)',
         },
       },
       edgeSize: {
         small: '14px',
       },
       elevation: {
         light: {
           medium: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
         },
       },
        font: {
          family: 'Roboto',
          size: '14px',
          height: '20px',
        },
      },
    };
  return (
    <div className="App">
      <Helmet>
    <title>Map of NYC Community Fridges</title>
    <meta name="description" content="Map of free community fridges and food shares across New York City" />
  </Helmet>
  <Grommet>
    
    <FridgeFinder />
  </Grommet>
    </div>
  );
}
}

export default App;
