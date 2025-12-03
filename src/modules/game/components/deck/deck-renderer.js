import { renderCards } from "./card-renderer.js"
import { existsASetOnTable } from "../../services/check-set.js"
export async function renderInGrid(deck, startIndex, cardsNumber) {
    const cards = deck.slice(startIndex, startIndex + cardsNumber)
    const cardsLeft = deck.length - (startIndex + cardsNumber)
    if (cardsLeft < cardsNumber) {
        alert("No hay suficientes cartas en el mazo.")
    }
    else {
        const newCards = await renderCards(cards)
        const setFound = existsASetOnTable()
        return { newCards, setFound }
    }
}
