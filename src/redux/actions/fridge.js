import * as actionTypes from './actionTypes';
import axios from '../../axios';
import Geocode from "react-geocode";

import firebase from '../../firebase';

var database = firebase.database();
let storage = firebase.storage();
export const addFridgeSuccess = (id, data) => {
  return {
    type: actionTypes.ADD_FRIDGE,
    data: data,
    id: id
  }
};

export const addFridgeStart = () => {
  return {
    type: actionTypes.ADD_FRIDGE_START
  }
}
export const submitFridge = (submissionData) => {
  return dispatch => {
  dispatch(addFridgeStart());
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
}
}

export const checkStart = () => {
  return {
    type: actionTypes.CHECK_START
  }
}
export const fetchFridgesStart = () => {
  return {
    type: actionTypes.FETCH_FRIDGE_START
  }
}

export const fetchFridgeFail = (error) => {
  return {
    type: actionTypes.FETCH_FRIDGE_FAIL
  }
}

export const fetchFridgeSuccess = (fridges) => {
  return {
    type: actionTypes.LOAD_FRIDGES,
    data: fridges
  }
}

export const getFridgeChecksSuccess = (checkData) => {
  return {
    type: actionTypes.GET_FRIDGE_CHECKS,
    data: checkData
  }
}

export const getFridgeSuccess = (fridge) => {
  return {
    type: actionTypes.GET_FRIDGE,
    data: fridge
  }
}
    
export const fetchFridges = () => {
  return dispatch => {
    dispatch(fetchFridgesStart());
    axios.get('/fridges.json')
    .then(response => {
      const fetchedFridges = [];
      for (let key in response.data) {
        fetchedFridges.push({
          ...response.data[key],
          id: key
        });
        }
      console.log(fetchedFridges)
      dispatch(fetchFridgeSuccess(fetchedFridges));
    })
    .catch(error => {
      
    });
  }
}

const formatRowDataIntoObjects = ([keys, ...rows]) => rows.map(row => {
  const rowObj = {};
  //const keysCamelCase = keys.map(camelCase);
  for (let i = 0, l = keys.length; i < l; i++) {
    if (row[i] && row[i] !== "") {
      rowObj[keys[i]] = row[i];
    }
  }
  return rowObj;
});

export const fetchSheet = () => {
  return dispatch => {fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1e9UYOdH8a006WOTL5hvGuzyTdpLfofVFig7X74ADv00/values/Sheet1?key=AIzaSyCOvDGXIuekFUUzSPh5l1940wCB657NudI`,
  ).then(response => {
    console.log(response);
    const json = response.json().then(res => {
      console.log('res', res);
      console.log(res);
    console.log('json formatted', formatRowDataIntoObjects(res.values));
    });
    
  }).catch(error => {
    });
  }
};

export const getFridge = (fridgeID) => {
  return dispatch => {
    let url = '/fridges/'.concat(fridgeID, '.json');
    axios.get(url)
    .then(response => {
      const fetchedFridge = {
        ...response.data,
        id: fridgeID
      }
      console.log(fetchedFridge)
      dispatch(getFridgeSuccess(fetchedFridge))
    }).catch(error=>{
      console.log(error);
    });
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
      snapshot => {},
      error => {
        console.log (error);
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

export const checkFridge = (data, fridge, image) => {
  
  let checkData = {
    name: data.name,
    notes: data.notes,
    date: JSON.stringify(new Date())
  }

  return dispatch => {
    dispatch(checkStart());
    let url = '/fridges/'.concat(fridge.id, '/checks.json');
    axios.post(url, checkData)
    .then(response => {
      console.log(response.data);
      dispatch(postCheckImage(fridge.id, response.data.name, image));
      dispatch(checkFridgeSuccess(response.data.name, checkData));
    });
  }
}

export const getFridgeChecks = (id) => {
  return dispatch => {
  let url = '/fridges/'.concat(id, '/checks.json');
  axios.get(url)
  .then (response =>{
    dispatch(getFridgeChecksSuccess(response.data));
  });
}
}



