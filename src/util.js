export const create2D = (n) => {
    let max = n * n;
    let leftToRight = true;
    const arr = [];
    for (let i = 0; i < n; i++) {
        const innerArray = [];
        for (let j = 0; j < n; j++) {
            if (leftToRight) {
                innerArray.push(max);
            } else {
                innerArray.unshift(max);
            }
            max--;
        }
        leftToRight = !leftToRight;
        arr.push(innerArray);
    }
    return arr;
};

export const addData = (dataSet, start, end, type) => {
    dataSet[type][start] = end;
};

export const getSelectedListCount = (playerList) => {
    if (playerList.length === 0) return 0;
    return playerList.reduce((acc, plr) => {
        if (plr.isSelected) acc++;
        return acc;
    }, 0);
};
export const populateGamePlayers = (savedStoragePlayers) => {
    return savedStoragePlayers && savedStoragePlayers.map((player, index) => ({ ...player, index }))
};
export const MessageType = {
    START: 0,
    LADDER_CLIMB: 1,
    SNAKE_BITE: 2,
    BLOCKED: 3
}
export const createGameMessageElement = ({ playerName, at, gotoBox, diceValue, type }) => {
    if (type === MessageType.LADDER_CLIMB) {
        return (<span>
            <span className="bold">{playerName}</span>{' '}
            Climbed up the ladder from step <span className="bold">{at}</span> to step <span className="bold">{gotoBox}</span>.{' '}
            {diceValue === 1 && <>Next turn is yours, and you can continue with your moves.</>}
        </span>)
    }

    if (type === MessageType.SNAKE_BITE) {
        return (<span>
            <span className="bold">{playerName}</span>{' '}
            is bitten by snake at step <span className="bold">{at}</span>, have to go to step <span className="bold">{gotoBox}</span>.{' '}
            {diceValue === 1 && <>Next turn is yours, and you can continue with your moves.</>}
        </span>)
    }

    if (type === MessageType.START) {
        return (<span>
            <span className="bold">{playerName}</span>{' '}
            next turn is yours, and you can continue with your moves.
        </span>)
    }

    if (type === MessageType.BLOCKED) {
        return (<span>
            <span className="bold">{playerName}</span>{' '}
            you cannot move further from <span className="bold">{at}</span>, as next step falls beyond 100.
        </span>)
    }

    return (<></>);
}

export const getSummeryInitialMessage = (playerList, noOfPlayers) => {
    const length = playerList.length;
    const initialMessage = (<span>The game will be played between the Players </span>)
    const needsMorePlayerSelection = (<><span>The game will be played after</span> <span className="bold">{noOfPlayers - length} more</span> <span> {noOfPlayers - length > 1 ? 'players are' : 'player is'} selected</span></>)

    if (length === noOfPlayers) {
        return (
            <>
                {initialMessage}{' '}
                {getPlayerNames(playerList.map(player => player.name), length)}.
            </>
        )
    } else {
        return (
            <>
                {needsMorePlayerSelection}.
            </>
        )
    }
}

const getPlayerNames = (playerNames, length) => {
    switch (length) {
        case 3: {
            return (
                <>
                    <span className="bold">{playerNames[0]}</span>,{' '}
                    <span className="bold">{playerNames[1]}</span>{' '}and{' '}
                    <span className="bold">{playerNames[2]}</span>
                </>
            )
        }
        case 4: {
            return (
                <>
                    <span className="bold">{playerNames[0]}</span>,{' '}
                    <span className="bold">{playerNames[1]}</span>,{' '}
                    <span className="bold">{playerNames[2]}</span>{' '}and{' '}
                    <span className="bold">{playerNames[3]}</span>
                </>
            )
        }
        default: {
            return (
                <>
                    <span className="bold">{playerNames[0]}</span>{' '}and{' '}
                    <span className="bold">{playerNames[1]}</span>
                </>

            )
        }
    }
}

export const getTimerFormatFromTime = (timeInSeconds) => {
    let seconds = timeInSeconds;
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const mins = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${("0" + hours).slice(-2)}:${("0" + mins).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

export const pushAlert = (alertList, setGlobalAlert, { id, header, msg, showIcon, type, isOnClose, timeOutInSec }) => {
    alertList.push({ id, header, msg, showIcon, type, timeOutInSec });
    let newAlertList = alertList.map((anAlert,) => {
        if ((isOnClose || timeOutInSec) && anAlert.id === id) {
            anAlert.onClose = (removeID) => {
                setGlobalAlert((globalAlertList) => globalAlertList.filter(alert => alert.id !== removeID));
            }
        }
        return anAlert;
    });

    return newAlertList
}