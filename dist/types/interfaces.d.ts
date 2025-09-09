/**
 * Interfaces TypeScript pour le jeu Pac-Man
 * Utilisation des contraintes techniques : Interfaces, Typage strict, Types unions
 */
export interface Position {
    x: number;
    y: number;
}
export type Direction = 'up' | 'down' | 'left' | 'right';
export interface GameEntity {
    position: Position;
    color: string;
    direction?: Direction;
}
export interface GameState {
    score: number;
    totalDots: number;
    gameOver: boolean;
    victory: boolean;
    isRunning: boolean;
}
export interface GridCell {
    type: 'wall' | 'path' | 'dot';
    hasDot: boolean;
    element?: HTMLElement;
}
export interface GameControls {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}
export interface GameConfig {
    gridWidth: number;
    gridHeight: number;
    cellSize: number;
    playerSpeed: number;
    enemySpeed: number;
}
export interface GameEvent {
    type: 'collision' | 'dotCollected' | 'gameOver' | 'victory';
    data?: any;
}
