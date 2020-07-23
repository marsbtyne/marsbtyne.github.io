import React, { Component } from 'react';
import classes from  './Modal.module.css';


class InfoBox extends Component {
  render () {
    return (
      <div className={classes.Info}>
        <div className={classes.popupContainer}>
        <div className={classes.popuBubbleAnchor}>
          <div className={classes.popupBubble}>
            {this.props.fridgeData.name}<br/>
            {this.props.fridgeData.streetAddress} <br />
            {this.props.fridgeData.contactGroup}
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default InfoBox;