const colors = ["red", "purple", "green"];
const fills = ["color", "none", "stripes"];
const numbers = [1, 2, 3];
const shapes = ["oval", "diamond", "wave"];

export function generateDeck() {
    const deck = [];

    for (const color of colors) {
        for (const fill of fills) {
            for (const number of numbers) {
                for (const shape of shapes) {
                    deck.push({
                        color,
                        fill,
                        number,
                        shape,
                        id: `${color}-${fill}-${number}-${shape}`,
                    });
                }
            }
        }
    }

    return deck;
}
export function generateEasyDeck() {
    const deck = [];
    for (const color of colors) {
        const fill = 'color'
        for (const number of numbers) {
            for (const shape of shapes) {
                deck.push({
                    color,
                    fill,
                    number,
                    shape,
                    id: `${color}-${fill}-${number}-${shape}`,
                });

            }
        }
    }

    return deck;
}
