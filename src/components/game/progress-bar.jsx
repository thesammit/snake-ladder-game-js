import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useAppContext } from "../app-context";

const ProgressBar = forwardRef(({ progressCompleteAction }, ref) => {
    const {
        playerTimer,
    } = useAppContext();

    const timeInMilliSeconds = playerTimer * 60 * 1000;
    const [isActive, setActive] = useState(false);
    const [progressValue, setProgressValue] = useState(0);

    const reset = () => {
        setProgressValue(0);
    }

    const deactivate = () => {
        setActive(false);
    }

    const activate = () => {
        setActive(true);
    }

    useImperativeHandle(ref, () => ({
        resetProgress: reset,
        deactivateProgress: deactivate,
        activateProgress: activate
    }));

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setProgressValue((value) => value + 1 / timeInMilliSeconds);
            }, 1);
            if (progressValue >= 1) {
                if (interval) clearInterval(interval);
                progressCompleteAction();
            }
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    });

    return (
        <div className="progress-container">
            <progress className="progress-bar" value={progressValue} />
        </div>
    );
});

export default ProgressBar;