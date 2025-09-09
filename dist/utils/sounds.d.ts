/**
 * Gestionnaire de sons pour le jeu Pac-Man
 * Contraintes techniques utilisées : Promesses, async/await, Gestion d'erreurs
 */
export declare const createSoundManager: () => {
    initializeSounds: () => Promise<void>;
    playSound: (name: string, volume?: number) => void;
    stopSound: (name: string) => void;
    hasSound: (name: string) => boolean;
    playDeath: () => void;
    playVictory: () => void;
    playCollect: () => void;
};
export declare const soundManager: {
    initializeSounds: () => Promise<void>;
    playSound: (name: string, volume?: number) => void;
    stopSound: (name: string) => void;
    hasSound: (name: string) => boolean;
    playDeath: () => void;
    playVictory: () => void;
    playCollect: () => void;
};
