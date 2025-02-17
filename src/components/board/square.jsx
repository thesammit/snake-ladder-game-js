import { useAppContext } from "../app-context";

const piecePositionsPerCount = (count) => {
    const data = {
        1: [
            { marginTop: '17px', marginLeft: '17px' }
        ],
        2: [
            { marginTop: '5px', marginLeft: '5px' },
            { marginTop: '29px', marginLeft: '29px' }
        ],
        3: [
            { marginTop: '3px', marginLeft: '3px' },
            { marginTop: '17px', marginLeft: '17px' },
            { marginTop: '31px', marginLeft: '31px' }
        ],
        4: [
            { marginTop: '3px', marginLeft: '3px' },
            { marginTop: '31px', marginLeft: '31px' },
            { marginTop: '31px', marginLeft: '3px' },
            { marginTop: '3px', marginLeft: '31px' }
        ]
    }
    return data[count];
}

const Square = ({ value, displayValue, id, isInboard, pieces = [], hideBorder = false }) => {
    const { gamePlayers } = useAppContext();
    const getInGamePieces = () => {
        const piecesObj = pieces.reduce((acc, piece) => {
            acc[piece.key] = piece;
            return acc;
        }, {})
        const playerKeys = gamePlayers
            .filter(player => player.boxNumber === value)
            .map(filteredPlayer => filteredPlayer.key);
        return playerKeys.map(key => piecesObj[key]);
    }

    const getPieces = () => {
        const showablePieces = isInboard ? getInGamePieces() : pieces;
        const totalPieces = showablePieces.length;
        const pieceElements = [];
        const positions = piecePositionsPerCount(totalPieces);
        for (let i = 0; i < totalPieces; i++) {
            const { dice, color, borderColor } = showablePieces[i];
            const { marginTop, marginLeft } = positions[i];
            pieceElements.push(
                <div key={dice} className="piece"
                    style={{
                        backgroundColor: `${color}`,
                        border: `1px solid ${borderColor}`,
                        marginTop,
                        marginLeft
                    }}></div>
            )
        }
        return pieceElements;
    }
    return (
        <div id={id} className={`square${hideBorder ? ' no-border' : ''}`}>
            {pieces && pieces.length > 0 && getPieces()}
            {displayValue}
        </div >
    );
}

export default Square;