import * as actionTypes from './actionTypes';
import axios from '../../axios';
import Geocode from "react-geocode";


export const addFridgeSuccess = (id, data) => {
  return {
    type: actionTypes.ADD_FRIDGE,
    data: data
  }
};

export const orderFail = () => {

}
export const submitFridge = (submissionData) => {
  return dispatch => {
    let updatedData = submissionData;
  Geocode.setApiKey(process.env.REACT_APP_AUTH_TOKEN);
  let streetAddress = submissionData.streetAddress;
  let fullAddress = streetAddress.concat(" " , submissionData.borough, " NY");
  console.log(fullAddress)
  Geocode.fromAddress(fullAddress).then(response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    updatedData = {
      ...submissionData, 
      lat: lat,
      lng: lng
    }
    console.log('with coords', updatedData)
    axios.post('/fridges.json', updatedData)
      .then(response => {
        dispatch(addFridgeSuccess(response.data.name, updatedData));
      })
      .catch(error => {
        dispatch(fetchFridgeFail(error));
      });
    })
    .catch(error => {
      });
    axios.post('/fridges.json', updatedData)
      .then(response => {
        dispatch(addFridgeSuccess(response.data.name, updatedData));
      })
      .catch(error => {
        dispatch(fetchFridgeFail(error));
      });
    }
}

export const fetchFridgesStart = () => {
  return {
    type: actionTypes.FETCH_FRIDGE_START
  }
}

export const fetchFridgeFail = (error) => {
  return {
    type: actionTypes.FETCH_FRUEDGE_FAIL
  }
}

export const fetchFridgeSuccess = (fridges) => {
  return {
    type: actionTypes.LOAD_FRIDGES,
    data: fridges
  }
}
    
export const fetchFridges = () => {
  Geocode.setApiKey(process.env.REACT_APP_AUTH_TOKEN);
  return dispatch => {
    dispatch(fetchFridgesStart());
    axios.get('/fridges.json')
    .then(response => {
      const fetchedFridges = [];
      for (let key in response.data) {
        let f = response.data[key]
          console.log(f);
          fetchedFridges.push(f);
        }
      console.log(fetchedFridges)
      dispatch(fetchFridgeSuccess(fetchedFridges));
    })
    .catch(error => {
      
    });
  }
}
export const confirmFridge = (id) => {
  return {
    type: actionTypes.CONFIRM_FRIDGE,
    id: id
  }
}

