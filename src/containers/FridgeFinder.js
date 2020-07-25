import React, { Component } from 'react';
import { Anchor, Box, Button, CheckBox, Grommet, Heading, Header, Layer, Footer, Text } from 'grommet';
import { connect } from 'react-redux';

import GitHubIcon from '@material-ui/icons/GitHub';

import Spinner from '../components/UI/Spinner';
import FridgeModal from '../components/UI/FridgeModal';
import FridgeForm from '../components/FridgeForm';
import * as actions from '../redux/actions/fridge';

import classes from './container.module.css';
import firebase from '../firebase';
import Map from '../components/Map';

class FridgeFinder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {
        address: '252 Broadway Brooklyn NY 11211',
        lat: 40.7,
        lng: -73.9
      },
      hover: null,
      modal: false,
      url: "",
      image: null,
      progress: 0,
      showInfoBox: true
    }
  }

  onModalOpen = () => {
    this.setState({ modal: true });
  }
  modalClosedHandler = () => {
    this.setState({ modal: false });
  }
  componentDidMount() {
    this.props.onFridgesLoad();
  }

  toggleHover = (id) => {
    let h = this.state.hover === id ? null : id;
    this.setState({ hover: h })
  };

  fridgeAdded = (fridge) => {
    this.props.onFridgeAdded(fridge);
  }

  addFridge = () => {
    this.onModalOpen();
  }

  render() {
    let map = (<Spinner />);
    let fridgeSubmission = (<Spinner />);
    if (this.props.fridges) {
      map = (
        <Map
          location={this.state.location}
          zoomLevel={12}
          toggleHover={this.toggleHover}
          hover={this.state.hover}
          showInfoBox={this.state.showInfoBox}
          fridges={this.props.fridges}
        />
      )
      fridgeSubmission = (<Layer
        modal
        animation="fadeIn"
        onEsc={this.modalClosedHandler}
        onClickOutside={this.modalClosedHandler}
      >
        <FridgeForm
          onClose={this.modalClosedHandler}
          onSubmit={this.fridgeAdded}
        />
      </Layer>)
    }
    return (
      <div className={classes.Container}>
        <div className={classes.contentWrap}>
        <Header background="light-4" pad="xsmall" justify="center">
          <Box gap="small" alignSelf="center">
            <Heading level="3">NYC Community Fridges</Heading>
            <Text>Current Fridge Count : {this.props.fridges.length}</Text>
          </Box>
        </Header>
        <Box justify="center" direction="row" pad="xsmall" gap="small">
          <Button primary label="Add Fridge" active onClick={this.addFridge} />
          <CheckBox
            name="toggle"
            toggle
            checked={this.state.showInfoBox}
            label="Show Fridge Info Boxes"
            onChange={event => this.setState({ showInfoBox: event.target.checked })}
          />
        </Box>
        {this.state.modal && fridgeSubmission}
        {map}
        </div>
        <Footer className={classes.Footer}
        justify="center"
          background="dark-2"
          pad={{ horizontal: 'large', vertical: "small" }}
        >
          <Box height="xxsmall">
            <Text size="xsmall" textAlign="center">Fridges are set up and maintained by mutual aid organizations and volunteers, aided by <Anchor href="https://www.instagram.com/iohnyc/">IOHNYC.</Anchor> Feed people not landfills, food sovereignty for all. </Text>
            <Text size="xsmall" textAlign="center">Site built using <Anchor href="https://reactjs.org/">React, </Anchor> UI components from <Anchor href="https://v2.grommet.io/">Grommet.io. </Anchor> Source code: <Anchor icon={<GitHubIcon fontSize="small"/>} href="https://github.com/marsbtyne/nycfridge" /></Text>
            </Box>
            </Footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fridges: state.fridges,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFridgesLoad: () => dispatch(actions.fetchFridges()),
    onFridgeAdded: (fridge) => dispatch(actions.submitFridge(fridge)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FridgeFinder);