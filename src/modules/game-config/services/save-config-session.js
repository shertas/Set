export function saveConfigSession(levelValue, pve) {
    fetch("/modules/game-config/services/save-config-session.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: levelValue, pve: pve })
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar la sesión")
            return response.json()
        })
        .then(data => {
            if (data.success) {
                window.location.href = window.location.pathname + '?page=new-game'
            }
        })
        .catch(error => console.error("Error al guardar la sesión:", error))
}