// ------------------------------
//  CRONÓMETRO CONTROL
// ------------------------------

let segundos = 0;
let minutos = 0;
let relojInterval = null;

export function timerStart() {
    relojInterval = setInterval(() => {
        segundos++;

        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }

        const txtMin = minutos.toString().padStart(2, "0");
        const txtSeg = segundos.toString().padStart(2, "0");

        document.getElementById("timer").textContent = `${txtMin}:${txtSeg}`;

    }, 1000);
}

export function timerStop() {
    clearInterval(relojInterval);
}
