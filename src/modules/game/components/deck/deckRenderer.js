import { renderCard } from "./cardRenderer.js";
export async function renderDeck(deck) {
    const grid = $("#cardGrid");
    grid.empty();

    const cardsToShow = deck.slice(0, 12); // 12 cartas por ahora
    for (const card of cardsToShow) {
        const cardHTML = await renderCard(card);
        grid.append(cardHTML);
    }
}
