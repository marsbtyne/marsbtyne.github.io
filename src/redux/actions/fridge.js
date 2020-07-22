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
    axios.post('/fridges.json', submissionData)
      .then(response => {
        dispatch(addFridgeSuccess(response.data.name, submissionData));
      })
      .catch(error => {
        dispatch(orderFail(error));
      });
    }
}

export const fetchFridgesStart = () => {
  return {
    type: actionTypes.FETCH_FRIDGE_START
  }
}

export const fetchFridgeFail = (error) => {

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
        let streetAddress = f.streetAddress;
        let fullAddress = streetAddress.concat(" " , f.borough, " NY");
        console.log(streetAddress);
        Geocode.fromAddress(fullAddress).then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          f.lat = lat;
          f.lng = lng;
          f.id = key;
          },
        )
          .catch(error => {
            console.error(error);
          });
          console.log(f);
          fetchedFridges.push(f);
        }
      console.log(fetchedFridges)
      dispatch(fetchFridgeSuccess(fetchedFridges));
    })
    .catch(error => {
      dispatch(fetchFridgeFail(error));
    });
  }
}
export const confirmFridge = (id) => {
  return {
    type: actionTypes.CONFIRM_FRIDGE,
    id: id
  }
}

