import React, { Component } from 'react';

import { Box } from 'grommet';

import classes from  './Modal.module.css';


class InfoBox extends Component {
  render () {
    return (
      <div className={classes.Info}>
        <div className={classes.popupContainer}>
        <div className={classes.popuBubbleAnchor}>
          <Box border="horizontal" pad="xsmall"
        background={{ color: 'brand' }} className={classes.popupBubble}>
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