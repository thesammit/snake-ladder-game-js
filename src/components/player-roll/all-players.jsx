const AllPlayers = ({ currentPlayers, winner }) => {
    const nameLimitedText = (text = '') => {
        return text.length > 15 ? `${text.substring(0, 15)}...` : text;
    }
    const getBoxNumber = (value) => {
        return value === -1 ? 'NA' : value;
    }
    return (
        <div className="player-container player-border">
            {currentPlayers.map((playerDetails, index) => (
                <div key={playerDetails.key} className={`player ${index !== currentPlayers.length - 1 ? 'border-right ' : ''}`}>
                    {winner && playerDetails.key === winner.key && <div className="winner-marker-text">Winner</div>}
                    <div className="player-name" title={playerDetails.name}>{nameLimitedText(playerDetails.name)}</div>
                    <div className={`player-piece player-current-value ${playerDetails.key.toLowerCase()}${winner && playerDetails.key === winner.key ? ' winner-marker' : ''}`} style={{
                        backgroundColor: `${playerDetails.color}`,
                        border: `1px solid ${playerDetails.borderColor}`
                    }}>{getBoxNumber(playerDetails.boxNumber)}</div>
                </div>)
            )}
        </div>
    )
}

export default AllPlayers;