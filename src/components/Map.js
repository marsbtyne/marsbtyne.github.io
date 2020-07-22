import React , { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import {GoogleApiWrapper} from 'google-maps-react';

import FridgeModal from './UI/FridgeModal';
import LocationPin from './LocationPin';
import './map.css'


class Map extends Component {

  state = {
    modal: null
  }
  onModalOpen = (id) =>  {
    this.setState({modal: id});
  }
  modalClosedHandler = () => {
    this.setState({
      modal: null
    });
  }

  render () {
    let f;
    let modalInfo = null;
    if (this.props.fridges.length > 0 && this.state.modal !== null) {
      f = this.props.fridges.find(el => el.id === this.state.modal)
      let status;
      if (f.confirmed === true) {
        status = (<h4>Confirmed</h4>)}
        else {
          status= (<div><h4>Unconfirmed</h4><button onClick={() => this.props.confirmed(f.id)}>Confirm Fridge</button></div>)
        }

      modalInfo = (
        <div>
        <h2>{f.name}</h2>
        <h3>Location: {f.streetAddress}</h3>
        {status}
        </div>
      );
    }
    return (
      <div className="map">
    <h2 className="map-h2">Find a Fridge Near You</h2>

    <div className="google-map">
      <FridgeModal
        display={this.state.modal}
        modalClosed={this.modalClosedHandler}
        fridgeData={f}
      >
        {modalInfo}
      </FridgeModal>
      <GoogleMapReact
        
        bootstrapURLKeys={{ key: process.env.REACT_APP_AUTH_TOKEN }}
        defaultCenter={this.props.location}
        defaultZoom={this.props.zoomLevel}
      >
        {this.props.fridges.map(f => (
          <LocationPin
          lat={f.lat}
          lng={f.lng}
          fridgeData={f}
          toggleHover={this.props.toggleHover}
          hover={this.props.hover}
          onModalOpen={this.onModalOpen}
        />
        ))}
      </GoogleMapReact>
    </div>
  </div>
    )}
}

export default Map;