import { createContext, useContext, useState } from "react";
import { GAME_TYPE } from "../data/snake-ladder-data";
import { useSessionStorage } from "../hooks/use-web-storage";
import { populateGamePlayers } from "../util";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider = ({ children, data }) => {
    const [getGamePlayersValue, setGamePlayersValue, removeGamePlayersData] = useSessionStorage('SNL_GAME_PLAYERS');
    const [getGameTimersValue, setGameTimersValue, removeGameTimersData] = useSessionStorage('SNL_GAME_TIMERS');
    const [getCurrentTimersValue, setCurrentTimersValue, removeCurrentTimersData] = useSessionStorage('SNL_CURRENT_TIMERS');
    const [getTempParamsValue, setTempParamsValue, removeTempParamsData] = useSessionStorage('SNL_TEMP_PARAMS');

    const savedStoragePlayers = getGamePlayersValue();
    const tempStorageParams = getTempParamsValue();
    const gameTimersValue = getGameTimersValue();
    const currentTimersValue = getCurrentTimersValue();

    const [globalAlerts, setGlobalAlerts] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState(savedStoragePlayers);
    const [tempSelectedPlayers, setTempSelectedPlayers] = useState((tempStorageParams && tempStorageParams.tempSelectedPlayers) || []);
    const [gamePlayers, setGamePlayers] = useState(populateGamePlayers(savedStoragePlayers));
    const [selectedPieces, setSelectedPieces] = useState(null);
    const [gameTimer, setGameTimer] = useState((gameTimersValue && gameTimersValue.gameTimer) || 0);
    const [playerTimer, setPlayerTimer] = useState((gameTimersValue && gameTimersValue.playerTimer) || 0);
    const [gameType, setGameType] = useState((gameTimersValue && gameTimersValue.gameType) || GAME_TYPE.unTimed);
    const [selectedCount, setSelectedCount] = useState((tempStorageParams && tempStorageParams.selectedCount) || 2);
    const [timeElapsed, setTimeElapsed] = useState((currentTimersValue && currentTimersValue.timeElapsed) || 0);
    const [timeRemaining, setTimeRemaining] = useState((currentTimersValue && currentTimersValue.timeRemaining) || 0);
    const [isTimerActive, setTimerActive] = useState(false);

    const value = {
        snakes: data.snakes,
        ladders: data.ladders,
        gamePlayers,
        setGamePlayers,
        selectedPlayers,
        setSelectedPlayers,
        globalAlerts,
        setGlobalAlerts,
        selectedPieces,
        setSelectedPieces,
        getGamePlayersValue,
        setGamePlayersValue,
        removeGamePlayersData,
        gameTimer,
        setGameTimer,
        playerTimer,
        setPlayerTimer,
        gameType,
        setGameType,
        tempSelectedPlayers,
        setTempSelectedPlayers,
        selectedCount,
        setSelectedCount,
        getGameTimersValue,
        setGameTimersValue,
        removeGameTimersData,
        getTempParamsValue,
        setTempParamsValue,
        removeTempParamsData,
        getCurrentTimersValue,
        setCurrentTimersValue,
        removeCurrentTimersData,
        timeElapsed,
        setTimeElapsed,
        timeRemaining,
        setTimeRemaining,
        isTimerActive,
        setTimerActive,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}