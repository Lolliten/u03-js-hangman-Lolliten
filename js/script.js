const hangmanImage = document.querySelector("#hangman-image");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const letterButtons = document.querySelectorAll(".letterButtons");
const messageBox = document.querySelector("#message");
const startBtn = document.querySelector("#startBtn");

//counts wrong guesses, max 6 and shows player
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

//getting words and hints from word-list.js
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; //manipulates the dom and writes a hint
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join(""); //split separates the word into array, map goes through array create where letter is guessed, join puts it togheter again
}

//gameover, can I move this? where is isVictory declared?
const gameOver = (isVictory) => {
    if (isVictory) {
        alert("You won!");
    } else {
        alert("You lost!");
    }

    setTimeout(() => {
    }, 300); //3 sek timeout
}

//checks if clicked letters are correct and pushes them to letter-space
const keyboardClick = (button, clickedLetter) => {
    let lowerCaseLetter = clickedLetter.toLowerCase();
    //checks if clickedLetter is exist on the currentWord
    if (currentWord.includes(lowerCaseLetter)) {
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            console.log(...currentWord);
            if (letter === lowerCaseLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });

        //the images get showed in specific order if wrong guess
    } else {
        wrongGuessCount++;
        hangmanImage.src = "images/h" + wrongGuessCount + ".png";
    }

    //disable clicked letters
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //if(gameOver or isVictory) true = button.enable;

    //checks if you guesses wrong more than 6 times then gameover
    if (wrongGuessCount === maxGuesses) gameOver(false);
    if (correctLetters.length === currentWord.lenght) gameOver(true);

}

//decides what happens when letter in keyboard is clicked
const initButtons = () => {
    letterButtons.forEach((letter) => {
        letter.addEventListener("click", e => { keyboardClick(letter, e.target.value) });
    })
}

const startGame = () => {
    hangmanImage.src = "images/h0.png";
    getRandomWord();
    initButtons();
}

startBtn.addEventListener("click", startGame); //Last thing O-H helped with, not ready!!


//Reset buttons
//console.log correctletter.lenght