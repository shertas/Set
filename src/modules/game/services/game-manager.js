import { generateDeck, generateEasyDeck } from "../components/deck/deck-generator.js"
import { shuffleDeck } from "../components/deck/shuffle-deck.js"
import { setRules, pveRules } from "./set-rules.js"
import { initCardSelection, unselectCards } from "../components/deck/card-selection.js"
import { clickHelpButton } from "./help-button.js"
import { resolveSet } from "./resolve-set.js"
import { Scoreboard } from "./scoreboard.js"
import { timerStart, countdown } from "./stopwatch.js"
import { endGame } from "./end-game.js"
import { saveScore } from "./save-score.js"
import { addCards } from "./add-cards.js"
import { timerSetStart, resetTimerSet } from "./opponent-set-interval.js"

const urlParams = new URLSearchParams(window.location.search)
const level = parseInt(urlParams.get('level')) || 2
const pve = urlParams.get('pve') === '1'


document.addEventListener("DOMContentLoaded", async () => {
    let deck = (level === 1) ? generateEasyDeck() : generateDeck()
    const penalty = setRules(level)
    const opponentSpeed = pveRules(level, pve)

    level === 3 ? countdown() : timerStart()

    const add3CardsButton = document.getElementById("add3")
    const isSetButton = document.getElementById("isSet")
    const endGameButton = document.getElementById("endGame")

    const selectedCards = initCardSelection()
    const shuffledDeck = shuffleDeck(deck)
    const totalCards = shuffledDeck.length
    const scoreboard = new Scoreboard(totalCards)

    const gameState = {
        shuffledDeck,
        totalCards,
        scoreboard,
        currentCardIndex: 0,
        setFound: false,
        gameEnded: false,
        level,
        pve
    }


    await addCards(gameState, 12)

    if (pve) {
        timerSetStart(opponentSpeed, gameState, selectedCards)
    }

    // Event Listeners
    if (level !== 3) {
        add3CardsButton.addEventListener("click", async () => {
            await add3Cards(gameState)
        })
    }
    isSetButton.addEventListener("click", async () => {
        const selectedIds = Array.from(selectedCards)
        if (selectedIds.length !== 3) {
            alert("Selecciona 3 cartas para verificar un SET.")
        } else {
            let isSet = resolveSet(selectedIds)
            unselectCards()
            selectedCards.clear()
            if (isSet) {
                // Es un SET correcto - sumar 1 punto
                scoreboard.addSet(1)

                if (pve) {
                    resetTimerSet(opponentSpeed, gameState, selectedCards)
                }

                await addCards(gameState, 3)
            } else {
                // No es un SET - contabilizar error y aplicar penalización según nivel
                scoreboard.addError()
                if (penalty > 0) {
                    scoreboard.applyPenalty(penalty)
                }
            }

        }
    })
    endGameButton.addEventListener("click", () => {
        gameEnded = endGame()
        saveScore(scoreboard, pve, level)
    })

    document.addEventListener("timerFinished", () => {
        gameEnded = endGame()
        saveScore(scoreboard, pve, level)
    })

    // Conditional Help Button Initialization
    if (level === 1) {
        const helpButton = document.getElementById("help")
        helpButton.addEventListener("click", () => {

            clickHelpButton(gameState.setFound, selectedCards)
        }
        )
    }
})
