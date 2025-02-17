import { addData } from "../util";

const masterData = {
    snakes: {},
    ladders: {}
}

export const GAME_TYPE = {
    timed: 'timed',
    unTimed: 'un-timed'
}

export const GAME_TIMERS = [2, 10, 15, 20, 30, 40, 60];
export const PLAYER_TIMERS = [0.1, 0.15, 0.25, 0.5, 1, 2];

const availablePlayers = {
    RED: { name: "", dice: "Red", color: "#E73A34", borderColor: "#DA0606", defaultName: "Player red" },
    BLUE: { name: "", dice: "Blue", color: "#0D3CDD", borderColor: "#002BB8", defaultName: "Player blue" },
    GREEN: { name: "", dice: "Green", color: "#38851A", borderColor: "#226F03", defaultName: "Player green" },
    YELLOW: { name: "", dice: "Yellow", color: "#EEB413", borderColor: "#C69100", defaultName: "Player yellow" },
}

export const playerListOrderedKeys = ['RED', 'BLUE', 'YELLOW', 'GREEN'];

const SNAKES = [
    [16, 6],
    [46, 25],
    [49, 11],
    [62, 19],
    [64, 60],
    [74, 53],
    [89, 68],
    [92, 88],
    [95, 75],
    [99, 80]
];

const LADDERS = [
    [2, 38],
    [7, 14],
    [8, 31],
    [15, 26],
    [21, 42],
    [28, 84],
    [36, 44],
    [51, 67],
    [71, 91],
    [78, 98],
    [87, 94]
]

const createLadders = (laddersArray) => {
    laddersArray.forEach(ladder => {
        const [start, end] = ladder;
        addData(masterData, start, end, 'ladders')
    });
}

const createSnakes = (snakesArray) => {
    snakesArray.forEach(snake => {
        const [start, end] = snake;
        addData(masterData, start, end, 'snakes')
    });
}

export const getMasterData = (type = null) => {
    if (type && (type === 'snakes' || type === 'ladders'))
        return masterData[type];
    return masterData;
}

export const populateData = () => {
    createLadders(LADDERS);
    createSnakes(SNAKES);
}

export const getPlayersMap = () => {
    return availablePlayers;
}

export const rulesList = [
    'Game starts for you, when Dice falls at 1',
    'Every time when Dice falls at 1, you will get an extra turn',
    'You will be getting extra turn for climbing ladder'
]