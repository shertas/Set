export function isASet(selectedIds) {
    // Obtener los elementos card dentro de cada cardPosition
    const cards = selectedIds.map(id =>
        document.querySelector(`#${id} .card`)
    );

    // Propiedades de SET
    const props = ["color", "fill", "number", "shape"];

    for (let prop of props) {
        const values = cards.map(card => card.dataset[prop]);

        const allEqual = values[0] === values[1] && values[1] === values[2];
        const allDifferent = new Set(values).size === 3;

        if (!allEqual && !allDifferent) {
            alert("❌ No es un SET");
            return false;
        }
    }
    alert("✔️ ¡Es un SET!");
    return true;
}