import axios from 'axios'
export const boardDefault = [["", "", "", "", ""], 
["", "", "", "", ""], 
["", "", "", "", ""],
["", "", "", "", ""], 
["", "", "", "", ""], 
["", "", "", "", ""]
];

export const generateWordSet = async () => {
    let correctWord; 
    let wordSet = new Set();
    await axios.get("http://localhost:8080/api/wordle")
    .then((response) => {
        correctWord = response.data.word;
        console.log(correctWord);
    })
    await axios.get("http://localhost:8080/api/wordle/all")
    .then((response) => {
        wordSet = new Set(response.data);
    })
    
    return {wordSet, correctWord};
}
