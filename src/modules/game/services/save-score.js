export function saveScore(scoreboard, pve, level) {
    const gameState = {
        date: new Date().toISOString(),
        level: level,
        pve: pve,
        time: document.getElementById("timer").textContent,
        setsFound: scoreboard.setsFound,
        errors: scoreboard.errors,
        score: scoreboard.score,
    }
    console.log("Saving game state:", gameState)
    //HACER LLAMADA A BASE DE DATOS AQUI Y BORRAR EL CONSOLE.LOG EL USUARIO SE COGE DE LA SESION EN PHP
}