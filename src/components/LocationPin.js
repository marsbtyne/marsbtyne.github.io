import React from 'react';
import Kitchen from '@material-ui/icons/Kitchen'
import './pin.css'
import InfoBox from './UI/InfoBox';

const LocationPin = ({showInfoBox, fridgeData, clickHandler}) => (
  <React.Fragment>
    <div
    className="pin"
    // onMouseEnter={() => props.toggleHover(props.fridgeData.id)}
    // onMouseLeave={() => props.toggleHover(props.fridgeData.id)}
    onClick={(event) => {clickHandler(fridgeData.id, event)} }
  >
    <Kitchen className="pin-icon" />
    {showInfoBox ? (<InfoBox className="mobile" fridgeData={fridgeData} />) : null}
    {(showInfoBox) ? <InfoBox className="desktop" fridgeData={fridgeData} /> : null}
    
  </div>
  </React.Fragment>
);

export default LocationPin;