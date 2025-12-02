import { generateDeck, generateEasyDeck } from "../components/deck/deck-generator.js"
import { shuffleDeck } from "../components/deck/shuffle-deck.js"
import { renderInGrid } from "../components/deck/deck-renderer.js"
import { setRules } from "./set-rules.js"
import { initCardSelection, unselectCards } from "../components/deck/card-selection.js"
import { isASet } from "./check-set.js"

const urlParams = new URLSearchParams(window.location.search)
const level = parseInt(urlParams.get('level')) || 2
const pve = urlParams.get('pve') === '1'
let deck = (level === 1) ? generateEasyDeck() : generateDeck()
const penalty = setRules(level)

document.addEventListener("DOMContentLoaded", async () => {
    const add3CardsButton = document.getElementById("add3")
    const isSetButton = document.getElementById("isSet")
    const selectedCards = initCardSelection();
    const shuffledDeck = shuffleDeck(deck)
    const totalCards = shuffledDeck.length
    let currentCardIndex = 0
    currentCardIndex += await renderInGrid(shuffledDeck, currentCardIndex, 12)
    add3CardsButton.addEventListener("click", async () => {
        currentCardIndex += await renderInGrid(shuffledDeck, currentCardIndex, 3)
    })
    isSetButton.addEventListener("click", () => {
        const selectedIds = Array.from(selectedCards)
        if (selectedIds.length !== 3) {
            alert("Selecciona 3 cartas para verificar un SET.")
        } else {
            let isSet = isASet(selectedIds)
            unselectCards()
        }
    })
})
