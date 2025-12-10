/**
 * Módulo para gestionar el marcador del juego
 * Actualiza: cartas restantes, errores, puntuación y sets conseguidos
 * Cartas restantes: Se resta del total las cartas de la mesa y las usadas cada vez que se añade 3, se hace un set, etc.
 * 
 */

class Scoreboard {
    constructor(totalCards) {
        this.totalCards = totalCards
        this.cardsRemaining = totalCards
        this.errors = 0
        this.score = 0
        this.setsFound = 0

        this.elements = {
            cardsRemaining: document.getElementById('v1'),
            errors: document.getElementById('v2'),
            score: document.getElementById('v3'),
            setsFound: document.getElementById('v4')
        }

        this.updateDisplay()
    }

    //Actualiza todos los valores en el marcador
    updateDisplay() {
        if (this.elements.cardsRemaining) {
            this.elements.cardsRemaining.textContent = this.cardsRemaining
        }
        if (this.elements.errors) {
            this.elements.errors.textContent = this.errors
        }
        if (this.elements.score) {
            this.elements.score.textContent = this.score
        }
        if (this.elements.setsFound) {
            this.elements.setsFound.textContent = this.setsFound
        }
    }

    //Actualiza las cartas restantes cuando se encuentran o se añaden cartas
    updateCardsRemaining(cardsUsed) {   //cardsUsed - Número de cartas usadas (positivo) o añadidas (negativo)
        this.cardsRemaining -= cardsUsed
        if (this.cardsRemaining < 0) {
            this.cardsRemaining = 0
        }
        this.updateDisplay()
    }

    //Incrementa el contador de errores
    addError() {
        this.errors++
        this.updateDisplay()
    }

    //Incrementa el contador de sets encontrados y actualiza la puntuación
    addSet(points = 10) {
        this.setsFound++
        this.score += points
        this.updateDisplay()
    }

    //Resta puntos por error (según el nivel del juego)
    applyPenalty(penalty = 2) {
        this.score -= penalty
        if (this.score < 0) {
            this.score = 0
        }
        this.updateDisplay()
    }

    //Obtiene el estado actual del marcador
    getState() {
        return {
            cardsRemaining: this.cardsRemaining,
            errors: this.errors,
            score: this.score,
            setsFound: this.setsFound
        }
    }
}

export { Scoreboard }
