export function saveGame(scoreboard, pve, level) {
    const gameState = {
        score: scoreboard.score,
        setsFound: scoreboard.setsFound,
        errors: scoreboard.errors,
        pve: pve,
        time: document.getElementById("timer").textContent,
        level: level,
        date: new Date().toISOString()
    }
    console.log("Game Over! Saving game state:", gameState)
    //HACER LLAMADA A BASE DE DATOS AQUI Y BORRAR EL CONSOLE.LOG
}