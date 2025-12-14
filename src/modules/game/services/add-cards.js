import { renderInGrid } from "../components/deck/deck-renderer.js"
import { existsASetOnTable } from "./check-set.js"
import { checkGameEnd } from "./end-game.js"
import { saveScore } from "./save-score.js"

export async function addCards(state, cards) {
    const added = await renderInGrid(
        state.shuffledDeck,
        state.currentCardIndex,
        cards
    )

    state.currentCardIndex += added
    state.setFound = existsASetOnTable()
    state.scoreboard.updateCardsRemaining(added)

    if (!state.setFound && state.currentCardIndex < state.totalCards) {
        const extra = await addCards(state, 3)
        state.scoreboard.updateCardsRemaining(extra)
    }

    state.gameEnded = checkGameEnd(
        state.currentCardIndex,
        state.totalCards,
        state.setFound
    )

    if (state.gameEnded) {
        saveScore(state.scoreboard, state.pve, state.level)
    }

    return added
}