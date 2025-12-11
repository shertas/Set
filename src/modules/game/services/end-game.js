import { timerStop } from "/src/modules/game/services/stopwatch.js";

export function checkGameEnd(currentCardIndex, totalCards, setFound) {
    // El juego termina si se han usado todas las cartas y no hay sets en la mesa
    let gameEnd = currentCardIndex >= (totalCards - 3) && !setFound
    if (gameEnd) {
        timerStop()
        alert("Juego terminado.")
    }
    return gameEnd
}

export function endGame() {
    timerStop()
    alert("Juego terminado.")
    return true
}