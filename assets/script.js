const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
let score = 0;
let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";

function startGame() {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === targetColor); // Ensure the new color is different from the previous one

    targetColor = newColor; // Update the target color
    colorBox.style.backgroundColor = targetColor;
    colorOptionsContainer.innerHTML = "";

    let shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    shuffledColors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-option");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");
        button.onclick = () => checkGuess(color);
        colorOptionsContainer.appendChild(button);
    });

    gameStatus.textContent = "";
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        score++;
        scoreDisplay.textContent = score;
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        setTimeout(() => {
            startGame(); // Change to a new color after a correct guess
        }, 1000); // Wait a second before changing the color and restarting the game
    } else {
        score = 0; // Reset score if wrong
        scoreDisplay.textContent = score;
        gameStatus.textContent = "Wrong Guess, Try Again!";
        gameStatus.style.color = "red";
    }
}

newGameButton.addEventListener("click", startGame);

startGame();
