import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { Anchor, Box, Button, Grommet, Layer, Form, FormField, TextInput } from 'grommet'


import FridgeModal from './UI/FridgeModal';
import SimpleDropButton from './UI/DropButton'
import LocationPin from './LocationPin';
import './map.css'

import * as actions from '../redux/actions/fridge';


class Map extends Component {

  state = {
    modal: null,
    checking: false
  }
  onModalOpen = (id) => {
    this.props.getFridge(id)
    this.setState({ modal: id });
  }
  modalClosedHandler = () => {
    this.setState({
      modal: null
    });
  }

  confirmCheck = (name, fridge) => {
    this.props.onFridgeChecked(fridge)
    this.setState({ checking: false })
  }

  render() {
    let f = this.props.currentFridge;
    let modalInfo = null;
    if (f) {
      let status;
      let check;
      let lastChecked;
      if (f.confirmed) {
        status = (
            <h4>Status: Confirmed</h4>
        )
        check = (
          <Box pad={{bottom: 'large'}}>
          <Button primary active onClick={() => this.setState({ checking: true })} label="Check Fridge" />
          </Box>
        )
        if (f.lastChecked) {
          let date = JSON.parse(f.lastChecked);
          date = new Date(date);
          console.log('date', date);
          let parsed = date.toLocaleString();
          lastChecked = (
          <h3>Last checked: {parsed}</h3>
          )
        }
        if (this.state.checking) {
          check = (
              <Form onSubmit={(event) => this.confirmCheck(event.value, f)}>
                <Box gap="small">
                <TextInput size="small"id="textinput-id" name="name" placeholder="Your Name (optional)" />
                <Box direction="row" gap="xsmall">
                  <Button size="small" active label="Cancel" onClick={() => this.setState({checking: false})} />
                  <Button size="small" type="submit" primary label="Submit Check" />
                </Box>
                </Box>
              </Form>)
        }
      }
      else {
        status = (<Box><h4>Status: Unconfirmed</h4><Button primary active onClick={() => this.props.onFridgeConfirmed(f)} label="Confirm Fridge" /></Box>)
      }

      modalInfo = (
        <Box
          align="center"
          pad="medium"
          overflow="visible"
          pad="medium"
        >
          <h2>{f.name}</h2>
          <h2>Neighborhood: {f.neighborhood}</h2>
          <h3>Location: {f.streetAddress}</h3>
          <h3>Notes: {f.notes}</h3>
          <Button href={f.link} label="Social Media" />
          <Box align="center">
          {status}
          {lastChecked}
          {check}
          </Box>
        </Box>
      );
    }
    return (
      <div className="map">
        <div className="google-map">
          {this.state.modal && (
            <Layer
              modal
              animation="fadeIn"
              onEsc={this.modalClosedHandler}
              onClickOutside={this.modalClosedHandler}
            > 
            <Button onClick={this.modalClosedHandler}></Button>{modalInfo}
            </Layer>)}
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
    )
  }
}

const mapStateToProps = state => {
  return {
    currentFridge: state.currentFridge
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFridge: (fridgeID) => dispatch(actions.getFridge(fridgeID)),
    onFridgeConfirmed: (fridge) => dispatch(actions.confirmFridge(fridge)),
    onFridgeChecked: (fridge) => dispatch(actions.checkFridge(fridge))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);