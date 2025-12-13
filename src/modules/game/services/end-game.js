import { timerStop } from "/src/modules/game/services/stopwatch.js"
import { timerSetStop } from "/src/modules/game/services/opponent-set-interval.js"

export function checkGameEnd(currentCardIndex, totalCards, setFound) {
    // El juego termina si se han usado todas las cartas y no hay sets en la mesa
    let gameEnd = currentCardIndex >= (totalCards - 3) && !setFound
    if (gameEnd) {
        endGame()
    }
    return gameEnd
}

export function endGame() {
    timerStop()
    timerSetStop()
    alert("Juego terminado.")
    return true
}