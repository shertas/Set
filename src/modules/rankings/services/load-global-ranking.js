// Cargar el ranking global y rellenar tabla escritorio y móvil (compacta)
(function () {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/modules/rankings/services/get-global-ranking.php', true)

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)

            const desktopTbody = document.querySelector('.table.table-desktop tbody')
            const mobileTbody = document.querySelector('.table-mobile tbody')

            if (!response.success) {
                if (desktopTbody) desktopTbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error al cargar las partidas</td></tr>'
                if (mobileTbody) mobileTbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Error al cargar las partidas</td></tr>'
                console.error('Error al cargar partidas:', response.error)
                return
            }

            const games = response.games || []

            if (games.length === 0) {
                if (desktopTbody) desktopTbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay partidas registradas</td></tr>'
                if (mobileTbody) mobileTbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay partidas registradas</td></tr>'
                return
            }

            // Limpiar tablas
            if (desktopTbody) desktopTbody.innerHTML = ''
            if (mobileTbody) mobileTbody.innerHTML = ''

            games.forEach(game => {
                if (game.score == 0) return // ignorar scores 0 

                // Formatear fecha (de YYYY-MM-DD HH:MM:SS a DD/MM/YYYY)
                const date = new Date(game.date)
                const formattedDate = date.toLocaleDateString('es-ES')

                // Fila escritorio (completa)
                if (desktopTbody) {
                    const row = document.createElement('tr')
                    row.innerHTML = `
                        <td>${game.username}</td>
                        <td>${formattedDate}</td>
                        <td>${game.level}</td>
                        <td>${game.time}</td>
                        <td>${game.correct_set}</td>
                        <td>${game.incorrect_set}</td>
                        <td>${game.score}</td>
                    `
                    desktopTbody.appendChild(row)
                }

                // Fila móvil (compacta): Usuario, Nivel, Tiempo, Puntuación
                if (mobileTbody) {
                    const mrow = document.createElement('tr')
                    mrow.innerHTML = `
                        <td>${game.username}</td>
                        <td>${game.level}</td>
                        <td>${game.time}</td>
                        <td>${game.score}</td>
                    `
                    mobileTbody.appendChild(mrow)
                }
            })
        }
    }

    xhr.onerror = function () {
        const desktopTbody = document.querySelector('.table.table-desktop tbody')
        const mobileTbody = document.querySelector('.table-mobile tbody')
        if (desktopTbody) desktopTbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error al cargar las partidas</td></tr>'
        if (mobileTbody) mobileTbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Error al cargar las partidas</td></tr>'
        console.error('Error en la petición al servidor')
    }

    xhr.send()
})()
