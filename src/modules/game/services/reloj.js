// ------------------------------
//  CRONÓMETRO CONTROL
// ------------------------------

let segundos = 0;
let minutos = 0;
let relojInterval = null;

export function iniciarCronometro() {
    relojInterval = setInterval(() => {
        segundos++;

        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }

        const txtMin = minutos.toString().padStart(2, "0");
        const txtSeg = segundos.toString().padStart(2, "0");

        document.getElementById("cronometro").textContent = `${txtMin}:${txtSeg}`;

    }, 1000);
}

export function detenerCronometro() {
    clearInterval(relojInterval);
}

export function obtenerTiempoFinal() {
    return {
        minutos,
        segundos,
        totalSegundos: minutos * 60 + segundos
    };
}

export function reiniciarCronometro() {
    minutos = 0;
    segundos = 0;
    document.getElementById("cronometro").textContent = "00:00";
}

//Si tu final de partida dispara una llamada a PHP, simplemente envías el tiempo:
const tiempo = obtenerTiempoFinal();
/*
fetch("/src/modules/game/services/guardar-resultado.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        tiempo: tiempo.totalSegundos
    })
});

Si tu final de partida dispara una llamada a PHP, simplemente envías el tiempo:
$data = json_decode(file_get_contents('php://input'), true);
$tiempo = $data['tiempo'] ?? null;

if ($tiempo) {
    // Guardar en la base de datos con tu UserPDO o GamePDO
}
*/
