/**
 * Utilitaires de détection de collision
 * Contraintes techniques utilisées : ES6+, Destructuration, Optional chaining
 */
import { Position, GameEntity, Direction } from '../types/interfaces.js';
export declare const isValidPosition: (position: Position) => boolean;
export declare const getPositionKey: (position: Position) => string;
export declare const isWall: (position: Position, walls: Set<string>) => boolean;
export declare const getNextPosition: (currentPosition: Position, direction: Direction) => Position;
export declare const checkEntityCollision: (entity1: GameEntity, entity2: GameEntity) => boolean;
export declare const canMoveTo: (currentPosition: Position, direction: Direction, walls: Set<string>) => boolean;
export declare const createCollisionDetector: (walls: Set<string>) => (position: Position) => boolean;
export declare const getDistance: (pos1: Position, pos2: Position) => number;
export declare const getValidDirections: (position: Position, walls: Set<string>) => Direction[];
