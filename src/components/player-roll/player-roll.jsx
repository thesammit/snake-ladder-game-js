import CurrentPlayer from "./current-player";
import DiceFactory from "./dice-factory";

const PlayerRoll = ({ currentPlayer, nextPlayer, winner, diceValue, rollDice, isDiceRolling, restartGame }) => {
    return (
        <div className="player-roll-container">
            {!winner && diceValue !== 0 && <div className="roll-container">
                <div className="roll-label">Last roll:</div>
                <DiceFactory id="last-rolled-dice" diceNumber={diceValue} />
            </div>}
            <div className="roll-dice-container">
                {winner && <div className="game-end">
                    <label htmlFor="restart-game" className="end-label">Game Ended!</label>
                    <button id="restart-game" className="restart-button" onClick={restartGame}>Restart Game</button>
                </div>}
                {!winner && <>
                    <label htmlFor="roll-dice" className="roll-label">Roll</label>
                    <button id="roll-dice" disabled={isDiceRolling} className={`roll-dice-button${isDiceRolling ? ' rolling' : ''}`} onClick={rollDice}><DiceFactory diceNumber={-1} /></button>
                </>}
            </div>
            {!winner && <CurrentPlayer playerName={currentPlayer.name} isNext={false} />}
            {!winner && <CurrentPlayer playerName={nextPlayer.name} isNext={true} />}
        </div>
    )
}

export default PlayerRoll;