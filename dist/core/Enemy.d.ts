/**
 * Classe Enemy - Gestion de l'ennemi avec IA simple
 * Contraintes techniques utilisées : Classes, IA automatique, requestAnimationFrame
 */
import { GameEntity, Position, Direction } from '../types/interfaces.js';
export declare class Enemy implements GameEntity {
    position: Position;
    color: string;
    direction?: Direction;
    private element;
    private walls;
    private lastMoveTime;
    private moveInterval;
    private targetPosition?;
    constructor(startPosition: Position, element: HTMLElement, walls: Set<string>, moveInterval?: number);
    private chooseRandomDirection;
    private chooseSmartDirection;
    private getOppositeDirection;
    setTarget(targetPosition: Position): void;
    private moveTowardsTarget;
    update: (currentTime: number, playerPosition?: Position) => boolean;
    private updateVisualPosition;
    reset(startPosition: Position): void;
    getPosition(): Position;
    setSpeed(newInterval: number): void;
    getSpeed(): number;
    canMove(): boolean;
    forceDirectionChange(): void;
    hide(): void;
    show(): void;
}
