const CurrentPlayer = ({ playerName, isNext }) => {
    const playerNameDisplay = playerName.length > 30 ? `${playerName.substring(0, 30)}...` : playerName;
    return (
        <div className="roll-container">
            {isNext && <div className="roll-label">Next player: </div>}
            {!isNext && <div className="roll-label">Player to roll: </div>}
            <div id="player-name" className="roll-player" title={playerName}>{playerNameDisplay}</div>
        </div>
    )
}

export default CurrentPlayer;
