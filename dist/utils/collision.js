/**
 * Utilitaires de détection de collision
 * Contraintes techniques utilisées : ES6+, Destructuration, Optional chaining
 */
// Contrainte technique : const pour déclaration
const GRID_WIDTH = 15;
const GRID_HEIGHT = 10;
// Contrainte technique : Fonction fléchée
export const isValidPosition = (position) => {
    // Contrainte technique : Destructuration
    const { x, y } = position;
    return x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT;
};
// Contrainte technique : Fonction fléchée avec template literals
export const getPositionKey = (position) => {
    // Contrainte technique : Template literals
    return `${position.x}-${position.y}`;
};
// Vérification si une position est un mur
export const isWall = (position, walls) => {
    return walls.has(getPositionKey(position));
};
// Calcul de la prochaine position selon la direction
export const getNextPosition = (currentPosition, direction) => {
    // Contrainte technique : Spread operator
    const nextPosition = { ...currentPosition };
    switch (direction) {
        case 'up':
            nextPosition.y -= 1;
            break;
        case 'down':
            nextPosition.y += 1;
            break;
        case 'left':
            nextPosition.x -= 1;
            break;
        case 'right':
            nextPosition.x += 1;
            break;
    }
    return nextPosition;
};
// Détection de collision entre deux entités
export const checkEntityCollision = (entity1, entity2) => {
    // Contrainte technique : Optional chaining
    const pos1 = entity1?.position;
    const pos2 = entity2?.position;
    if (!pos1 || !pos2)
        return false;
    return pos1.x === pos2.x && pos1.y === pos2.y;
};
// Vérification si le mouvement est possible
export const canMoveTo = (currentPosition, direction, walls) => {
    const nextPosition = getNextPosition(currentPosition, direction);
    if (!isValidPosition(nextPosition)) {
        return false;
    }
    return !isWall(nextPosition, walls);
};
// Contrainte technique : Closure - Fonction qui retourne une fonction
export const createCollisionDetector = (walls) => {
    // Cette closure "capture" la variable walls
    return (position) => {
        return isWall(position, walls);
    };
};
// Calcul de distance entre deux positions (pour l'IA de l'ennemi)
export const getDistance = (pos1, pos2) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
};
// Obtenir toutes les directions possibles depuis une position
export const getValidDirections = (position, walls) => {
    const directions = ['up', 'down', 'left', 'right'];
    return directions.filter(direction => canMoveTo(position, direction, walls));
};
//# sourceMappingURL=collision.js.map