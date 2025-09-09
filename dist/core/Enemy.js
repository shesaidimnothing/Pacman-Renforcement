/**
 * Classe Enemy - Gestion de l'ennemi avec IA simple
 * Contraintes techniques utilisées : Classes, IA automatique, requestAnimationFrame
 */
import { getValidDirections, getNextPosition, getDistance } from '../utils/collision.js';
export class Enemy {
    constructor(startPosition, element, walls, moveInterval = 500 // Vitesse de déplacement en ms
    ) {
        // Contrainte technique : Fonction fléchée comme méthode
        this.update = (currentTime, playerPosition) => {
            // Vérifier si c'est le moment de bouger
            const timeDiff = currentTime - this.lastMoveTime;
            if (timeDiff < this.moveInterval) {
                return false;
            }
            // Mettre à jour la cible si le joueur est fourni
            if (playerPosition) {
                this.setTarget(playerPosition);
                // 30% de chance de suivre le joueur, 70% mouvement aléatoire
                if (Math.random() < 0.3) {
                    this.moveTowardsTarget();
                }
                else {
                    this.chooseSmartDirection();
                }
            }
            else {
                this.chooseSmartDirection();
            }
            // Effectuer le mouvement
            if (this.direction) {
                const validDirections = getValidDirections(this.position, this.walls);
                // Si la direction actuelle n'est plus valide, en choisir une nouvelle
                if (!validDirections.includes(this.direction)) {
                    this.chooseSmartDirection();
                }
                // Tenter le mouvement
                if (this.direction && validDirections.includes(this.direction)) {
                    const nextPosition = getNextPosition(this.position, this.direction);
                    // Contrainte technique : Spread operator
                    this.position = { ...nextPosition };
                    this.updateVisualPosition();
                    this.lastMoveTime = currentTime;
                    // Debug simplifié
                    console.log(`👻 Ennemi bouge vers ${this.direction} → (${this.position.x}, ${this.position.y})`);
                    return true;
                }
            }
            return false;
        };
        // Contrainte technique : Spread operator
        this.position = { ...startPosition };
        this.color = '#ff0000'; // Rouge
        this.element = element;
        this.walls = walls;
        this.moveInterval = moveInterval;
        this.lastMoveTime = 0; // Utiliser 0 pour permettre le mouvement immédiat
        // Initialiser avec une direction aléatoire
        this.chooseRandomDirection();
        this.updateVisualPosition();
    }
    // IA simple : choisir une direction aléatoire parmi les possibles
    chooseRandomDirection() {
        const validDirections = getValidDirections(this.position, this.walls);
        if (validDirections.length > 0) {
            // Contrainte technique : Math.random pour IA
            const randomIndex = Math.floor(Math.random() * validDirections.length);
            this.direction = validDirections[randomIndex];
        }
    }
    // IA améliorée : éviter de revenir en arrière
    chooseSmartDirection() {
        const validDirections = getValidDirections(this.position, this.walls);
        if (validDirections.length === 0)
            return;
        // Éviter la direction opposée si possible
        const oppositeDirection = this.getOppositeDirection();
        let filteredDirections = validDirections.filter(dir => dir !== oppositeDirection);
        // Si toutes les directions mènent en arrière, accepter n'importe laquelle
        if (filteredDirections.length === 0) {
            filteredDirections = validDirections;
        }
        // Contrainte technique : Fonction fléchée dans méthode
        const selectDirection = () => {
            const randomIndex = Math.floor(Math.random() * filteredDirections.length);
            return filteredDirections[randomIndex];
        };
        this.direction = selectDirection();
    }
    // Obtenir la direction opposée à la direction actuelle
    getOppositeDirection() {
        if (!this.direction)
            return undefined;
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };
        return opposites[this.direction];
    }
    // IA pour suivre le joueur (optionnel)
    setTarget(targetPosition) {
        // Contrainte technique : Destructuration
        const { x, y } = targetPosition;
        this.targetPosition = { x, y };
    }
    // Choisir la direction pour se rapprocher de la cible
    moveTowardsTarget() {
        if (!this.targetPosition) {
            this.chooseSmartDirection();
            return;
        }
        const validDirections = getValidDirections(this.position, this.walls);
        if (validDirections.length === 0)
            return;
        // Calculer la meilleure direction vers la cible
        let bestDirection = validDirections[0];
        let shortestDistance = Infinity;
        validDirections.forEach(direction => {
            const nextPos = getNextPosition(this.position, direction);
            const distance = getDistance(nextPos, this.targetPosition);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                bestDirection = direction;
            }
        });
        this.direction = bestDirection;
    }
    // Contrainte technique : Modification styles DOM
    updateVisualPosition() {
        // Contrainte technique : Template literals
        const cellSize = 40; // 40px par cellule
        const padding = 20; // Padding du game-area
        const x = this.position.x * cellSize + padding;
        const y = this.position.y * cellSize + padding;
        // Contrainte technique : element.style pour déplacements
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    // Réinitialiser l'ennemi
    reset(startPosition) {
        // Contrainte technique : Destructuration
        const { x, y } = startPosition;
        this.position.x = x;
        this.position.y = y;
        this.lastMoveTime = 0; // Réinitialiser à 0 pour permettre le mouvement immédiat
        this.targetPosition = undefined;
        this.chooseRandomDirection();
        this.updateVisualPosition();
    }
    // Getter pour la position
    getPosition() {
        // Contrainte technique : Spread operator
        return { ...this.position };
    }
    // Changer la vitesse de l'ennemi
    setSpeed(newInterval) {
        this.moveInterval = Math.max(100, newInterval); // Minimum 100ms
    }
    // Obtenir la vitesse actuelle
    getSpeed() {
        return this.moveInterval;
    }
    // Vérifier si l'ennemi peut se déplacer
    canMove() {
        if (!this.direction)
            return false;
        const validDirections = getValidDirections(this.position, this.walls);
        return validDirections.includes(this.direction);
    }
    // Forcer un changement de direction
    forceDirectionChange() {
        this.chooseSmartDirection();
    }
    // Cacher l'ennemi (pour la victoire)
    hide() {
        this.element.style.display = 'none';
    }
    // Montrer l'ennemi
    show() {
        this.element.style.display = 'flex';
    }
}
//# sourceMappingURL=Enemy.js.map