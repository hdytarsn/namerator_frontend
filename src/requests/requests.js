import axios from 'axios'
import {constants} from '../store/constants'

axios.defaults.baseURL = constants.API_BASE_URL;

export const login = (credentials) => {
    return axios
        .post('/login', credentials)
        .then(({data}) => {
            return data;
        })
}
export const register = (credentials) => {
    return axios
        .post('/register', credentials)
        .then(({data}) => {
            return data;
        })
}

export const createRoomWithGameSettings = (gameSettings) => {
    return axios
        .post('/room/create',{gameSettings:JSON.stringify(gameSettings)})
        .then(({data}) => {
            console.log(data)
            return data;
        })
}

export const getRoomConfig = (slug) => {
    return axios
        .get(`/room/config/${slug}`)
        .then(({data}) => {
            return data;
        })
}