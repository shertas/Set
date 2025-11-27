export function saveConfigSession(levelValue, pve) {
    fetch("save-config-session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: levelValue, pve: pve })
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar la sesión");

            window.location.href = "/src/modules/game/services/new-game.php";
        })
        .catch(error => console.error("Error al guardar la sesión:", error));
}