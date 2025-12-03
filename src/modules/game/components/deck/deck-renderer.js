import { renderCards } from "./card-renderer.js"
export async function renderInGrid(deck, startIndex, cardsNumber) {
    const cards = deck.slice(startIndex, startIndex + cardsNumber)
    const newCards = await renderCards(cards)
    return newCards
}
