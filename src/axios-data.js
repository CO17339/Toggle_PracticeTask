import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://togglttrack-default-rtdb.firebaseio.com/'
});

export default instance;