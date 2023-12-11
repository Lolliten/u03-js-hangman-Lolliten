const hangmanImage = document.querySelector("#hangman-image");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const letterButtons = document.querySelectorAll(".letterButtons");
const messageBox = document.querySelector("#message");
const startBtn = document.querySelector("#startBtn");



//Current word and correct letter is connected to the wrong guesses, max 6 wrong guesses, else gameover
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

//getting words and hints from word-list.js file
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; //manipulates the dom and writes a hint
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join(""); //split separates the word into array, map goes through array and creates a letter at right place, join puts it togheter again
}

//gameover funtion, disable button for pressed letter at keyboard, a
const gameOver = (isVictory) => {
    letterButtons.forEach((button) => {

        button.disabled = false;
        button.removeEventListener("click", keyboardClick); //this removes eventlistner when game is won or lost
    })
    //message that appears if game win or lost in new popup window
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
const keyboardClick = (e) => { //clickedLetter is e.currentTarget.value, and button is e.currentTarget
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

    //checks if you guesses wrong more than 6 times then gameover
    /*console.log(wrongGuessCount);
    console.log(maxGuesses);
    console.log(correctLetters);
    console.log(currentWord);*/
    if (wrongGuessCount === maxGuesses) gameOver(false);
    if (correctLetters.length === currentWord.length) gameOver(true);

}

//decides what happens when letter in keyboard is clicked
const initButtons = () => {
    letterButtons.forEach((letter) => {

        letter.addEventListener("click", keyboardClick);
    })
}
//Start game funtion, default picture and funtions called
const startGame = () => {
    hangmanImage.src = "images/h0.png";
    getRandomWord();
    initButtons();
}
//restart funtion, sets default picture, and resets game
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
}

//event listerner what happens when game starts and button is clicked
startBtn.addEventListener("click", startGame); 
