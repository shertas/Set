function selectCard(card, selected) {
    const id = card.id
    // Si la carta está vacía → no hacer nada
    if (card.dataset.void === "true") {
        return
    }

    // Si ya está seleccionada → deseleccionar
    if (selected.has(id)) {
        selected.delete(id)
        card.classList.remove("selected")
        return
    }

    // Si aún no hay 3 seleccionadas → seleccionar
    if (selected.size < 3) {
        selected.add(id)
        card.classList.add("selected")
    }
}
export function initCardSelection() {
    const cardPositions = document.querySelectorAll("[id^='cardPosition']")
    const selected = new Set()

    cardPositions.forEach(card => {
        card.addEventListener("click", () => {
            selectCard(card, selected)
        })
    })

    return selected
}
export function unselectCards() {
    const cardPositions = document.querySelectorAll("[id^='cardPosition']")
    cardPositions.forEach(card => {
        card.classList.remove("selected")
    })
}

export function autoSelectCards(cardIds, selectedCards) {
    // 1. Deshacer selección anterior
    unselectCards()
    // 2. Seleccionar las nuevas cartas usando selectCard

    cardIds.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return

        selectCard(el, selectedCards)
    })
}