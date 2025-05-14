
document.getElementById("heads-btn").addEventListener("click", () => playGame("Heads"));
document.getElementById("tails-btn").addEventListener("click", () => playGame("Tails"));
document.getElementById("reset-btn").addEventListener("click", resetGame);


function playGame(playerGuess) {
    const coinFlip = Math.random() < 0.5 ? "Heads" : "Tails";
    const gameResult = playerGuess === coinFlip ? "Win" : "Loss";

    document.getElementById("player-guess").textContent = `Your Guess: ${playerGuess}`;
    document.getElementById("coin-result").textContent = `Coin Flip Result: ${coinFlip}`;
    document.getElementById("game-result").textContent = `Game Result: ${gameResult}`;

    if (gameResult === "Win") {
        document.body.style.backgroundColor = "#89F336"; 
        document.getElementById("win-sound").play();
    } else {
        document.body.style.backgroundColor = "red";
        document.getElementById("loss-sound").play();
    }
}


function resetGame() {
    document.getElementById("player-guess").textContent = "Your Guess: ";
    document.getElementById("coin-result").textContent = "Coin Flip Result: ";
    document.getElementById("game-result").textContent = "Game Result: ";
    document.body.style.backgroundColor = "";
}
