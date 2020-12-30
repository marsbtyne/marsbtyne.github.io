import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Modal from 'react-modal';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { Box, Button } from 'grommet';

import config from '../config';

import { 
  fetchFridges,
  fetchFridgesJSON,
  setCurrentFridge,
  submitFridge,
  updateFridge
} from '../redux/actions/fridge';
import { getCurrentFridge } from '../redux/selectors'

import LocationPin from './LocationPin';
import FridgeModal from './UI/FridgeModal'
import Header from './UI/Header';
import FridgeForm from './FridgeForm';
import CheckFridge from './CheckFridge';
import InfoPage from './InfoPage';

import classes from '../containers/container.module.css'
import './map.css'

Modal.setAppElement('#root');
Modal.defaultStyles.content.maxWidth = '700px';
Modal.defaultStyles.content.margin = '0 auto'

class NewMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isInfoModalOpen: false,
      isSubmitModalOpen: false,
      isEditModalOpen: false,
      isChecking: false,
    }
  }
  componentDidMount() {
    this.props.fetchFridges();
  }

  openSubmissionModal = () => this.setState({ isSubmitModalOpen: true})
  
  openEditModal = () => {
    this.setState({isEditModalOpen: true});
    this.setState({isInfoModalOpen: false})
  }

  openModal = (id, event) => {
    this.props.setCurrentFridge( id)
    this.setState({ isInfoModalOpen: true})
  }

  downloadJSON = async () => {
    let response = await this.props.fetchFridgesJSON();
    console.log(response);
      // 2. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sample.json`);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode.removeChild(link);

}
  closeEditModal = () => {
    this.setState({
      isInfoModalOpen: true,
      isEditModalOpen: false
    })
  }
  
  closeModal = () => {
    this.setState({
      isInfoModalOpen: false,
      isSubmitModalOpen: false,
    })
  }

  fridgeAdded = (postData) => {
    this.props.submitFridge(postData);
  }

  updateFridge = (updateData) => {
    console.log(updateData);
    this.props.updateFridge(updateData, this.props.currentFridge.id);
  }

  checkFridge = () => {
    this.setState({isChecking: true});
  }

  submitCheck = () => {

  }


render () {
  let markers = this.props.fridges.map(f => {
    return <LocationPin
    key={f.id}
    lat={f.lat}
    lng={f.lng}
    fridgeData={f}
    showInfoBox={true}
    clickHandler={this.openModal}
  />
  });
  
  let modal;
  if (this.state.isEditModalOpen) {
    modal = (<CheckFridge fridgeData={this.props.currentFridge} />);
    
  } else {
    modal = (<FridgeModal fridgeData={this.props.currentFridge}/>)
}
  return (
  <div>
    <Header
      fridges={this.props.fridges}
      showInfoBox={true}
    />
    <Route path="/about" exact component={InfoPage} />
    <Route path="/" exact render = {() => ( <div className={classes.Container}>
      <Box justify="center" direction="row" pad="xsmall" gap="small">
        <Button primary label="Add Fridge" active onClick={this.openSubmissionModal} />
        </Box>
    <Modal
      isOpen={this.state.isSubmitModalOpen}
      onRequestClose={this.closeModal}
    >
      <FridgeForm
          onClose={this.closeModal}
          onSubmit={this.fridgeAdded}
          type="add"
    />
    </Modal>
    <Modal
      isOpen={this.state.isEditModalOpen}
      onRequestClose={this.closeEditModal}
      >
        <FridgeForm
        onClose={this.closeEditModal}
        onSubmit={this.updateFridge}
        type="edit"
        data={this.props.currentFridge}
      />
      </Modal>
    
  <Box className="google-map">
    <GoogleMapReact
    bootstrapURLKeys={{ key: config.google.apiKey }}
    defaultCenter={config.defaultCenter}
    defaultZoom={config.defaultZoom}
    yesIWantToUseGoogleMapApiInternals
    >
      {markers}
    </GoogleMapReact>
    <Modal
      isOpen={this.state.isInfoModalOpen}
      onRequestClose={this.closeModal}
    >
      <FridgeModal
        fridgeData={this.props.currentFridge}
        onClose={this.closeModal}
        submitCheck={this.submitCheck}
        editFridge={this.openEditModal}
      />
    </Modal>
    </Box>
    </div>)} />

  </div>
)

}
}
const mapStateToProps = state => {
  return {
    fridges: state.fridges,
    currentFridge: getCurrentFridge(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitFridge: (postData) => dispatch(submitFridge(postData)),
    updateFridge: (updateData, id) => dispatch(updateFridge(updateData, id)),
    fetchFridges: () => dispatch(fetchFridges()),
    fetchFridgesJSON: () => dispatch(fetchFridgesJSON()),
    setCurrentFridge: (fridgeID) => dispatch(setCurrentFridge(fridgeID)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewMap)