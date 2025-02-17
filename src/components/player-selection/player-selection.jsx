import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { populateGamePlayers, pushAlert } from "../../util";
import { ALERT_TYPE } from "../alert/alert";
import { useAppContext } from "../app-context";
import PlayerList from "./player-list";

const PlayerSelection = () => {
    const {
        selectedCount,
        setSelectedCount,
        setSelectedPlayers,
        setTempSelectedPlayers,
        setGamePlayers,
        globalAlerts,
        setGlobalAlerts,
        setGamePlayersValue,
        setGameTimersValue,
        setTempParamsValue,
        setCurrentTimersValue,
        gameTimer,
        setTimeRemaining,
        playerTimer,
        gameType,
    } = useAppContext();

    const childRef = useRef();
    const [selectedPlayersList, setSelectedPlayersList] = useState([]);

    const handleSelectionChange = (event) => {
        setSelectedCount(+event.target.value);
    }

    const getTimersData = () => {
        return {
            gameType,
            gameTimer,
            playerTimer
        }
    }

    const getTempData = () => {
        return {
            tempSelectedPlayers: selectedPlayersList,
            selectedCount
        }
    }

    const getCurrentTimerData = () => {
        return {
            timeElapsed: 0,
            timeRemaining: gameTimer * 60
        }
    }
    const setStorages = ({ selectedPlayersList, timersData, tempData, currentTimerData }) => {
        return setGamePlayersValue(selectedPlayersList)
            && setGameTimersValue(timersData)
            && setTempParamsValue(tempData)
            && setCurrentTimersValue(currentTimerData);
    }
    const handleStartGame = () => {
        if (selectedCount === selectedPlayersList.length) {
            if (setStorages({ selectedPlayersList, timersData: getTimersData(), tempData: getTempData(), currentTimerData: getCurrentTimerData() })) {
                setSelectedPlayers(selectedPlayersList);
                setGamePlayers(populateGamePlayers(selectedPlayersList));
                setTimeRemaining(gameTimer * 60);
            }
            else {
                const id = uuidv4();
                setGlobalAlerts(pushAlert(globalAlerts, setGlobalAlerts, {
                    id,
                    header: 'Storage failed!',
                    msg: 'Failed to save data in storage',
                    type: ALERT_TYPE.DANGER,
                    showIcon: true,
                    isOnClose: true,
                }));
            }
        } else {
            const id = uuidv4();
            setGlobalAlerts(pushAlert(globalAlerts, setGlobalAlerts, {
                id,
                header: 'Select all players.',
                msg: 'All players are not selected to start',
                type: ALERT_TYPE.WARNING,
                showIcon: true,
                timeOutInSec: 10,
            }));
        }
    }

    const resetSelection = () => {
        setSelectedCount(2);
        childRef.current.reset();
    }

    const handleOnSelection = (selectedList) => {
        setSelectedPlayersList(selectedList);
        setTempSelectedPlayers(selectedList);
    }

    return (
        <>
            <h2 className="header-center">Select Players</h2>
            <div className="count-selector">
                <label htmlFor="player-count" className="count-selector-label"> No of Players</label>
                <select className="count-selector-select" id="player-count" value={selectedCount} onChange={handleSelectionChange}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <PlayerList ref={childRef} count={selectedCount} onSelectionAction={handleOnSelection} />
            <div className="select-button-container">
                <button className="button-primary" onClick={handleStartGame}>Start Game</button>
                <button className="button-secondary" onClick={resetSelection}>Reset Selection</button>
            </div>
        </>
    )
}

export default PlayerSelection;