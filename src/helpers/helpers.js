import { gameConfig } from "../store/gameConfig";
export const checkGameSettingsToStartGame = (gameConfig) => {
  let { username, levelId, languageId, multiplayer, gameRoom } = gameConfig;
  if (multiplayer) {
    console.log("mp");
    console.log(gameConfig);

    let { status, id, slug } = gameConfig.gameRoom;
    if (status === 2 && id && slug && username && levelId && languageId) {
      return true;
    } else {
      return false;
    }
  } else {
    if (username && levelId && languageId) {
      return true;
    } else {
      return false;
    }
  }
};
export const getLastCharOfString = (string) => {
  return string.substr(-1).toUpperCase();
};

export const getLangById = (id) => {
  return gameConfig["SPEECH_LANGUAGES"].filter((lang) => lang.id == id)[0];
};
export const getLevelById = (id) => {
    return gameConfig["LEVELS"].filter((level) => level.id == id)[0];
  };
  export const getGameDurationByLevelId = (id) => {
    return gameConfig["GAME_DURATIONS_BY_LEVEL"].filter((level) => level.levelId == id)[0].duration;
  };
