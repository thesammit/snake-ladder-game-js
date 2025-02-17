import { useEffect, useState } from "react";

const TimerSelector = ({ labelText, selectedValue, timerValues, timerId, isDisabled, onSelection, shouldRemoveNone }) => {
    const [selectedTimeInMin, setSelectedTimeInMin] = useState(selectedValue);

    useEffect(() => {
        setSelectedTimeInMin(selectedValue);
    }, [selectedValue])

    const handleSelectionChange = (event) => {
        setSelectedTimeInMin(+event.target.value);
        onSelection(+event.target.value);
    }

    const getTimeDisplay = (time) => {
        if (time === 1) return '1 Min';
        if (time < 1) return `${time * 60} Sec`;
        return `${time} Mins`;
    }

    return (
        <>
            <label htmlFor={timerId} className="timer-selector-label">{labelText}</label>
            <select disabled={isDisabled} className="timer-selector-select" id={timerId} value={`${selectedTimeInMin}`} onChange={handleSelectionChange}>
                {!shouldRemoveNone && <option value={0}>None</option>}
                {timerValues.map((time, idx) => (
                    <option key={idx} value={time}>{getTimeDisplay(time)}</option>
                ))}
            </select>
        </>
    );
}

export default TimerSelector;