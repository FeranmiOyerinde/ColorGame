const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let lastColor = ""; // Stores last color to avoid repetition

// Function to get a new color different from the previous one
function getNewColor(excludedColor) {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === excludedColor); // Ensure it's not the same as the last color
    return newColor;
}

// Function to start the game (New Game)
function startNewGame() {
    score = 0; // Reset score
    scoreDisplay.textContent = score;
    gameStatus.textContent = "Game Started! Choose a color.";
    gameStatus.style.color = "black";

    targetColor = getNewColor(""); // Get a completely new color
    lastColor = targetColor;
    updateGameUI();
}

// Function to update the game UI
function updateGameUI() {
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
}

// Function to check user's guess
function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        score++; // Increase score for correct answer
        scoreDisplay.textContent = score;
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";

        lastColor = targetColor; // Store last correct color
        targetColor = getNewColor(lastColor); // Get a new color different from the last one
        updateGameUI();
    } else {
        score = 0; // Reset score for wrong guess
        scoreDisplay.textContent = score;
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";

        lastColor = targetColor; // Store last failed color
        targetColor = getNewColor(lastColor); // Get a new color different from the last one
        updateGameUI();
    }
}

// Event listener for new game button
newGameButton.addEventListener("click", startNewGame);

// Start the game when the page loads
startNewGame();
