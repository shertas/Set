import { autoSelectCards, unselectCards } from "../components/deck/card-selection.js"
export function clickHelpButton(setFound, selectedCards) {
    unselectCards()
    selectedCards.clear()
    autoSelectCards(setFound, selectedCards)
}