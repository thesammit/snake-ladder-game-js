/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef, useState } from "react";
import { GAME_TYPE, getPlayersMap } from "../../data/snake-ladder-data";
import { createGameMessageElement, MessageType } from "../../util";
import { useAppContext } from "../app-context";
import Board from "../board/board";
import Square from "../board/square";
import TimerSelection from "../game-time-selection/timer-selection";
import Modal, { MODAL_KEYS } from "../modal/modal";
import AllPlayers from "../player-roll/all-players";
import PlayerRoll from "../player-roll/player-roll";
import PlayerSelection from "../player-selection/player-selection";
import Rules from "./rules";
import TimerContainer from "../timer/timer-container";
import GameSelectionSummary from "./game-selection-summary";
import ProgressBar from "./progress-bar";
import Alert, { ALERT_ELEM_KEYS } from "../alert/alert";

const players = getPlayersMap();
const NextMoveType = {
    SNAKE: 'Snake',
    LADDER: 'Ladder',
    NONE: 'None',
    BLOCKED: 'Blocked'
}

const Game = () => {
    const {
        selectedPlayers,
        setSelectedPlayers,
        gamePlayers,
        setGamePlayers,
        setGamePlayersValue,
        removeGamePlayersData,
        selectedPieces,
        setSelectedPieces,
        setSelectedCount,
        snakes,
        ladders,
        setGameType,
        gameTimer,
        setGameTimer,
        playerTimer,
        setPlayerTimer,
        removeGameTimersData,
        removeTempParamsData,
        removeCurrentTimersData,
        setTimerActive,
        setTimeElapsed,
        setTimeRemaining,
        globalAlerts,
    } = useAppContext();

    const progressRef = useRef();
    const [unusedPieces, setUnusedPieces] = useState([]);
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentDiceValue, setCurrentDiceValue] = useState(0);
    const [isDiceRolling, setDiceRolling] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [winner, setWinner] = useState(null);
    const [modalHeader, setModalHeader] = useState(null)
    const [modalBody, setModalBody] = useState(null);
    const [modalWidth, setModalWidth] = useState();

    useEffect(() => {
        if (selectedPlayers) {
            const selectedPieces = [];
            const currPlayers = [];
            selectedPlayers.forEach(player => {
                const { dice, color, borderColor } = players[player.key]
                selectedPieces.push({ dice, color, borderColor, key: player.key });
                currPlayers.push({ ...players[player.key], ...player });
            });

            setSelectedPieces(selectedPieces);
            setCurrentPlayers(currPlayers);
            if (gamePlayers) setCurrentPlayer(gamePlayers[0]);
            showRules();
        }
    }, [selectedPlayers]);

    useEffect(() => {
        if (gamePlayers && selectedPieces) {
            const waitingPlayerKeys = gamePlayers.filter(player => player.boxNumber === -1).map(player => player.key);
            const gamePlayersMap = gamePlayers.reduce((acc, gamePlayer) => {
                acc[gamePlayer.key] = gamePlayer;
                return acc;
            }, {})
            setUnusedPieces([...selectedPieces.filter(piece => waitingPlayerKeys.includes(piece.key))]);
            setCurrentPlayers((updatedCurrentPlayers) => [...updatedCurrentPlayers.map(currPlayer => ({
                ...currPlayer, boxNumber: gamePlayersMap[currPlayer.key].boxNumber
            }))]);
            const winner = gamePlayers.find(player => player.boxNumber === 100);
            if (winner) {
                setWinner(winner);
            }
        }
    }, [gamePlayers, selectedPieces]);

    const getDiceValue = () => {
        return Math.ceil(Math.random() * 6);
    }

    const getNextPlayer = () => {
        if (currentPlayer.index === gamePlayers.length - 1) {
            return gamePlayers[0];
        }
        return gamePlayers[currentPlayer.index + 1]
    }

    const checkIfSnakeOrLadder = (nextBoxNumber, currentBoxNumber) => {
        if (snakes[nextBoxNumber]) {
            return { type: NextMoveType.SNAKE, at: nextBoxNumber, gotoBox: snakes[nextBoxNumber] };
        }
        if (ladders[nextBoxNumber]) {
            return { type: NextMoveType.LADDER, at: nextBoxNumber, gotoBox: ladders[nextBoxNumber] };
        }
        if (nextBoxNumber > 100) {
            return { type: NextMoveType.BLOCKED, at: currentBoxNumber, gotoBox: currentBoxNumber };
        }
        return { type: NextMoveType.NONE, at: -1, gotoBox: nextBoxNumber };
    }

    const updateGamePlayerData = (diceValue) => {
        if (winner) {
            return;
        }
        progressRef?.current?.activateProgress();
        const currentPlayerDetails = gamePlayers.find(player => currentPlayer.key === player.key);
        let currentPlayerBoxNumber = currentPlayerDetails.boxNumber;
        if (currentPlayerBoxNumber === -1 && diceValue !== 1) {
            setCurrentPlayer(getNextPlayer());
        } else {
            if (diceValue === 1) {
                if (currentPlayerBoxNumber === -1) {
                    setModalHeader(`Game starts for you`);
                    currentPlayerBoxNumber = 0;
                } else {
                    setModalHeader(`Continue your move`);
                }
                setModalBody(createGameMessageElement({ playerName: currentPlayer.name, type: MessageType.START }))
                setModalWidth(400);
                openModal();
            }

            // show when snake bites and climbs ladder
            const { type, at, gotoBox } = checkIfSnakeOrLadder(currentPlayerBoxNumber + diceValue, currentPlayerBoxNumber);
            if (type === NextMoveType.SNAKE) {
                setModalHeader(`Bitten by snake at ${at}`);
                setModalBody(createGameMessageElement({
                    playerName: currentPlayer.name,
                    type: MessageType.SNAKE_BITE,
                    at, gotoBox, diceValue
                }));
                setModalWidth(400);
                openModal();
            }
            if (type === NextMoveType.LADDER) {
                setModalHeader(`Climbed up the ladder from ${at}`);
                setModalBody(createGameMessageElement({
                    playerName: currentPlayer.name,
                    type: MessageType.LADDER_CLIMB,
                    at, gotoBox, diceValue
                }));
                setModalWidth(400);
                openModal();
            }
            if (type === NextMoveType.BLOCKED) {
                setModalHeader(`Move not possible from ${at}`);
                setModalBody(createGameMessageElement({
                    playerName: currentPlayer.name,
                    type: MessageType.BLOCKED,
                    at
                }));
                setModalWidth(400);
                openModal();
            }
            currentPlayerDetails.boxNumber = gotoBox;
            setGamePlayers([...gamePlayers]);
            setGamePlayersValue(gamePlayers.map(gamePlayer => {
                const { name, key, boxNumber } = gamePlayer;
                return { name, key, boxNumber };
            }));
            if (gotoBox === 100) {
                setWinner(currentPlayer);
                return;
            }
            if (diceValue !== 1) {
                setCurrentPlayer(getNextPlayer());
            }
        }
    }

    const rollDice = () => {
        setDiceRolling(true);
        progressRef?.current?.deactivateProgress();
        progressRef?.current?.resetProgress();
        setTimeout(() => {
            const diceValue = getDiceValue();
            setCurrentDiceValue(diceValue);
            updateGamePlayerData(diceValue);
            setDiceRolling(false);
        }, 1200);
    }

    const resetTimers = ({ isRestart }) => {
        setTimeElapsed(0);
        setTimeRemaining(isRestart ? gameTimer * 60 : 0);
        removeCurrentTimersData();
    }

    const restartGame = () => {
        // restart same board with starting positions being changed
        const resetGamePlayers = [...gamePlayers.map(player => ({ ...player, boxNumber: -1 }))];
        setSelectedPlayers(resetGamePlayers);
        setGamePlayers(resetGamePlayers);
        setGamePlayersValue(resetGamePlayers.map(gamePlayer => {
            const { name, key, boxNumber } = gamePlayer;
            return { name, key, boxNumber };
        }));
        setCurrentDiceValue(0);
        setWinner(null);
        setTimerActive(false);
        resetTimers({ isRestart: true });
    }

    const endGame = () => {
        // End Game and decide Winner on time up
        setTimerActive(false);
        resetTimers({ isRestart: false });
        calculateEndTimeWinner();
    }

    const calculateEndTimeWinner = () => {
        const winner = gamePlayers.reduce((acc, player) => {
            const accBoxNum = acc.boxNumber || -1;
            return accBoxNum < player.boxNumber ? player : acc
        }, {})
        setWinner(winner);
    }

    const resetGame = () => {
        // reset the whole game to default
        setSelectedPlayers(null);
        setCurrentDiceValue(0);
        setWinner(null);
        setGameType(GAME_TYPE.unTimed);
        setGameTimer(0);
        setPlayerTimer(0);
        setTimerActive(false);
        removeGamePlayersData();
        removeGameTimersData();
        removeTempParamsData();
        resetTimers({ isRestart: false });
        setSelectedCount(2);
    }

    const closeModal = () => {
        setModalOpen(false);
        setTimerActive(true);
        progressRef?.current?.activateProgress();
        setModalWidth();
    }

    const openModal = () => {
        setTimerActive(false);
        progressRef?.current?.deactivateProgress();
        setModalOpen(true);
    }

    const showRules = () => {
        const rulesBody = <Rules />;
        setModalHeader('Rules of the game');
        setModalBody(rulesBody);
        openModal();
    }

    return (
        <>
            <div className="game" id="game">
                {!!globalAlerts.length && globalAlerts.map((alert) => (
                    <Alert key={alert.id} id={alert.id} type={alert.type} onClose={alert.onClose} showIcon={alert.showIcon} timeOutInSec={alert.timeOutInSec}>
                        <Fragment key={ALERT_ELEM_KEYS.EMPHASIZED}>{alert.header}</Fragment>
                        <Fragment key={ALERT_ELEM_KEYS.BODY}>{alert.msg}</Fragment>
                    </Alert>
                )
                )}
                {selectedPlayers && !!selectedPlayers.length && (
                    <>
                        <div className="players-container">
                            <div className="timer-container">
                                <TimerContainer triggerEndGame={endGame} />
                            </div>
                            {currentPlayers && <AllPlayers currentPlayers={currentPlayers} winner={winner} />}
                        </div>
                        <div className="board-container">
                            <Board />
                        </div>
                        <div className="board-bottom-container">
                            <div className="initial-piece-container">
                                <Square hideBorder={true} pieces={unusedPieces} isInboard={false} />
                            </div>
                            {currentPlayer &&
                                <PlayerRoll
                                    currentPlayer={currentPlayer}
                                    nextPlayer={getNextPlayer()}
                                    rollDice={rollDice}
                                    diceValue={currentDiceValue}
                                    winner={winner}
                                    isDiceRolling={isDiceRolling}
                                    restartGame={restartGame} />}
                        </div>
                        {playerTimer > 0 && <ProgressBar ref={progressRef} progressCompleteAction={rollDice} />}
                        <div className="end-container">
                            <button className="page-button reset-game" onClick={resetGame}> Reset players and restart </button>
                        </div>
                    </>
                )}
                {(!selectedPlayers || !selectedPlayers.length) && (
                    <>
                        <h1 className="header-center">Snake Ladder Game </h1>
                        <div className="selection-page">
                            <div className="selection-card">
                                <PlayerSelection />
                            </div>
                            <div className="selection-card">
                                <TimerSelection />
                            </div>
                        </div>
                        <div className="game-selection-summary">
                            <h2>Game Selection Summary</h2>
                            <GameSelectionSummary />
                        </div>
                    </>
                )}
            </div>
            <Modal showModal={isModalOpen} onClose={closeModal} contentWidth={modalWidth}>
                <Fragment key={MODAL_KEYS.HEADER}>
                    {modalHeader}
                </Fragment>
                <Fragment key={MODAL_KEYS.BODY}>
                    {modalBody}
                </Fragment>
                <Fragment key={MODAL_KEYS.FOOTER}>
                    <div className="footer-container">
                        <button className="rules-button" onClick={closeModal}>Ok</button>
                    </div>
                </Fragment>
            </Modal>
        </>

    )
}

export default Game;