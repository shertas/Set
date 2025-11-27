export async function renderCard(card) {
  const svgContent = await loadSVG(`.././svg/${card.shape}.svg`);
  let shapesHTML = "";

  // Altura máxima proporcional de cada forma para que 3 SVG quepan dentro de la carta
  const maxShapes = 3;
  const shapeHeightPercent = 100 / maxShapes; // % de altura por cada SVG

  for (let i = 0; i < card.number; i++) {
    shapesHTML += `
      <div class="shape" style="color:${card.color}; height:${shapeHeightPercent}%">
        ${applyFillToSVG(svgContent, card)}
      </div>`;
  }

  const html = `
    <div class="card ${card.color}">
      <div class="shape-container vertical">${shapesHTML}</div>
    </div>
  `;
  return html;
}

// Cargar SVG desde archivo
async function loadSVG(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar el SVG: ${path}`);
  return await response.text();
}

// Aplicar el relleno dinámico según la carta
function applyFillToSVG(svgContent, card) {
  let svg = svgContent;

  // Color del trazo
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${card.color}"`);

  if (card.fill === "color") {
    svg = svg.replace(/fill="[^"]*"/g, `fill="${card.color}"`);
  } else if (card.fill === "none") {
    svg = svg.replace(/fill="[^"]*"/g, `fill="none"`);
  } else if (card.fill === "stripes") {
    const patternId = `url(#stripes${card.color.toLowerCase()})`;
    svg = svg.replace(/fill="[^"]*"/g, `fill="${patternId}"`);
  }

  return svg;
}
