/**
 * Interfaces TypeScript pour le jeu Pac-Man
 * Utilisation des contraintes techniques : Interfaces, Typage strict, Types unions
 */

// Interface pour les positions dans la grille
export interface Position {
  x: number;
  y: number;
}

// Type union pour les directions - Contrainte technique : Types unions
export type Direction = 'up' | 'down' | 'left' | 'right';

// Interface pour les entités de jeu (joueur, ennemi)
export interface GameEntity {
  position: Position;
  color: string;
  direction?: Direction; // Optional chaining utilisé ailleurs
}

// Interface pour l'état global du jeu
export interface GameState {
  score: number;
  totalDots: number;
  gameOver: boolean;
  victory: boolean;
  isRunning: boolean;
}

// Interface pour les cellules de la grille
export interface GridCell {
  type: 'wall' | 'path' | 'dot';
  hasDot: boolean;
  element?: HTMLElement;
}

// Interface pour les contrôles du jeu
export interface GameControls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

// Interface pour la configuration du jeu
export interface GameConfig {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  playerSpeed: number;
  enemySpeed: number;
}

// Interface pour les événements de jeu
export interface GameEvent {
  type: 'collision' | 'dotCollected' | 'gameOver' | 'victory';
  data?: any;
}
