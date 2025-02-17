import { useAppContext } from "../app-context";
import Square from "./square"

const BoardRow = ({ rowIndex, boardSize, values }) => {
    const squares = [];
    const { selectedPieces } = useAppContext();
    for (let index = 0; index < boardSize; index++) {
        squares.push(
            <Square
                id={`${values[index]}`}
                key={`${rowIndex}${index}`}
                value={values[index]}
                displayValue={values[index].toString().padStart(2, 0)}
                pieces={selectedPieces}
                isInboard={true}
            />
        );
    }
    return (
        <div className="board-row">
            {squares.map(sq => sq)}
        </div>
    )
}

export default BoardRow;