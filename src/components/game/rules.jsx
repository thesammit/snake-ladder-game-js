import { rulesList } from "../../data/snake-ladder-data";
import GameSelectionSummary from "./game-selection-summary";

const Rules = () => {
    return (<div className="rules-container">
        <GameSelectionSummary>
            {rulesList.map((rule, index) => (
                <li key={index} className="rules-list-item">{rule}</li>
            ))}
        </GameSelectionSummary>
    </div>)
}

export default Rules;