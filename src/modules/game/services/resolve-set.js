import { isASet } from "./check-set.js"
import { showToast } from "../../../global/services/notifications.js"
export function resolveSet(selectedIds) {
    const result = isASet(selectedIds)
    // Vaciar las posiciones de las cartas seleccionadas
    if (result) {
        showToast("✔️ ¡Es un SET!", { type: 'success', duration: 2200 })
        for (const id of selectedIds) {
            const cardPosition = document.getElementById(id)
            cardPosition.innerHTML = ""
            cardPosition.setAttribute('data-void', 'true')
        }
        return true
    }
    showToast("❌ No es un SET", { type: 'error', duration: 2500 })
    return false
}

export function resolveSetPVE(selectedIds) {
    const result = isASet(selectedIds)
    // Vaciar las posiciones de las cartas seleccionadas
    if (result) {
        for (const id of selectedIds) {
            const cardPosition = document.getElementById(id)
            cardPosition.innerHTML = ""
            cardPosition.setAttribute('data-void', 'true')
        }
        showToast("✔️ ¡El oponente ha conseguido un SET!", { type: 'success', duration: 2200 })
        return true
    }
    return false
}