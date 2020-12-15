import Geocode from "react-geocode";
import axios from './axios';
import config from './config';

export const fetchFridges = async () =>  {
  const fetchedFridges = [];
    try {
      const response = await axios.get('/fridges.json');
      for (let key in response.data) {
        fetchedFridges.push({
          ...response.data[key],
          id: key
        });
      }
      return fetchedFridges;
    } catch (error) {
      console.error('Data was not fetched.')
    }
}

export const getFridge = async (fridgeID) => {
  let url = '/fridges/'.concat(fridgeID, '.json');
  let fetchedFridge;
  try {
    const response = await axios.get(url);
      fetchedFridge = {
        ...response.data,
        id: fridgeID
      }
      console.log(fetchedFridge)
    } catch (error) {
      console.log(error);
    };
  }

export const postFridge = async (submissionData) => {
  Geocode.setApiKey(config.google.apiKey);
  let updatedData = {};
  let streetAddress = submissionData.streetAddress;
  let fullAddress = streetAddress.concat(" " , submissionData.borough, " NY");

  try {
    const geocodeResponse =  await Geocode.fromAddress(fullAddress);
    const { lat, lng } = geocodeResponse.results[0].geometry.location;
    updatedData = {
      ...submissionData, 
      lat: lat,
      lng: lng
    }
  } catch (error) {
    console.error("Could not fetch coordinates");
  }
  try {
    const response = await axios.post('/fridges.json', updatedData);
  } catch (error) {
    console.error("Could not submit to database");
  }
}