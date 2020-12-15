import Geocode from "react-geocode";

import * as actionTypes from './actionTypes';
import axios from '../../axios';
// import { fetchFridges } from '../../svc';
import firebase from '../../firebase';
import config from '../../config'

var database = firebase.database();
let storage = firebase.storage();

/**
 * Generic action creator
 * @param {actionType enum} type 
 * @param {Object} data - action payload to pass to reducer
 */
export const createActionObj = (type, data = {}) => ({
  type, data
});

export const addFridgeSuccess = (id, data) => {
  return {
    type: actionTypes.ADD_FRIDGE,
    data: data,
    id: id
  }
};

export const setCurrentFridge = (fridgeID) => {
  return dispatch => {
    dispatch(createActionObj(actionTypes.SET_CURRENT, fridgeID));
  }
}

export const fetchFridges = () => {
  return async dispatch => {
    function onSuccess(response) {
      dispatch(createActionObj(actionTypes.LOAD_FRIDGES, response));
      return response;
    }
    dispatch(createActionObj(actionTypes.FETCH_FRIDGE_START));
    const fetchedFridges = [];
    try {
      const response = await axios.get('/fridges.json');
      for (let key in response.data) {
        fetchedFridges.push({
          ...response.data[key],
          id: key
        });
      }
      return onSuccess(fetchedFridges);
    } catch (error) {
      console.error('Data was not fetched.')
    }
  }
}

export const submitFridge = (submissionData) => {
  return async dispatch => {
    function onSuccess(response, data) {
      dispatch(addFridgeSuccess(response.data.name, data));
      return response;
    }
    function onError(error) {
      return error;
    }
    dispatch(createActionObj(actionTypes.ADD_FRIDGE_START));
    Geocode.setApiKey(config.google.apiKey);
    let updatedData = {};
    let streetAddress = submissionData.streetAddress;
    let fullAddress = streetAddress.concat(" ", submissionData.borough, " NY");
    try {
      const geocodeResponse = await Geocode.fromAddress(fullAddress);
      const { lat, lng } = geocodeResponse.results[0].geometry.location;
      updatedData = {
        ...submissionData,
        lat: lat,
        lng: lng
      }
      try {
        const response = await axios.post('/fridges.json', updatedData);
        return onSuccess(response, updatedData);
      } catch (error) {
        console.error("Could not submit to database");
      }
    } catch (error) {
      console.error("Could not fetch coordinates");
    }
  }
}

export const checkFridge = (data, fridge, image) => {
  return async dispatch => {
    function onSuccess(id, response, image, checkData) {
      console.log('success', response);
      if (image) {
        console.log('image', image)
        dispatch(postCheckImage(id, response.data.name, image))
      }
      dispatch(checkFridgeSuccess(response.data.name, checkData));
      return response;
    }
    dispatch(createActionObj(actionTypes.CHECK_START));
    try {
      let checkData = {
        name: data.name,
        notes: data.notes,
        date: JSON.stringify(new Date())
      }
      let url = '/fridges/'.concat(fridge.id, '/checks.json');
      const response = await axios.post(url, checkData)
      return onSuccess(fridge.id, response, image, checkData);
    } catch (error) {
      console.error("Could not post check")
    }
  }
}

export const getFridge = (fridgeID) => {
  return async dispatch => {
    function onSuccess(fetchedFridge) {
      dispatch(createActionObj(actionTypes.GET_FRIDGE, fetchedFridge))
    }
    let url = '/fridges/'.concat(fridgeID, '.json');
    try {
      const response = await axios.get(url);
      const fetchedFridge = {
        ...response.data,
        id: fridgeID
      }
      return onSuccess(fetchedFridge)
    } catch(error) {
        console.log(error);
  }
}
}

export const confirmFridge = (fridge) => {
  let data = {
    ...fridge,
    confirmed: true
  }
  return dispatch => {
    let url = '/fridges/'.concat(fridge.id, '.json');
    axios.put(url, data)
      .then(response => {
        console.log(response.data);
        dispatch(confirmFridgeSuccess(fridge.id));
      })
  }
}
export const confirmFridgeSuccess = (id) => {
  return {
    type: actionTypes.CONFIRM_FRIDGE,
    id: id
  }
};

export const checkFridgeSuccess = (checkID, checkData) => {
  return {
    type: actionTypes.CHECK_FRIDGE,
    data: checkData,
    id: checkID
  }
};

export const postCheckImageSuccess = (url, checkId) => {
  return {
    type: actionTypes.POST_CHECK_IMAGE,
    url: url,
    id: checkId
  }
}

export const postCheckImage = (fridgeId, checkId, image) => {

  return dispatch => {
    const uploadTask = storage.ref(`images/${fridgeId}/${checkId}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${fridgeId}/`)
          .child(checkId)
          .getDownloadURL()
          .then(url => {
            console.log('postCheckImage url', url);
            database.ref(`fridges/${fridgeId}/imageURL`).set(url);
            dispatch(postCheckImageSuccess(url, checkId));
          });
      }
    );
  };
};


export const getFridgeChecks = (id) => {
  return dispatch => {
    let url = '/fridges/'.concat(id, '/checks.json');
    axios.get(url)
      .then(response => {
        dispatch(createActionObj(actionTypes.GET_FRIDGE_CHECKS, response.data));
      });
  }
}



