import React, { Component } from 'react';
import './modal.css';


class InfoBox extends Component {
  render () {
    return (
      <div className="Info">
        {this.props.fridgeData.name}<br/>
        {this.props.fridgeData.streetAddress} <br />
        {this.props.fridgeData.contactGroup}
      </div>
    )
  }
}

export default InfoBox;