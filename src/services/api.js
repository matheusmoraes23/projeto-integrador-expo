import axios from 'axios';

const  instance = axios.create({
    baseURL: 'http://127.1.1.1/8080/api'
})

export default instance;