import { ReactComponent as Dice1 } from '../../assets/dice-1.svg';
import { ReactComponent as Dice2 } from '../../assets/dice-2.svg';
import { ReactComponent as Dice3 } from '../../assets/dice-3.svg';
import { ReactComponent as Dice4 } from '../../assets/dice-4.svg';
import { ReactComponent as Dice5 } from '../../assets/dice-5.svg';
import { ReactComponent as Dice6 } from '../../assets/dice-6.svg';
import { ReactComponent as RollDice } from '../../assets/roll-dice.svg';

const DiceFactory = ({ diceNumber }) => {
    const styleObj = { width: '45px', height: '45px' };
    switch (diceNumber) {
        case 1: {
            return <Dice1 style={styleObj} stroke='#e6390e' />
        }
        case 2: {
            return <Dice2 style={styleObj} stroke='#000' />
        }
        case 3: {
            return <Dice3 style={styleObj} stroke='#000' />
        }
        case 4: {
            return <Dice4 style={styleObj} stroke='#000' />
        }
        case 5: {
            return <Dice5 style={styleObj} stroke='#000' />
        }
        case 6: {
            return <Dice6 style={styleObj} stroke='#000' />
        }
        case -1: {
            return <RollDice style={styleObj} />
        }
        default: {
            return <div style={{ width: '50px', fontSize: '20px' }}>Not rolled</div>
        }
    }

}

export default DiceFactory;