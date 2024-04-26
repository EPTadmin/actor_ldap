import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api/'

const AxiosInstance = axios.create({
    baseURL :baseUrl,
    // timeout:7000,
    headers:{
        "Content-Type" : "application/json",
        accept : "application/json"
    }

})

export default AxiosInstance
