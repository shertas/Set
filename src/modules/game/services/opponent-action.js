import { autoSelectCards, unselectCards } from "/modules/game/components/deck/card-selection.js"
import { existsASetOnTable } from "/modules/game/services/check-set.js"
import { resolveSetPVE } from "/modules/game/services/resolve-set.js"
import { addCards } from "/modules/game/services/add-cards.js"


export async function opponentFindSet(gameState, selectedCards) {
    if (gameState.gameEnded) return

    const setFound = existsASetOnTable()
    if (!setFound) return
    unselectCards()
    selectedCards.clear()
    autoSelectCards(setFound, selectedCards)
    const selectedIds = Array.from(selectedCards)
    const isSet = resolveSetPVE(selectedIds)
    if (!isSet) return

    const opponentScoreEl = document.getElementById("opponentScoreCount")
    opponentScoreEl.textContent = parseInt(opponentScoreEl.textContent) + 1

    unselectCards()
    selectedCards.clear()

    await addCards(gameState, 3)

}
