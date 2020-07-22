import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import Kitchen from '@material-ui/icons/Kitchen';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import axios from '../axios';

import Fridge from '../fridge.png';

import Map from './Map';
import FridgeModal from './FridgeModal';

class FridgeLocation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fridges: [],
      location: {
        address: '252 Broadway Brooklyn NY 11211',
        lat: 40.7,
        lng: -73.9
      },
      fridgeLocation: {},
      hover: null
    }
    this.toggleHover = this.toggleHover.bind(this)
  }
  
  componentDidMount() {
    Geocode.setApiKey(process.env.REACT_APP_AUTH_TOKEN);
    
    axios.get('/fridges.json')
    .then(response => {
      const fetchedFridges = [];
      for (let key in response.data) {
        let f = response.data[key]
        let streetAddress = f.streetAddress;
        let fullAddress = streetAddress.concat(" " , f.borough, " NY");
        console.log(streetAddress);
        Geocode.fromAddress(fullAddress).then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          f.lat = lat;
          f.lng = lng;
          f.id = key;
          },
          error => {
            console.error(error);
          });
          console.log(f);
          fetchedFridges.push(f);
        }
      console.log(fetchedFridges)
      this.setState({fridges: fetchedFridges})
    })
    .catch(error => {
      console.log(error);
    });
  };

  toggleHover = (id) => {
    let h = this.state.hover === id ? null : id;
    this.setState({hover: h})
  };
  
  render (){
    if (this.state.fridges) {
      console.log('[render]', this.state.fridges)
    this.state.fridges.forEach(f => {
      console.log(f)
    });
    }
    return (
      <div style={{ height: '90vh', width: '80%', margin: 'auto'}}>
        
        <Map 
          location={this.state.location}
          zoomLevel={12}
          fridgeLocation={this.state.fridgeLocation}
          toggleHover={this.toggleHover}
          hover={this.state.hover}
          fridges={this.state.fridges}
          />
          
      </div>
    )
  }
}

export default FridgeLocation;