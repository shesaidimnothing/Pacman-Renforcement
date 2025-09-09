/**
 * Classe Player - Gestion du joueur Pac-Man
 * Contraintes techniques utilisées : Classes, this/contexte, Événements DOM, bind/call/apply
 */
import { canMoveTo, getNextPosition } from '../utils/collision.js';
export class Player {
    constructor(startPosition, element, walls, moveInterval = 200 // 200ms entre les mouvements
    ) {
        // Contrainte technique : Fonction fléchée comme méthode
        this.update = (currentTime) => {
            if (!this.direction)
                return false;
            // Vérifier si assez de temps s'est écoulé depuis le dernier mouvement
            if (currentTime - this.lastMoveTime < this.moveInterval) {
                return false;
            }
            // Vérifier si le mouvement est possible
            if (canMoveTo(this.position, this.direction, this.walls)) {
                const nextPosition = getNextPosition(this.position, this.direction);
                // Contrainte technique : Spread operator pour mise à jour
                this.position = { ...nextPosition };
                this.updateVisualPosition();
                this.lastMoveTime = currentTime;
                return true;
            }
            return false;
        };
        this.position = { ...startPosition }; // Contrainte technique : Spread operator
        this.color = '#000000'; // Noir
        this.element = element;
        this.walls = walls;
        this.moveInterval = moveInterval;
        this.lastMoveTime = 0; // Commencer à 0 pour permettre le mouvement immédiat
        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.initializeControls();
        this.updateVisualPosition();
    }
    // Contrainte technique : Gestion événements avec addEventListener
    initializeControls() {
        // Contrainte technique : bind pour préserver le contexte 'this'
        const handleKeyDown = this.handleKeyDown.bind(this);
        const handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }
    // Contrainte technique : this et contexte dans les méthodes de classe
    handleKeyDown(event) {
        // Contrainte technique : Destructuration
        const { code } = event;
        // Ne traiter que si la touche n'était pas déjà pressée (évite la répétition)
        if (event.repeat)
            return;
        switch (code) {
            case 'ArrowUp':
            case 'KeyW':
                if (!this.controls.up) {
                    this.controls.up = true;
                    this.direction = 'up';
                }
                event.preventDefault();
                break;
            case 'ArrowDown':
            case 'KeyS':
                if (!this.controls.down) {
                    this.controls.down = true;
                    this.direction = 'down';
                }
                event.preventDefault();
                break;
            case 'ArrowLeft':
            case 'KeyA':
                if (!this.controls.left) {
                    this.controls.left = true;
                    this.direction = 'left';
                }
                event.preventDefault();
                break;
            case 'ArrowRight':
            case 'KeyD':
                if (!this.controls.right) {
                    this.controls.right = true;
                    this.direction = 'right';
                }
                event.preventDefault();
                break;
        }
    }
    handleKeyUp(event) {
        const { code } = event;
        switch (code) {
            case 'ArrowUp':
            case 'KeyW':
                this.controls.up = false;
                if (this.direction === 'up')
                    this.direction = undefined;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.controls.down = false;
                if (this.direction === 'down')
                    this.direction = undefined;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.controls.left = false;
                if (this.direction === 'left')
                    this.direction = undefined;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.controls.right = false;
                if (this.direction === 'right')
                    this.direction = undefined;
                break;
        }
    }
    // Contrainte technique : Modification styles DOM
    updateVisualPosition() {
        // Contrainte technique : Template literals
        const cellSize = 40; // 40px par cellule
        const padding = 20; // Padding du game-area
        const x = this.position.x * cellSize + padding;
        const y = this.position.y * cellSize + padding;
        // Contrainte technique : Modification styles avec element.style
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    // Méthode pour réinitialiser la position
    reset(startPosition) {
        // Contrainte technique : Destructuration avec renommage
        const { x: newX, y: newY } = startPosition;
        this.position.x = newX;
        this.position.y = newY;
        this.direction = undefined;
        this.lastMoveTime = 0;
        // Réinitialiser les contrôles
        Object.keys(this.controls).forEach(key => {
            // Contrainte technique : call pour appeler méthode avec contexte spécifique
            const resetControl = function (controlKey) {
                this[controlKey] = false;
            };
            resetControl.call(this.controls, key);
        });
        this.updateVisualPosition();
    }
    // Contrainte technique : apply pour appeler méthode avec arguments en tableau
    setPosition(coordinates) {
        const updatePos = (x, y) => {
            this.position.x = x;
            this.position.y = y;
            this.updateVisualPosition();
        };
        // Contrainte technique : apply avec tableau d'arguments
        updatePos.apply(null, coordinates);
    }
    // Getter pour la position actuelle
    getPosition() {
        // Contrainte technique : Spread operator pour copie
        return { ...this.position };
    }
    // Vérifier si le joueur bouge actuellement
    isMoving() {
        return Object.values(this.controls).some(control => control);
    }
    // Obtenir la direction active
    getActiveDirection() {
        if (this.controls.up)
            return 'up';
        if (this.controls.down)
            return 'down';
        if (this.controls.left)
            return 'left';
        if (this.controls.right)
            return 'right';
        return null;
    }
    // Nettoyage des event listeners
    cleanup() {
        // Contrainte technique : removeEventListener pour nettoyage
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
}
//# sourceMappingURL=Player.js.map