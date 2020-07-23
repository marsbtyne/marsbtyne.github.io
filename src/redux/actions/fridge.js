import * as actionTypes from './actionTypes';
import axios from '../../axios';
import Geocode from "react-geocode";


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

export const orderFail = () => {

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
}

export const checkFridgeSuccess = (fridge) => {
  return {
    type: actionTypes.CHECK_FRIDGE,
    data: fridge
  }
}

export const checkFridge = (fridge) => {
  let data = {
    ...fridge,
    lastChecked: JSON.stringify(new Date())
  }
  return dispatch => {
    let url = '/fridges/'.concat(fridge.id, '.json');
    axios.put(url, data)
    .then(response => {
      console.log(response.data);
      dispatch(checkFridgeSuccess(data));
    });
  }
}

