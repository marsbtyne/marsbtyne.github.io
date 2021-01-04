import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet, Box, TextInput, Text, Heading, Button } from 'grommet';
import {Helmet} from 'react-helmet'
import './App.css';
import firebase from './firebase';
import NewMap from './components/NewMap';

import FridgeFinder from './containers/FridgeFinder';



class App extends Component {
  
  render (props) {
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
    <BrowserRouter basename="/nycfridge">
    <div className="App">
      <Helmet>
    <title>Map of NYC Community Fridges</title>
    <meta name="description" content="Map of free community fridges and food shares across New York City" />
    <meta name="keywords" content="Community Fridges, Mutual Aid, fridge, nyc, foodshare, free food, community, refrigerators, fridge map, nyc fridges, nyc free food, nyc fridge map, nyc community fridges"></meta>
  </Helmet>
  <Grommet>
    
    <NewMap />
  </Grommet>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
