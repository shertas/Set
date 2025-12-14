import { timerStop } from "/src/modules/game/services/stopwatch.js"
import { timerSetStop } from "/src/modules/game/services/opponent-set-interval.js"

function showEndGamePanel() {
    const overlay = document.getElementById("endGameOverlay");
    if (overlay) {
        overlay.style.display = "flex";
    }

    // Configurar el botón de nueva partida
    const newGameButton = document.getElementById("newGameButton");
    if (newGameButton) {
        newGameButton.addEventListener("click", () => {
            location.reload();
        });
    }
}

export function checkGameEnd(currentCardIndex, totalCards, setFound) {
    // El juego termina si se han usado todas las cartas y no hay sets en la mesa
    let gameEnd = currentCardIndex >= (totalCards - 3) && !setFound;
    if (gameEnd) {
        timerStop();
        showEndGamePanel();
    }
    return gameEnd
}

export function endGame() {
    timerStop();
    showEndGamePanel();
    return true;
}