import axios from 'axios'

const baseUrl = '/api/'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const AxiosInstance = axios.create({
    baseURL :baseUrl,
    timeout:5000,
    headers:{
        "Content-Type" : "application/json",
        accept : "application/json"
    }

})

export default AxiosInstance
