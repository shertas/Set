export function initCardSelection() {
    const cardPositions = document.querySelectorAll("[id^='cardPosition']");
    const selected = new Set();

    cardPositions.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.id;
            // Si la carta está vacía → no hacer nada
            if (card.dataset.void === "true") {
                return;
            }
            // Si ya está seleccionada → deseleccionar
            if (selected.has(id)) {
                selected.delete(id);
                card.classList.remove("selected");
                return;
            }

            // Si aún no hay 3 seleccionadas → seleccionar
            if (selected.size < 3) {
                selected.add(id);
                card.classList.add("selected");
            }
        });
    });

    return selected;
}
export function unselectCards() {
    const cardPositions = document.querySelectorAll("[id^='cardPosition']");
    cardPositions.forEach(card => {
        card.classList.remove("selected");
    });
}