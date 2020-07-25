import React from 'react';
import Kitchen from '@material-ui/icons/Kitchen'
import './pin.css'
import InfoBox from './UI/InfoBox';

const LocationPin = (props) => (
  <div
    className="pin"
    onMouseEnter={() => props.toggleHover(props.fridgeData.id)}
    onMouseLeave={() => props.toggleHover(props.fridgeData.id)}
    onClick={() => props.onModalOpen(props.fridgeData.id)}
  >
    <Kitchen className="pin-icon" />
    {props.showInfoBox ? (<InfoBox className="mobile" fridgeData={props.fridgeData} />) : null}
    {(props.hover === props.fridgeData.id && props.showInfoBox) ? <InfoBox className="desktop" fridgeData={props.fridgeData} /> : null}
    
  </div>
);

export default LocationPin;