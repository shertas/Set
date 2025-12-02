import { generateDeck, generateEasyDeck } from "../components/deck/deckGenerator.js"
import { shuffleDeck } from "../components/deck/shuffleDeck.js"
import { renderInGrid } from "../components/deck/deckRenderer.js"
import { setRules } from "./set-rules.js"
import { initCardSelection } from "../components/deck/cardSelection.js"

const urlParams = new URLSearchParams(window.location.search)
const level = parseInt(urlParams.get('level')) || 2
const pve = urlParams.get('pve') === '1'
let deck = (level === 1) ? generateEasyDeck() : generateDeck()
const penalty = setRules(level)

document.addEventListener("DOMContentLoaded", async () => {
    initCardSelection()
    const shuffledDeck = shuffleDeck(deck)
    const totalCards = shuffledDeck.length
    let currentCardIndex = 0
    currentCardIndex += await renderInGrid(shuffledDeck, currentCardIndex, 12)
    const add3CardsButton = document.getElementById("add3")
    add3CardsButton.addEventListener("click", async () => {
        currentCardIndex += await renderInGrid(shuffledDeck, currentCardIndex, 3)
    })
})
