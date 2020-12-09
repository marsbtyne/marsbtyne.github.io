import React from 'react';
import Kitchen from '@material-ui/icons/Kitchen'
import './pin.css'
import InfoBox from './UI/InfoBox';

const LocationPin = (props) => {

  let hover = (props.hover === props.fridgeData.id);
  return (

  <div
    className="pin"
    onMouseEnter={() => props.toggleHover(props.fridgeData.id)}
    onMouseLeave={() => props.toggleHover(props.fridgeData.id)}
    onClick={() => props.onModalOpen(props.fridgeData.id)}
  >
    <Kitchen className="pin-icon" />
    {props.showInfoBox ? (<InfoBox hover={hover}fridgeData={props.fridgeData} />) : null}    
  </div>
);
  }

export default LocationPin;