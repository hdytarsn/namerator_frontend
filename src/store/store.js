import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  login,
  register,
  getRoomConfig,
  startGame,
  gameAction
} from "../requests/requests";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    user: null,
    game: {
      settings: {
        username: "",
        levelId: 1,
        languageId: 1,
      },
      room: {
        isMultiplayer: false,
        isGameStarted: false,
        isGamePaused: false,
        round: 1,
        status: 0, //for wait while room created by backend
        id: null,
        slug: null,
        created_by: null,
      },
      active: {
        users: [],
        activePlayerIndex: 0,
        activeNameEntry: "",
        gameActions: [],
      },
      speech: {
        lastActiveName: "",
        diagnosis: "",
        currentState: "",
      },
    },
  },
  mutations: {
    //auth mutations
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
    clearUserData() {
      localStorage.removeItem("user");
      location.reload();
    },
    //game mutations
    setGameUser(state, user) {
      user.point = 0; //set every new user game point to 0
      state.game.active.users.indexOf(user) === -1 ? state.game.active.users.push(user) : console.log("This user already exists");
    },
    removeGameUser(state, user) {
      let index = state.game.active.users
        .map(function(user) {
          return user.id;
        })
        .indexOf(user.id);
      state.game.active.users.splice(index, 1);
    },
    sortUsers(state) {
      state.game.active.users.sort(function(a, b) {
        return a.id - b.id || a.name.localeCompare(b.name);
      });
    },
    setGameRoomConfigIfKeyExist(state, gameConfig) {
      Object.keys(state.game.room).forEach((key) => {
        gameConfig.hasOwnProperty(key)
          ? (state.game.room[key] = gameConfig[key])
          : "";
      });
    },
    setGameSettingsIfKeyExist(state, gameSettings) {
      Object.keys(state.game.settings).forEach((key) => {
        gameSettings.hasOwnProperty(key)
          ? (state.game.settings[key] = gameSettings[key])
          : "";
      });
    },

    isStartGame(state, bool) {
      state.game.room.isGameStarted = bool;
    },
    isPauseGame(state, bool) {
      state.game.room.isGamePaused = bool;
    },

    setSpeechData(state, speechData) {
      state.game.speech.diagnosis = speechData.diagnosis;
      state.game.speech.currentState = speechData.currentState;
    },
    setGameSettingsData(state, gameSettingsData) {
      state.game.settings = gameSettingsData;
    },

    setGameActioData(state, gameAction) {
      console.log(gameAction);
      gameAction.action_result.point == 30
        ? (state.game.speech.lastActiveName = gameAction.action_result.name)
        : "";
      state.game.room.isGamePaused = false;
      state.game.active.users.filter((user) => user.id == gameAction.action_result.user_id)[0].point+=gameAction.action_result.point;
      state.game.active.gameActions.push(gameAction);
    },
    increaseActivePlayerIndex(state) {
      state.game.active.activePlayerIndex++;
    },
    resetPlayerIndex(state) {
      state.game.active.activePlayerIndex = 0;
    },
  },

  actions: {
    //auth actions
    login({ commit }, credentials) {
      return login(credentials).then((data) => {
        commit("setUserData", data);
      });
    },
    register({ commit }, credentials) {
      return register(credentials).then((data) => {
        commit("setUserData", data);
      });
    },
    logout({ commit }) {
      commit("clearUserData");
    },
    //game actions
    startTheGameForEveryOne({ commit }, roomSlug) {
      return startGame(roomSlug).then((data) => {
        commit("isStartGame", true);
      });
    },
    getRoomConfigByRoomSlug({ commit }, roomSlug) {
      return getRoomConfig(roomSlug).then((data) => {
        commit("setGameRoomConfigIfKeyExist", data.config);
        commit("setGameSettingsIfKeyExist", data.config);
      });
    },
    setGameUserWithSorting({ commit }, user) {
      commit("setGameUser", user);
      commit("sortUsers");
    },
    removeGameUserWithSorting({ commit }, user) {
      commit("removeGameUser", user);
      commit("sortUsers");
    },
    makeNewGameAction({state}) {
        return gameAction(state.game.room.slug, state.game.speech.diagnosis, state.game.speech.lastActiveName).then((data) => {
        state.game.speech.diagnosis="";
        state.game.speech.currentState="";
      })
    },
  },

  getters: {
    isLogged: (state) => !!state.user,
    userToken: (state) => state.user.token,
    authUser: (state) => state.user.user,

    speech: (state) => state.game.speech,

    gameSettings: (state) => state.game.settings,
    gameRoom: (state) => state.game.room,
    gameRoomHosterId: (state) => state.game.room.created_by,
    activeGame: (state) => state.game.active,
    gameActions: (state) => state.game.active.gameActions,

    gameUsers: (state) => state.game.active.users,
    activeGamePlayerIndex: (state) => state.game.active.activePlayerIndex,
    activeGamePlayer: (state) =>
      state.game.active.users[state.game.active.activePlayerIndex],
    
  },
});
