export const checkGameSettingsToStartGame = (gameConfig) => {
    let {username, levelId, languageId, multiplayer, gameRoom} = gameConfig;
    if (multiplayer) {
        console.log('mp');
        console.log(gameConfig);

        let {status, id, slug} = gameConfig.gameRoom;
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
}
export const getLastCharOfString = (string) => {
    return string.substr(-1).toUpperCase();
};