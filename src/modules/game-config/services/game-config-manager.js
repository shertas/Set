import { showDetails } from "./game-config-details.js";
import { saveConfigSession } from "./save-config-session.js";


document.addEventListener("DOMContentLoaded", function () {

    //Si se detecta un error al enviar el formulario
    const gameConfigForm = document.querySelector("form");
    const levelSelect = document.getElementById("level");
    levelSelect.addEventListener("change", showDetails);
    gameConfigForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const levelValue = document.getElementById("level").value;
        const pve = document.getElementById("pve").checked;
        saveConfigSession(levelValue, pve);
    });


});
