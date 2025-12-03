import { renderCards } from "./card-renderer.js"
export async function renderInGrid(deck, startIndex, cardsNumber) {
    const cards = deck.slice(startIndex, startIndex + cardsNumber)
    const cardsLeft = deck.length - (startIndex + cardsNumber)
    if (cardsLeft < cardsNumber) {
        alert("No hay suficientes cartas en el mazo.")
        const newCards = 0
        const setFound = null
        return { newCards, setFound }
    }
    else {
        const newCards = await renderCards(cards)
        return newCards
    }
}
