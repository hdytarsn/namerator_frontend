export const checkGameSettingsToStartGame = (gameConfig) => {
    let {username, levelId, languageId, multiplayer} = gameConfig;
    if (multiplayer) {
    } else {
        if (username && levelId && languageId) {
            return true;
        }else
        {
            return false;
        }
    }
}
export const getLastCharOfString = (string) => {
    return string.substr(-1).toUpperCase();
};