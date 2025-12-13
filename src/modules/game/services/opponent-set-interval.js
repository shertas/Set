import { opponentFindSet } from "/src/modules/game/services/opponent-action.js"

let timeSetInterval = null
export function timerSetStart(opponentSpeed, gameState, selectedCards) {
    if (timeSetInterval) return

    timeSetInterval = setInterval(async () => {
        opponentFindSet(gameState, selectedCards)
    }, opponentSpeed * 1000)

}
export function timerSetStop() {
    if (!timeSetInterval) return
    clearInterval(timeSetInterval)
    timeSetInterval = null
}

export function resetTimerSet(opponentSpeed, gameState, selectedCards) {
    timerSetStop()
    timerSetStart(opponentSpeed, gameState, selectedCards)
}
