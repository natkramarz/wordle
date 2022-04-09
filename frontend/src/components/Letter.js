import React, { useContext, useEffect } from "react";
import {AppContext} from "../App"

function Letter({ letterPos, attemptVal }) {
    const {board, currAttempt, correctWord, disabledLetters, setDisabledLetters} = useContext(AppContext);
    
    const letter = board[attemptVal][letterPos].toUpperCase();
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

    useEffect (() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters([...disabledLetters, letter]);
        }
    }, [currAttempt.attempt])


    const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");
    
    return (<div className="letter" id={letterState}>
        {letter}
    </div>);
}

export default Letter;