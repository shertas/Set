export async function renderCards(cards) {
  let position = 1
  let cardsChanged = 0
  let cardPlaced = false
  for (const card of cards) {
    while (position <= 15) {
      const cardPositionId = document.getElementById(`cardPosition${position}`)
      if (cardPositionId.getAttribute('data-void') === 'true') {

        const cardHTML = await renderCard(card)
        const cardPositionId = document.getElementById(`cardPosition${position}`)
        cardPositionId.innerHTML = cardHTML
        cardPositionId.setAttribute('data-void', 'false')
        cardPlaced = true
        position++
        cardsChanged++
        break
      } else {
        position++
        cardPlaced = false
      }
    }
    if (!cardPlaced) {
      alert("No hay más espacio para colocar cartas")
      break
    }
  }
  return cardsChanged
}

async function renderCard(card) {
  const svgContent = await loadSVG(`.././svg/${card.shape}.svg`)
  const dataAttributes = `data-color="${card.color}" data-fill="${card.fill}" data-number="${card.number}" data-shape="${card.shape}"`
  let shapesHTML = ""

  for (let i = 0; i < card.number; i++) {
    shapesHTML += `${applyFillToSVG(svgContent, card)}`
  }


  const html = `
    <div class="card" ${dataAttributes}>
      <div class="shape">${shapesHTML}</div>
    </div>
  `
  return html
}

// Cargar SVG desde archivo
async function loadSVG(path) {
  const response = await fetch(path)
  if (!response.ok) throw new Error(`No se pudo cargar el SVG: ${path}`)
  return await response.text()
}

// Aplicar el relleno dinámico según la carta
function applyFillToSVG(svgContent, card) {
  let svg = svgContent

  // Color del trazo
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${card.color}"`)

  if (card.fill === "color") {
    svg = svg.replace(/fill="[^"]*"/g, `fill="${card.color}"`)
  } else if (card.fill === "none") {
    svg = svg.replace(/fill="[^"]*"/g, `fill="none"`)
  } else if (card.fill === "stripes") {
    const patternId = `url(#stripes${card.color.toLowerCase()})`
    svg = svg.replace(/fill="[^"]*"/g, `fill="${patternId}"`)
  }

  return svg
}

