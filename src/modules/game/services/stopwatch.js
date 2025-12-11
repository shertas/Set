// ------------------------------
//  CRONÓMETRO CONTROL
// ------------------------------

import { endGame } from "/src/modules/game/services/end-game.js"

let seconds = 0
let minutes = 0
let timeInterval = null

export function timerStart() {
    timeInterval = setInterval(() => {
        seconds++

        if (seconds === 60) {
            seconds = 0
            minutes++
        }

        const txtMin = minutes.toString().padStart(2, "0")
        const txtSeg = seconds.toString().padStart(2, "0")

        document.getElementById("timer").textContent = `${txtMin}:${txtSeg}`

    }, 1000)
}
export function countdown() {
    minutes = 30
    timeInterval = setInterval(() => {
        seconds--

        if (seconds < 0) {
            seconds = 59
            minutes--
        }

        const txtMin = minutes.toString().padStart(2, "0")
        const txtSeg = seconds.toString().padStart(2, "0")

        document.getElementById("timer").textContent = `${txtMin}:${txtSeg}`

        if (minutes < 0) {
            endGame()
        }
    }, 1000)
}

export function timerStop() {
    clearInterval(timeInterval)
}
