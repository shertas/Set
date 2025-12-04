import { isASet } from "./check-set.js"
export function resolveSet(selectedIds) {
    const result = isASet(selectedIds)
    // Vaciar las posiciones de las cartas seleccionadas
    if (result) {
        alert("✔️ ¡Es un SET!")
        for (const id of selectedIds) {
            const cardPosition = document.getElementById(id)
            cardPosition.innerHTML = ""
            cardPosition.setAttribute('data-void', 'true')
        }
        return true
    }
    alert("❌ No es un SET")
    return false
}