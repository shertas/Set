export function setRules(level) {
    const buttonsDiv = document.getElementById('buttons');
    buttonsDiv.innerHTML = '';
    let penalty

    switch (level) {
        case 1: // Easy
            penalty = 0;
            buttonsDiv.innerHTML = '<button class="button" id="help">Pista</button><button class="button" id="add3">Añade 3</button> <button class="button" id="isSet">Set</button> <button class="button" id="endGame">Terminar Partida</button>';
            break;
        case 2: // Medium
            penalty = 0.5;
            buttonsDiv.innerHTML = '<button class="button" id="add3">Añade 3</button> <button class="button" id="isSet">Set</button><button class="button" id="endGame">Terminar Partida</button>';
            break
        case 3: // Hard
            penalty = 1;
            buttonsDiv.innerHTML = ' <button class="button" id="isSet">Set</button><button class="button" id="endGame">Terminar Partida</button>';
            break;
    }
    return penalty;
}
