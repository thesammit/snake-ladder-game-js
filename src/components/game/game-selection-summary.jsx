import { GAME_TYPE } from "../../data/snake-ladder-data";
import { getSummeryInitialMessage } from "../../util"
import { useAppContext } from "../app-context";

const GameSelectionSummary = ({ children }) => {
    const {
        gameTimer,
        playerTimer,
        gameType,
        tempSelectedPlayers,
        selectedCount,
    } = useAppContext();

    const getTimeDisplay = (time) => {
        if (time === 1) return '1 Minute';
        if (time < 1) return `${time * 60} Seconds`;
        return `${time} Minutes`;
    }

    return (
        <>
            <article className="game-summary">
                <ol>
                    <li>{getSummeryInitialMessage(tempSelectedPlayers, selectedCount)}</li>
                    {tempSelectedPlayers.length > 0 && (<li>Below Players have selected following pieces:</li>)}
                    {tempSelectedPlayers.length > 0 && (<ul>
                        {tempSelectedPlayers.map(tempPlayer => (
                            <li key={tempPlayer.key}>
                                <span className="bold">{tempPlayer.name}</span> with {tempPlayer.key} piece
                            </li>
                        ))}
                    </ul>)}
                    <li>This will be {gameType === GAME_TYPE.timed ? 'a timed' : 'an un-timed'} game.</li>
                    {gameType === GAME_TYPE.unTimed && <li>The game will end, only when a player reaches <span className="bold">step 100</span>.</li>}
                    {gameType === GAME_TYPE.timed &&
                        <li>Total time for the game is selected as <span className="bold">{getTimeDisplay(gameTimer)}</span></li>
                    }
                    {gameType === GAME_TYPE.timed &&
                        <li>Player positioned at the highest step after <span className="bold">{getTimeDisplay(gameTimer)}</span> will be declared winner.</li>}
                    {gameType === GAME_TYPE.timed && playerTimer !== 0 &&
                        <li>Maximum time for each player to roll dice is selected as <span className="bold">{getTimeDisplay(playerTimer)}</span>. After that the dice will be automatically rolled</li>
                    }
                    {gameType === GAME_TYPE.timed && playerTimer === 0 &&
                        <li>Each player can roll dice with as much time as they want.</li>
                    }
                    {children}
                </ol>
            </article>
        </>
    )
}

export default GameSelectionSummary;