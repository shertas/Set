export function showDetails() {
    const level = document.getElementById("level").value;
    const details = document.getElementById("details");
    details.innerHTML = "";
    switch (level) {
        case "1":
            details.innerHTML = "<b>Nivel Fácil</b>: ideal para principiantes. <br>Permitidas todas las ayudas, sin contrarreloj y sin penalizaciones.";
            break;
        case "2":
            details.innerHTML = "<b>Nivel Medio</b>: buena opción para quienes ya conocen el juego. <br> Sin contrarreloj. Se permite añadir 3 cartas a la mesa y habrá una penalización de 0,5 por fallo.";
            break;
        case "3":
            details.innerHTML = "<b>Nivel Difícil</b>: para jugadores expertos. <br> Modo contrarreloj, sin ningún tipo de ayuda y cara error penaliza 1 punto";
            break;
        default:
            details.innerHTML = "";
    }
}