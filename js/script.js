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
    letterButtons.forEach((button) => {

        button.disabled = false;
        button.removeEventListener("click", keyboardClick); //removes eventlistner when game is over
    })
    setTimeout(() => {
        if (isVictory) {
            alert("You won! \n\nTo play again press Start Game!");
            restart();
        } else {
            alert("You lost! \n\nTo play again press Start Game!");
            restart();
        }
    }, 1000); //1 sek timeout before win or lose message

}

//checks if clicked letters are correct and pushes them to letter-space
const keyboardClick = (e) => { //clickedLetter e.currentTarget.value, button e.currentTarget
    const button = e.currentTarget;
    const clickedLetter = e.currentTarget.value;

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
    console.log(wrongGuessCount);
    console.log(maxGuesses);
    console.log(correctLetters);
    console.log(currentWord);
    if (wrongGuessCount === maxGuesses) gameOver(false);
    if (correctLetters.length === currentWord.length) gameOver(true);

}

//decides what happens when letter in keyboard is clicked
const initButtons = () => {
    letterButtons.forEach((letter) => {

        letter.addEventListener("click", keyboardClick);
    })
}

const startGame = () => {
    hangmanImage.src = "images/h0.png";
    getRandomWord();
    initButtons();
}

const restart = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = "images/h4.png";
    wordDisplay.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        wordDisplay.innerHTML += `<li class="letter"></li>`;

    }
    document.querySelector(".hint-text b").innerText = "";
} //Also reset currentWord 
//Take restart function and game over copy to old version



startBtn.addEventListener("click", startGame); //Last thing O-H helped with, not ready!!



//Reset buttons
//console.log correctletter.lenght