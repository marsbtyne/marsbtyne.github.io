import React, { Component } from 'react';
import './modal.css';


class FridgeModal extends Component {
  render () {
    return (
      <div className="Modal">
        {this.props.fridgeData.name}<br/>
        {this.props.fridgeData.streetAddress} <br />
        {this.props.fridgeData.contactGroup}
      </div>
    )
  }
}

export default FridgeModal;