import React, {useContext} from 'react';
import {AppContext} from "../App"

function Key({keyVal, bigKey, disabled}) {
    const {onEnter, onDelete, onSelect} = useContext(AppContext);
    
    const selectLetter = () => {
        switch (keyVal) {
            case "ENTER":
                onEnter();
                break;
            case "DELETE":
                onDelete();
                break;
            default:
                onSelect(keyVal);
        }
    }
    
    const classes = `key ${bigKey ? 'functional' : disabled && 'disabled'}`
    
    return (
        <div className={classes} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}

export default Key;