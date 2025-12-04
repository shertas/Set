import { generateDeck, generateEasyDeck } from "../components/deck/deck-generator.js"
import { shuffleDeck } from "../components/deck/shuffle-deck.js"
import { renderInGrid } from "../components/deck/deck-renderer.js"
import { setRules } from "./set-rules.js"
import { initCardSelection, unselectCards } from "../components/deck/card-selection.js"
import { initHelpButton } from "./help-button.js"
import { resolveSet } from "./resolve-set.js"
import { existsASetOnTable } from "./check-set.js"

const urlParams = new URLSearchParams(window.location.search)
const level = parseInt(urlParams.get('level')) || 2
const pve = urlParams.get('pve') === '1'
let deck = (level === 1) ? generateEasyDeck() : generateDeck()
const penalty = setRules(level)

document.addEventListener("DOMContentLoaded", async () => {
    const add3CardsButton = document.getElementById("add3")
    const isSetButton = document.getElementById("isSet")
    const selectedCards = initCardSelection()
    const shuffledDeck = shuffleDeck(deck)
    const totalCards = shuffledDeck.length
    console.log(totalCards)
    let currentCardIndex = 0
    let setFound = false
    let addCards = await renderInGrid(shuffledDeck, currentCardIndex, 12)
    currentCardIndex += addCards
    setFound = existsASetOnTable()

    // Event Listeners
    add3CardsButton.addEventListener("click", async () => {
        addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
        currentCardIndex += addCards
        setFound = existsASetOnTable()
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
                addCards = await renderInGrid(shuffledDeck, currentCardIndex, 3)
                currentCardIndex += addCards
                setFound = existsASetOnTable()
                return true
            }

        }
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
