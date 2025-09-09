/**
 * Système de gestion des scores
 * Contraintes techniques utilisées : Closures, Promesses, async/await, localStorage
 */
import { GameState } from '../types/interfaces.js';
export declare const createScoreManager: () => {
    addPoints: (points: number) => number;
    getScore: () => number;
    resetScore: () => void;
    calculateDotScore: () => number;
    calculateVictoryBonus: () => number;
};
export declare const saveHighScore: (score: number) => Promise<boolean>;
export declare const loadGameData: () => Promise<{
    highScore: number;
    lastScore: number;
}>;
export declare const getHighScore: () => number;
export declare const saveLastScore: (score: number) => void;
export declare const getLastScore: () => number;
export declare const initializeScoring: () => Promise<{
    highScore: number;
    lastScore: number;
    isNewSession: boolean;
}>;
export declare const saveScoreWithTimeout: (score: number, timeout?: number) => Promise<boolean>;
export declare const calculateFinalScore: (gameState: GameState) => number;
export declare const formatScore: (score: number) => string;
