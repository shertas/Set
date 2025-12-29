// Cargar el histórico de partidas del usuario
(function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../services/get-user-games.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.success) {
                const games = response.games;
                const tbody = document.querySelector('.table tbody');

                // Limpiar el contenido de ejemplo
                tbody.innerHTML = '';

                if (games.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay partidas registradas</td></tr>';
                } else {
                    games.forEach(game => {
                        const row = document.createElement('tr');

                        // Formatear la fecha (de YYYY-MM-DD HH:MM:SS a DD/MM/YYYY)
                        const date = new Date(game.date);
                        const formattedDate = date.toLocaleDateString('es-ES');

                        // Formatear PvE (convertir 1/0 a Sí/No)
                        const pveText = game.pve == 1 ? 'Sí' : 'No';

                        row.innerHTML = `
                            <td>${formattedDate}</td>
                            <td>${game.level}</td>
                            <td>${pveText}</td>
                            <td>${game.time}</td>
                            <td>${game.correct_set}</td>
                            <td>${game.incorrect_set}</td>
                            <td>${game.score}</td>
                        `;

                        tbody.appendChild(row);
                    });
                }
            } else {
                console.error('Error al cargar partidas:', response.error);
                const tbody = document.querySelector('.table tbody');
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error al cargar las partidas</td></tr>';
            }
        }
    };

    xhr.onerror = function() {
        console.error('Error en la petición al servidor');
        const tbody = document.querySelector('.table tbody');
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error al cargar las partidas</td></tr>';
    };

    xhr.send();
})();
