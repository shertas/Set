import { renderCards } from "./card-renderer.js"
import { showToast } from "../../../../global/services/notifications.js"
export async function renderInGrid(deck, startIndex, cardsNumber, state = null) {
    const cards = deck.slice(startIndex, startIndex + cardsNumber)
    const cardsLeft = deck.length - (startIndex + cardsNumber)
    if (cardsLeft < 0) {
        // Solo mostrar el aviso una vez
        if (state && !state.noCardsWarningShown) {
            showToast("No hay suficientes cartas en el mazo.", { type: 'error', duration: 3000 })
            state.noCardsWarningShown = true
        }
        let newCards = 0
        return newCards
    }
    else {
        const newCards = await renderCards(cards)
        return newCards
    }
}
