/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getPlayersMap, playerListOrderedKeys } from "../../data/snake-ladder-data";
import { getSelectedListCount } from "../../util";

const players = getPlayersMap();

const PlayerList = forwardRef(({ count, onSelectionAction }, ref) => {

    const [currentSelected, setCurrentSelected] = useState([]);

    useEffect(() => {
        let selectedList = [...currentSelected];
        const selectedCount = getSelectedListCount(selectedList);
        if (count > selectedCount) {
            selectedList = selectedList.map(player => ({ ...player, isDisabled: false }));
        } else if (count < selectedCount) {
            let counter = 0;
            selectedList = selectedList.map(player => {
                if (player.isSelected) counter++;
                if (counter > count) {
                    player.isDisabled = true;
                    player.isSelected = false;
                }
                return player;
            });
        } else {
            selectedList = getDisabledList(selectedList);
        }
        setCurrentSelected(selectedList);
    }, [count]);

    useEffect(() => {
        const playerDetailsList = playerListOrderedKeys.map(key => ({
            ...players[key],
            name: players[key].defaultName,
            isSelected: false,
            isDisabled: false,
            key,
        }));
        setCurrentSelected(playerDetailsList);
    }, []);

    const handleReset = () => {
        const selectedList = [...currentSelected].map(player => ({ ...player, name: players[player.key].defaultName, isSelected: false, isDisabled: false }));
        setCurrentSelected(selectedList);
    }

    useImperativeHandle(ref, () => ({
        reset: handleReset
    }));

    const getDisabledList = (selectedList) => {
        return selectedList.map(player => {
            if (!player.isSelected) player.isDisabled = true;
            return player;
        });
    }

    const handleCheckSelection = (playerDetails, isChecked) => {
        let selectedList = [...currentSelected];
        const updatedDetails = {
            ...playerDetails,
            isSelected: isChecked,
            name: !isChecked ? players[playerDetails.key].defaultName : playerDetails.name
        };
        selectedList = selectedList.map(player => player.key === playerDetails.key ? updatedDetails : player);
        const selectedCount = getSelectedListCount(selectedList);
        if (selectedCount === count) {
            selectedList = getDisabledList(selectedList);
        } else {
            selectedList = selectedList.map(player => ({ ...player, isDisabled: false }));
        }
        setCurrentSelected(selectedList);
    }

    const handleNameChange = (playerDetails, updatedName) => {
        let selectedList = [...currentSelected];
        const updatedDetails = { ...playerDetails, name: updatedName };
        selectedList = selectedList.map(player => player.key === playerDetails.key ? updatedDetails : player)
        setCurrentSelected(selectedList);
    }

    useEffect(() => {
        const selectedList = currentSelected
            .filter(player => player.isSelected)
            .map(player => ({
                name: player.name,
                key: player.key,
                boxNumber: -1
            }));

        onSelectionAction(selectedList);
    }, [currentSelected]);

    return (
        <div className="player-selector">
            <ul className="player-list">
                {currentSelected.map(playerDetails => {
                    return (
                        <li key={playerDetails.key} className="player-list-item">
                            <div className="left-selection">
                                <input
                                    className="player-checkbox"
                                    type="checkbox"
                                    id={`check-box-${playerDetails.dice.toLowerCase()}`}
                                    name={playerDetails.dice.toLowerCase()}
                                    disabled={playerDetails.isDisabled}
                                    checked={playerDetails.isSelected}
                                    value={playerDetails.dice.toLowerCase()}
                                    onChange={(e) => handleCheckSelection(playerDetails, e.target.checked)}
                                />
                            </div>
                            <div className="right-selection">
                                <label htmlFor={`check-box-${playerDetails.dice.toLowerCase()}`}>
                                    <div className="player-details">
                                        {!playerDetails.isSelected && <div className="player-name">
                                            {playerDetails.name}
                                        </div>}
                                        {playerDetails.isSelected && <div className="player-name-input">
                                            <input type="text" value={playerDetails.name}
                                                onChange={(e) => {
                                                    const { value: updatedName } = e.target;
                                                    if (updatedName !== playerDetails.name)
                                                        handleNameChange(playerDetails, updatedName)
                                                }} />
                                        </div>}
                                        <div className="player-piece-container">
                                            <div className="player-piece" style={{
                                                backgroundColor: `${playerDetails.color}`,
                                                border: `1px solid ${playerDetails.borderColor}`
                                            }}></div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
});

export default PlayerList;