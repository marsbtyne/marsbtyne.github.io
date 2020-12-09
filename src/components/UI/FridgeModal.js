import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from './Backdrop';


class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldModalUpdate', this.props.children, nextProps.children)
    return (nextProps.display!== this.props.display || nextProps.children !== this.props.children)
  }

  componentWillUpdate() {
    console.log('[Modal] WillUpdate');
  }

  render () {
    
    return (
      <div>
        <Backdrop 
          display={this.props.display}
          clicked={this.props.modalClosed}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.display ? '1' : '0'
          }}
        >
          {this.props.children}
          
        </div>
      </div>
    )
  }
}

export default Modal;