import { generateDeck, generateEasyDeck } from "../components/deck/deckGenerator.js";
import { shuffleDeck } from "../components/deck/shuffleDeck.js";
import { renderDeck } from "../components/deck/deckRenderer.js";
$(document).ready(async function () {
    let deck = generateDeck();
    //let deck = generateEasyDeck();
    let shuffledDeck = shuffleDeck(deck);
    await renderDeck(shuffledDeck);
});
