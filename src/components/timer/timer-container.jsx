/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { GAME_TYPE } from "../../data/snake-ladder-data";
import { useAppContext } from "../app-context";
import TickerComponent from "./ticker";

const TimerContainer = ({ triggerEndGame }) => {
    const {
        gameType,
        setCurrentTimersValue,
        timeElapsed,
        setTimeElapsed,
        timeRemaining,
        setTimeRemaining,
    } = useAppContext();

    const handleSetElapsed = (timeValue) => {
        setTimeElapsed(timeValue);
    }

    const handleSetRemaining = (timeValue) => {
        setTimeRemaining(timeValue);
    }

    useEffect(() => {
        setCurrentTimersValue({
            timeElapsed, timeRemaining
        });
        if (gameType === GAME_TYPE.timed && timeRemaining === 0) triggerEndGame();
    }, [timeElapsed, timeRemaining])

    return (
        <>
            <div className="timer-header">Game</div>
            <div className="">
                <div className="timer-game-label">Time elapsed</div>
                <TickerComponent isDecreasing={false} timeValue={timeElapsed} timeSetter={handleSetElapsed} />
            </div>
            {gameType === GAME_TYPE.timed && (
                <div className="">
                    <div className="timer-game-label">Time Remaining</div>
                    <TickerComponent isDecreasing={true} timeValue={timeRemaining} timeSetter={handleSetRemaining} />
                </div>
            )}
        </>
    );
}

export default TimerContainer;