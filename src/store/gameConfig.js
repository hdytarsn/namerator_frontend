export const gameConfig = Object.freeze({
    LEVELS: [
        {
            id: 1,
            name: "Çaylak",
            img: "/img/icons/level1.png"
        },
        {
            id: 2,
            name: "Amatör",
            img: "/img/icons/level2.png"
        },
        {
            id: 3,
            name: "Usta",
            img: "/img/icons/level3.png"
        },
        {
            id: 4,
            name: "Uzman",
            img: "/img/icons/level4.png"
        },
    ],
    SPEECH_LANGUAGES: [
        {
            id: 1,
            name: "Türkçe",
            short: "tr",
            img: "/img/icons/tr.png"
        },
        {
            id: 2,
            name: "İngilizce",
            short: "en",
            img: "/img/icons/us.png"
        },
    ],
    GAME_DURATIONS_BY_LEVEL: [
        {
            levelId: 1,
            duration: 12,
        },
        {
            levelId: 2,
            duration: 10,
        },
        {
            levelId: 3,
            duration: 8,
        },
        {
            levelId: 4,
            duration: 6,
        },
    ]
});