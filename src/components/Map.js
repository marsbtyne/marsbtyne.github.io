import React , { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Kitchen from '@material-ui/icons/Kitchen'

import FridgeModal from './FridgeModal';
import './map.css'


class Map extends Component {
  render () {
    console.log('Map.js', this.props.fridges);
    return (
      <div className="map">
    <h2 className="map-h2">Find a Fridge Near You</h2>

    <div className="google-map">
      <GoogleMapReact
        distanceToMouse={()=>{}}
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
        />
        ))}
      </GoogleMapReact>
    </div>
  </div>
    )}
}

const LocationPin = (props) => (
  <div 
    className="pin"
    onMouseEnter={() => props.toggleHover(props.fridgeData.id)}
    onMouseLeave={() => props.toggleHover(props.fridgeData.id)}
  >
    {props.hover === props.fridgeData.id ? <FridgeModal fridgeData={props.fridgeData} /> : null}
    <Kitchen className="pin-icon" />
    <p className="pin-text">{props.fridgeData.name}</p>
  </div>
);

export default Map;