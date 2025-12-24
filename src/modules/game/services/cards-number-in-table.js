export function cardsNumberInTable() {
    const cardsInTable = document.querySelectorAll('#cardsGrid div[data-void="false"]').length
    return cardsInTable
}