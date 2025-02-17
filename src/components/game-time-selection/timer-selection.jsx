import { useState } from "react";
import { GAME_TIMERS, GAME_TYPE, PLAYER_TIMERS } from "../../data/snake-ladder-data";
import { useAppContext } from "../app-context";
import TimerSelector from "./timer-selector";

const TimerSelection = () => {
    const { gameType, gameTimer, playerTimer, setGameType, setGameTimer, setPlayerTimer } = useAppContext();
    const [isDisabledTimers, setDisabledTimers] = useState(true);

    const handleGameTimer = (timeValue) => {
        setGameTimer(timeValue);
    }

    const handlePlayerTimer = (timeValue) => {
        setPlayerTimer(timeValue);
    }

    const handleGameTypeChange = (event) => {
        const typeValue = event.target.value;
        if (typeValue === GAME_TYPE.unTimed) {
            setDisabledTimers(true);
            setGameTimer(0);
            setPlayerTimer(0);
        } else {
            setDisabledTimers(false);
            setGameTimer(GAME_TIMERS[0]);
        }
        setGameType(typeValue);
    }

    return (
        <>
            <h2 className="header-center">Game Timer Setting</h2>
            <div className="selector-container">
                <div className="timer-selector-container" >
                    <label htmlFor="game-type" className="timer-selector-label">Select Game Type</label>
                    <select className="timer-selector-select" id="game-type" value={gameType} onChange={handleGameTypeChange}>
                        <option value={GAME_TYPE.timed}>Timed Game</option>
                        <option value={GAME_TYPE.unTimed}>Un-timed Game</option>
                    </select>
                </div>
                <div className="timer-selector-container">
                    <TimerSelector
                        labelText="Game Timer"
                        timerValues={GAME_TIMERS}
                        timerId="game-timer-selector"
                        onSelection={handleGameTimer}
                        isDisabled={isDisabledTimers}
                        selectedValue={gameTimer}
                        shouldRemoveNone={!!gameTimer}
                    />
                </div>
                <div className="timer-selector-container">
                    <TimerSelector
                        labelText="Player Roll Timer"
                        timerValues={PLAYER_TIMERS}
                        timerId="player-roll-timer-selector"
                        onSelection={handlePlayerTimer}
                        isDisabled={isDisabledTimers}
                        selectedValue={playerTimer}
                    />
                </div>

            </div>
        </>
    )
}

export default TimerSelection;