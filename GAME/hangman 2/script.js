const wordInput = document.getElementById("word-input");
const submitWordButton = document.getElementById("submit-word");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letter");
const figureParts = document.getElementsByClassName("figure_parts");
const popupContainer = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playButton = document.getElementById("play-button");
const notification = document.getElementById("notification-container");

let wordSelected = "";
let correctLetters = [];
let wrongLetters = [];

submitWordButton.addEventListener("click", () => {
    wordSelected = wordInput.value.toLowerCase();
    wordInput.value = "";
    wordInput.disabled = true;
    submitWordButton.disabled = true;
    guessInput.disabled = false;
    guessButton.disabled = false;
    displayWord();
});

guessButton.addEventListener("click", () => {
    let letter = guessInput.value.toLowerCase();
    guessInput.value = "";
    if (letter.length === 1 && letter.match(/[a-z]/i)) {
        if (wordSelected.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification("You entered this letter");
            }
        } else if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            showWrongLetters();
        } else {
            showNotification("You entered this letter");
        }
    } else {
        showNotification("Enter a valid letter");
    }
    finishedGame();
});

function displayWord() {
    wordEl.innerHTML = `
        ${wordSelected.split('').map(letter =>
        `<span class="letter">
             ${correctLetters.includes(letter) ? letter : ''}
            </span>`).join('')
    }`;
}

function showWrongLetters() {
    wrongLettersEl.innerHTML = ''; // clear the container
    wrongLetters.forEach((letter) => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.style.fontSize = '25px'; // adjust font size
      wrongLettersEl.appendChild(letterSpan);
    });
    // update the figure parts display
    let num = wrongLetters.length;
    [...figureParts].forEach((part, index) => {
      if (index < num) {
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    });
  }

function finishedGame() {
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === wordSelected) {
        popupContainer.style.display = "flex";
        finalMessage.innerHTML = "You won!";
    } else if (wrongLetters.length === figureParts.length) {
        popupContainer.style.display = "flex";
        finalMessage.innerHTML = "OOPS, you lost!";
    }
}

function showNotification(message) {
    notification.innerHTML = `<h2>${message}</h2>`;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

playButton.addEventListener("click", () => {
    wordInput.disabled = false;
    submitWordButton.disabled = false;
    guessInput.disabled = true;
    guessButton.disabled = true;
    popupContainer.style.display = "none";
    wordEl.innerHTML = "";
    wrongLettersEl.innerHTML = "";
    correctLetters = [];
    wrongLetters = [];
    [...figureParts].forEach(part => {
        part.style.display = 'none';
    });
});