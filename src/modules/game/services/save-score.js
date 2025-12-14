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

    // Enviar los datos al servidor para guardarlos en la base de datos
    fetch("/src/modules/game/services/save-score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameState),
        credentials: 'same-origin' // Asegura que se envíen las cookies de sesión
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Score guardado correctamente:", gameState);
            } else {
                console.error("Error al guardar el score:", data.error);
            }
        })
        .catch(error => {
            console.error("Error al guardar el score:", error);
        });
}