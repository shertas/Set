export function setRules(level) {
    const buttonsDiv = document.getElementById('buttons')
    buttonsDiv.innerHTML = ''
    let penalty

    switch (level) {
        case 1: // Easy
            penalty = 0
            buttonsDiv.innerHTML = '<button class="btn-primary" id="help">Pista</button> <button class="btn-primary" id="add3">Añade 3</button> <button class="btn-secondary" id="isSet">Set</button> <button class="btn-secondary" id="endGame">Terminar Partida</button>'
            break
        case 2: // Medium
            penalty = 0.5
            buttonsDiv.innerHTML = '<button class="btn-primary" id="add3">Añade 3</button> <button class="btn-secondary" id="isSet">Set</button> <button class="btn-secondary" id="endGame">Terminar Partida</button>'
            break
        case 3: // Hard
            penalty = 1
            buttonsDiv.innerHTML = '<button class="btn-secondary" id="isSet">Set</button> <button class="btn-secondary" id="endGame">Terminar Partida</button>'
            break
    }
    return penalty
}

export function pveRules(level, pve) {
    let opponentSpeed = null
    if (pve) {
        const scoreboardDiv = document.getElementById('scoreboard')
        const text = '<p id="opponentScore">Puntuación oponente: <span id="opponentScoreCount">0</span></p>'
        scoreboardDiv.innerHTML += text;
    }
    switch (level) {
        case 1: // Easy
            opponentSpeed = 30
            break
        case 2: // Medium
            opponentSpeed = 20
            break
        case 3: // Hard
            opponentSpeed = 10
            break
    }
    return opponentSpeed
}