import { autoSelectCards } from "../components/deck/card-selection.js";
export function initHelpButton(setFound) {
    const helpButton = document.getElementById("help")
    autoSelectCards(setFound)
}