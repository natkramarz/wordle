import "./App.css"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard";
import {createContext, useState, useEffect} from "react";
import { boardDefault, generateWordSet } from './Words';
import { useAlert } from "react-alert";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [correctWord, setCorrectWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.correctWord);
    })
  }, [])

  const onSelect = (keyVal) => {
    if (currAttempt.letterPos > 4 || currAttempt.attempt > 5) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return; 
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";

    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (!wordSet.has(currWord.toLowerCase())) {
      alert.show("Not in word list");
      return;
    }

    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      alert.success('You won!', {
        timeout: 2000,
      })
      return;
    }

    if (currAttempt.attempt === 5) {
      alert.error('You lost!', {
        timeout: 2000,
      })
    }
  }


  return (
    <div className="App">
      <nav>
        <h1>
          Wordle
        </h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelect, onEnter, onDelete, correctWord, wordSet, disabledLetters, setDisabledLetters}}>
        <div className="game">
        <Board />
        <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
