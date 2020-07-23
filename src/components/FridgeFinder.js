import React, { Component } from 'react';
import { Box, Button, Grommet, Heading, Layer } from 'grommet';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, withProps } from 'recompose';
import Kitchen from '@material-ui/icons/Kitchen';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import axios from '../axios';

import Fridge from '../fridge.png';
import Spinner from './UI/Spinner';
import FridgeModal from './UI/FridgeModal';
import FridgeForm from './FridgeForm';
import * as actions from '../redux/actions/fridge';


import Map from './Map';

class FridgeFinder extends Component {

  constructor (props) {
    super(props)
    this.state = {
      location: {
        address: '252 Broadway Brooklyn NY 11211',
        lat: 40.7,
        lng: -73.9
      },
      hover: null,
      modal: false,
    }
  }

  onModalOpen = () =>  {
    this.setState({modal: true});
  }
  modalClosedHandler = () => {
    this.setState({modal: false});
  }
  componentDidMount () {
    this.props.onFridgesLoad()
  }

  toggleHover = (id) => {
    let h = this.state.hover === id ? null : id;
    this.setState({hover: h})
  };

  fridgeAdded = (fridge) => {
    this.props.onFridgeAdded(fridge);
  }

  addFridge = () => {
    this.onModalOpen();
  }
  
  render (){
    let map;
    let fridgeSubmission = (<Spinner />);
    if (this.props.fridges && !this.props.loading) {
      map = (
        <Map 
          location={this.state.location}
          zoomLevel={12}
          fridgeLocation={this.state.fridgeLocation}
          toggleHover={this.toggleHover}
          hover={this.state.hover}
          fridges={this.props.fridges}
          />
      )
      fridgeSubmission = (<Layer
        full="vertical"
        modal
      animation="fadeIn"
      onEsc={this.modalClosedHandler}
      onClickOutside={this.modalClosedHandler}
    >
      <FridgeForm 
        onClose={this.modalClosedHandler}
        onSubmit={this.fridgeAdded}
      />
    </Layer>)
      }
    return (
      <div style={{ height: '90vh', width: '80%', margin: 'auto'}}>
        
      <Box align="center" pad="medium">
      <Heading level="2">NYC Community Fridges</Heading>
        <Button primary label="Add Fridge" active onClick={this.addFridge}/>
        </Box>
        {this.state.modal && fridgeSubmission}
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FridgeFinder);