import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, withProps } from 'recompose';
import Kitchen from '@material-ui/icons/Kitchen';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import axios from '../axios';

import Fridge from '../fridge.png';
import Spinner from './UI/Spinner';
import * as actions from '../redux/actions/fridge';



import Map from './Map';

class FridgeLocation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      location: {
        address: '252 Broadway Brooklyn NY 11211',
        lat: 40.7,
        lng: -73.9
      },
      fridgeLocation: {},
      hover: null
    }
  }
  
  componentDidMount () {
    this.props.onFridgesLoad()
  }

  toggleHover = (id) => {
    let h = this.state.hover === id ? null : id;
    this.setState({hover: h})
  };

  addFridge = () => {
    let data = {
      name: 'Bushwick Fridge',
      streetAddress: '133 Knickerbocker Ave',
      neighborhood: 'Bushwick',
      borough: 'Brooklyn',
      contactGroup: 'Bushwick Mutual Aid',
      confirmed: false
    }
    this.props.onFridgeAdded(data)
  }
  
  render (){
    let map = (<Spinner />);
    if (this.props.fridges && !this.props.loading) {
      map = (
        <Map 
          location={this.state.location}
          zoomLevel={12}
          fridgeLocation={this.state.fridgeLocation}
          toggleHover={this.toggleHover}
          hover={this.state.hover}
          fridges={this.props.fridges}
          confirmed={this.props.onFridgeConfirmed}
          />
      )
    }
    return (
      <div style={{ height: '90vh', width: '80%', margin: 'auto'}}>
        <button onClick={this.addFridge}>Add New Fridge</button>
        {map}
          
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fridges: state.fridges,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFridgesLoad: () => dispatch(actions.fetchFridges()),
    onFridgeAdded: (fridge) => dispatch(actions.submitFridge(fridge)),
    onFridgeConfirmed: (fridgeID) => dispatch(actions.confirmFridge(fridgeID))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FridgeLocation);