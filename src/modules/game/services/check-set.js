export function isASet(selectedIds) {
    // Obtener los elementos card dentro de cada cardPosition
    const cards = selectedIds.map(id =>
        document.querySelector(`#${id} .card`)
    )

    // Propiedades de SET
    const props = ["color", "fill", "number", "shape"]

    for (let prop of props) {
        const values = cards.map(card => card.dataset[prop])

        const allEqual = values[0] === values[1] && values[1] === values[2]
        const allDifferent = new Set(values).size === 3

        if (!allEqual && !allDifferent) {
            return false
        }
    }
    return selectedIds
}

export function existsASetOnTable() {
    // Seleccionamos todos los cardPosition que NO estén vacíos
    const cardPositions = Array.from(
        document.querySelectorAll("[id^='cardPosition']:not([data-void='true'])")
    )

    if (cardPositions.length < 3) return false

    const n = cardPositions.length

    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {


                const tripleIds = [
                    cardPositions[i].id,
                    cardPositions[j].id,
                    cardPositions[k].id
                ]


                if (isASet(tripleIds)) {
                    return tripleIds
                }
            }
        }
    }

    return false
}