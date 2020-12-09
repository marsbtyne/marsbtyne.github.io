import React, { Component } from 'react';

import { Box } from 'grommet';

import './Modal.css';


class InfoBox extends Component {
  
  render () {
    let b = this.props.hover ? 'brand' : '#f4f0ec'
    return (
      <div>
        <div className="popupContainer">
        <div className="popuBubbleAnchor">
          <Box border="horizontal" pad="xsmall"
        background={{ color: b }} className="popupBubble">
            {this.props.fridgeData.name}<br/>
            {this.props.fridgeData.streetAddress} <br />
          </Box >
        </div>
        </div>
      </div>
    )
  }
}

export default InfoBox;