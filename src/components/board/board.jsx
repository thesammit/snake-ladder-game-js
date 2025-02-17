import BoardRow from './board-row';
import { create2D } from '../../util'
import { ReactComponent as SnakeLadder } from '../../assets/snake-ladder.svg';

const boardSize = 10;

const Board = () => {
    const values = create2D(boardSize);
    const boardRows = [];
    for (let index = 0; index < boardSize; index++) {
        boardRows.push(<BoardRow key={`r${index}`} rowIndex={index} boardSize={boardSize} values={values[index]} />);
    }

    return (
        <div className='board'>
            <div className='svg-overlay'>
                <SnakeLadder />
            </div>
            {boardRows.map(sq => sq)}
        </div>
    )
}

export default Board;