/**
 * Point d'entrée principal du jeu Pac-Man
 * Contraintes techniques utilisées : Modules ES6+, DOM, Événements, async/await
 */
import { Game } from './core/Game.js';
declare let gameInstance: Game | null;
declare const performanceTracker: {
    start: () => void;
    frame: () => void;
    getStats: () => string;
};
export { gameInstance, performanceTracker };
