import { generateDeck, generateEasyDeck } from "../components/deck/deck-generator.js"
import { shuffleDeck } from "../components/deck/shuffle-deck.js"
import { renderInGrid } from "../components/deck/deck-renderer.js"
import { setRules } from "./set-rules.js"
import { initCardSelection, unselectCards } from "../components/deck/card-selection.js"
import { initHelpButton } from "./help-button.js"
import { resolveSet } from "./resolve-set.js"
import { existsASetOnTable } from "./check-set.js"
import { Scoreboard } from "./scoreboard.js"
import { timerStart } from "./stopwatch.js"
import { checkGameEnd, endGame } from "./end-game.js"

const urlParams = new URLSearchParams(window.location.search)
const level = parseInt(urlParams.get('level')) || 2
const pve = urlParams.get('pve') === '1'
let deck = (level === 1) ? generateEasyDeck() : generateDeck()
const penalty = setRules(level)

document.addEventListener("DOMContentLoaded", async () => {
    timerStart()
    const add3CardsButton = document.getElementById("add3")
    const isSetButton = document.getElementById("isSet")
    const endGameButton = document.getElementById("endGame")
    const selectedCards = initCardSelection()
    const shuffledDeck = shuffleDeck(deck)
    const totalCards = shuffledDeck.length
    console.log(totalCards)
    let currentCardIndex = 0
    let setFound = false
    let gameEnded = false
    let addCards = await renderInGrid(shuffledDeck, currentCardIndex, 12)
    currentCardIndex += addCards
    setFound = existsASetOnTable()
    if (!setFound && currentCardIndex < totalCards) {
        addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
        currentCardIndex += addCards
        setFound = existsASetOnTable()
    }

    // Inicializar el marcador
    const scoreboard = new Scoreboard(totalCards)
    scoreboard.updateCardsRemaining(12) // Se han usado 12 cartas iniciales

    // Event Listeners
    add3CardsButton.addEventListener("click", async () => {
        addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
        currentCardIndex += addCards
        scoreboard.updateCardsRemaining(addCards) // Actualizar cartas usadas
        setFound = existsASetOnTable()
        gameEnded = checkGameEnd(currentCardIndex, totalCards, setFound)
        if (gameEnded) {
            saveGame(scoreboard, pve)
        }
    })
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
                addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
                currentCardIndex += addCards
                scoreboard.updateCardsRemaining(addCards) // Actualizar cartas usadas
                setFound = existsASetOnTable()
                if (!setFound && currentCardIndex < totalCards) {
                    addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
                    currentCardIndex += addCards
                    setFound = existsASetOnTable()
                }
                gameEnded = checkGameEnd(currentCardIndex, totalCards, setFound)
                if (gameEnded) {
                    saveGame(scoreboard, pve, level)
                }


                return true
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
    })
    // Conditional Help Button Initialization
    if (level === 1) {
        const helpButton = document.getElementById("help")
        helpButton.addEventListener("click", () => {
            initHelpButton(setFound)
        }
        )
    }
})
