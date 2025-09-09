/**
 * Classe Game - Gestionnaire principal du jeu
 * Contraintes techniques utilisées : requestAnimationFrame, Gestion état centralisée, async/await
 */
import { GameState } from '../types/interfaces.js';
export declare class Game {
    private gameState;
    private config;
    private player;
    private enemy;
    private walls;
    private dots;
    private animationId;
    private scoreManager;
    private gameContainer;
    private scoreElement;
    private messageElement;
    constructor(container: HTMLElement);
    private initializeDOM;
    private initializeGame;
    private setupGrid;
    private setupEntities;
    startGame: () => Promise<void>;
    private gameLoop;
    private checkCollisions;
    private checkDotCollection;
    private removeDotFromDOM;
    private checkWinCondition;
    private endGame;
    restartGame(): void;
    private updateDisplay;
    private showMessage;
    private showVictoryMessage;
    private hideMessage;
    getGameState(): GameState;
    cleanup(): void;
}
