import React from 'react';
import Kitchen from '@material-ui/icons/Kitchen'

import InfoBox from './UI/InfoBox';

const LocationPin = (props) => (
  <div 
    className="pin"
    onMouseEnter={() => props.toggleHover(props.fridgeData.id)}
    onMouseLeave={() => props.toggleHover(props.fridgeData.id)}
    onClick={() => props.onModalOpen(props.fridgeData.id)}
  >
    {props.hover === props.fridgeData.id ? <InfoBox fridgeData={props.fridgeData} /> : null}
    <Kitchen className="pin-icon" />
    <p className="pin-text">{props.fridgeData.name}</p>
  </div>
);

export default LocationPin;