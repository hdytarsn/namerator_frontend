import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import {login, register} from '../requests/requests'
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        user: null,
        game: {
            isGameStarted: false,
            settings: {
                username: null,
                levelId: null,
                languageId: null,
                multiplayer: null,
            },
            speech: {
                diagnosis: null,
                currentState: null,
            }
        },
    }, mutations: {
        setUserData(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
        },
        setSpeechData(state, speechData) {
            state.game.speech.diagnosis = speechData.diagnosis;
            state.game.speech.currentState = speechData.currentState;
        },
        setGameSettingsData(state, gameSettingsData) {
            state.game.settings = gameSettingsData;
        },
        clearUserData() {
            localStorage.removeItem('user')
            location.reload()
        }
    }, actions: {
        login({commit}, credentials) {
            return login(credentials).then(data => {
                commit('setUserData', data);
            })
        },
        register({commit}, credentials) {
            return register(credentials).then(data => {
                commit('setUserData', data);
            })
        },
        logout({commit}) {
            commit('clearUserData')
        }
    },
    getters: {
        isLogged: state => !!state.user
    }
})