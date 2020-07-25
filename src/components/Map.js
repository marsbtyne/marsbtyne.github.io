import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { Anchor, Box, Button, CheckBox, Heading, Image, Grommet, Layer, Form, FormField, Text, TextInput, TextArea } from 'grommet';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Launch from '@material-ui/icons/Launch';



import LocationPin from './LocationPin';
import './map.css'

import * as actions from '../redux/actions/fridge';


class Map extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.submitButton = React.createRef();
    this.state = {
      modal: null,
      checking: false,
      url: "",
      image: null,
      progress: 0,
      showInfoBox: true
    }
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  bindResizeListener = (map, maps) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      map.gestureHandling = "greedy"
    });
  };

  handleApiLoaded = (map, maps) => {
    console.log('map', map, maps)
    map.gestureHandling = "greedy"
    // Bind the resize listener
    this.bindResizeListener(map, maps);
  }

  onModalOpen = (id) => {
    this.props.getFridge(id);
    this.setState({ modal: id });
  }
  modalClosedHandler = () => {
    this.setState({
      modal: null
    });
  }

  confirmCheck = (data, fridge) => {
    this.props.onFridgeChecked(data, fridge, this.state.image)
    this.setState({ checking: false })
  }

  getMapLink = (fridge) => {
    return 'https://www.google.com/maps/dir/?api=1&destination='.concat(fridge.lat, ",", fridge.lng)
  }

  getChecks = (currentFridge) => {
    const checks = [];
    for (let key in currentFridge.checks) {
      checks.push({
        ...currentFridge.checks[key],
        id: key
      });
    }
    return checks;
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  render() {
    let f = this.props.currentFridge;
    let modalInfo = null;
    if (f) {
      let status;
      let check;
      let lastChecked;
      if (f.confirmed) {
        status = (
          <h4>Status: Confirmed</h4>
        )
        check = (
          <Box pad={{ bottom: 'large' }}>
            <Button primary active onClick={() => this.setState({ checking: true })} label="Check Fridge" />
          </Box>
        )
        if (f.checks) {
          let c = this.getChecks(f)
          let lastC = c[c.length - 1];
          let date = JSON.parse(lastC.date);
          let note = lastC.notes;
          date = new Date(date);
          let parsed = date.toLocaleString();
          let lastPic = f.imageURL ? (<Image fit="contain" height="400" width="250" src={f.imageURL} />) : null;
          lastChecked = (
            <Box margin="small" gap="xsmall" style={{ alignItems: "center" }}>
              <h3>Last checked: {parsed}</h3>
              Most recent note:  {note}
              {lastPic}
            </Box>
          )
        }
        if (this.state.checking) {
          check = (
            <Box>
              <input type="file" name="file" id="file" class="inputfile" onChange={this.handleChange} />
              <label for="file">Upload Fridge Picture</label>
              <Form onSubmit={(event) => this.confirmCheck(event.value, f)}>
                <Box gap="small">
                  <FormField htmlFor="text">
                    <TextInput ref={this.textInput} onClick={this.focusTextInput} size="small" id="textinput-id" name="name" placeholder="Your Name (optional)" />
                  </FormField>
                  <FormField
                    name="notes"
                    label="Notes"
                    htmlFor="text-area"
                    ref={this.textInput}
                    component={TextArea}
                    placeholder="leave your notes about this check-in here!"
                  />

                  <Box direction="row" gap="xsmall" >
                    <Button size="small" active label="Cancel" onClick={() => this.setState({ checking: false })} />
                    <Button ref={this.submitButton} size="small" type="submit" primary label="Submit Check" />
                  </Box>

                </Box>
              </Form>
            </Box>)
        }
      }
      else {
        status = (<Box><h4>Status: Unconfirmed</h4><Button primary active onClick={() => this.props.onFridgeConfirmed(f)} label="Confirm Fridge" /></Box>)
      }

      modalInfo = (
        <Box
          align="center"
          margin="medium"
          pad="medium"
          overflow="hidden"
        >

          <h2>{f.name}</h2>
          <h2>Neighborhood: {f.neighborhood}</h2>
          <h3>Location: <Anchor href={this.getMapLink(f)}>{f.streetAddress}<Launch /></Anchor></h3>
          <h3>Notes: {f.notes}</h3>
          <Button href={f.link} label="Social Media" />
          {status}
          {lastChecked}
          {check}
        </Box>
      );
    }
    return (
      <Box className="google-map">
        {this.state.modal && (
          <Layer full="vertical" onClickOutside={this.modalClosedHandler}>
            <Box overflow='hidden' width="large">
              <Box
                flex={false}
                pad={{ horizontal: 'medium' }}
                align='center'
                direction='row'
                tag='header'
                justify='between'
                style={{ position: 'relative' }}
              >
                <Heading level={4}><strong>
                  <Button
                    plain
                    size="large"
                    alignSelf="start"
                    onClick={this.modalClosedHandler}
                    label="Back To Map"
                    icon={<NavigateBeforeIcon fontSize="large" />} /></strong></Heading>
              </Box>
              <Box flex={true} align='center' background='light-1' overflow='auto'>
                <Box flex={false} background='white'>
                  {modalInfo}
                  <Button alignSelf="center" margin="medium" onClick={this.modalClosedHandler} label="Back To Map" icon={<NavigateBeforeIcon />} />
                </Box>
              </Box>
            </Box>
          </Layer>)}
        <GoogleMapReact

          bootstrapURLKeys={{ key: process.env.REACT_APP_AUTH_TOKEN }}
          defaultCenter={this.props.location}
          defaultZoom={this.props.zoomLevel}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          {this.props.fridges.map(f => (
            <LocationPin
              lat={f.lat}
              lng={f.lng}
              fridgeData={f}
              showInfoBox={this.props.showInfoBox}
              toggleHover={this.props.toggleHover}
              hover={this.props.hover}
              onModalOpen={this.onModalOpen}
            />
          ))}
        </GoogleMapReact>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentFridge: state.currentFridge
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFridge: (fridgeID) => dispatch(actions.getFridge(fridgeID)),
    onFridgeConfirmed: (fridge) => dispatch(actions.confirmFridge(fridge)),
    onFridgeChecked: (data, fridge, image) => dispatch(actions.checkFridge(data, fridge, image)),
    getFridgeChecks: (id) => dispatch(actions.getFridgeChecks(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);