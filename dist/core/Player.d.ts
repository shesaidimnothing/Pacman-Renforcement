/**
 * Classe Player - Gestion du joueur Pac-Man
 * Contraintes techniques utilisées : Classes, this/contexte, Événements DOM, bind/call/apply
 */
import { GameEntity, Position, Direction } from '../types/interfaces.js';
export declare class Player implements GameEntity {
    position: Position;
    color: string;
    direction?: Direction;
    private element;
    private controls;
    private walls;
    private lastMoveTime;
    private moveInterval;
    constructor(startPosition: Position, element: HTMLElement, walls: Set<string>, moveInterval?: number);
    private initializeControls;
    private handleKeyDown;
    private handleKeyUp;
    update: (currentTime: number) => boolean;
    private updateVisualPosition;
    reset(startPosition: Position): void;
    setPosition(coordinates: [number, number]): void;
    getPosition(): Position;
    isMoving(): boolean;
    getActiveDirection(): Direction | null;
    cleanup(): void;
}
