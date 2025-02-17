import { useEffect } from "react";
import { getTimerFormatFromTime } from "../../util"
import { useAppContext } from "../app-context";

const TickerComponent = ({ timeValue, timeSetter, isDecreasing }) => {
    const {
        isTimerActive,
    } = useAppContext();

    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                timeSetter((time) => isDecreasing ? time - 1 : time + 1);
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    });

    return (<div className="timer-ticker">{getTimerFormatFromTime(timeValue)}</div>)
}

export default TickerComponent;