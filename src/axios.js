import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nycfridge-1595334632389.firebaseio.com/',
});

export default instance;