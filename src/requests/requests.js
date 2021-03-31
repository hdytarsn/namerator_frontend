import {constants} from '../store/constants'

export const login = (credentials) => {
    return window.axios
        .post('/login', credentials)
        .then(({data}) => {
            return data;
        })
}
export const register = (credentials) => {
    return window.axios
        .post('/register', credentials)
        .then(({data}) => {
            return data;
        })
}

export const createRoomWithGameSettings = (gameSettings) => {
    return window.axios
        .post('/room/create',{gameSettings:JSON.stringify(gameSettings)})
        .then(({data}) => {
            console.log(data)
            return data;
        })
}

export const getRoomConfig = (slug) => {
    return window.axios
        .get(`/room/config/${slug}`)
        .then(({data}) => {
            return data;
        })
}

export const startGame = (slug) => {
    return window.axios
        .post('/game/start',{'slug':slug})
        .then(({data}) => {
            return data;
        })
}

export const gameAction = (slug,entryName,pastName) => {
    return window.axios
        .post('/game/action/create',{'slug':slug,'entryName':entryName,'pastName':pastName})
        .then(({data}) => {
            return data;
        })
}