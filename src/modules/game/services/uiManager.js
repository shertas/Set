import { generateDeck, generateEasyDeck } from "../components/deck/deckGenerator.js";
import { shuffleDeck } from "../components/deck/shuffleDeck.js";
import { renderDeck } from "../components/deck/deckRenderer.js";
import { setRules } from "./set-rules.js";

const urlParams = new URLSearchParams(window.location.search);
const level = parseInt(urlParams.get('level')) || 2;
const pve = urlParams.get('pve') === '1';
let deck = (level === 1) ? generateEasyDeck() : generateDeck();;
const penalty = setRules(level);

$(document).ready(async function () {
    let shuffledDeck = shuffleDeck(deck);
    await renderDeck(shuffledDeck);


});
