/**
 * Système de gestion des scores
 * Contraintes techniques utilisées : Closures, Promesses, async/await, localStorage
 */
// Contrainte technique : const pour configuration
const SCORE_PER_DOT = 10;
const VICTORY_BONUS = 100;
const LOCAL_STORAGE_KEY = 'pacman-highscore';
// Contrainte technique : Closure - Compteur de score encapsulé
export const createScoreManager = () => {
    let currentScore = 0;
    // Fonction interne qui utilise la closure
    return {
        addPoints: (points) => {
            currentScore += points;
            return currentScore;
        },
        getScore: () => currentScore,
        resetScore: () => {
            currentScore = 0;
        },
        // Contrainte technique : Fonction fléchée
        calculateDotScore: () => SCORE_PER_DOT,
        calculateVictoryBonus: () => VICTORY_BONUS
    };
};
// Contrainte technique : Promesse pour sauvegarde asynchrone
export const saveHighScore = (score) => {
    return new Promise((resolve, reject) => {
        try {
            const currentHighScore = getHighScore();
            if (score > currentHighScore) {
                localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());
                // Contrainte technique : Template literals
                console.log(`Nouveau record sauvegardé: ${score} points!`);
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (error) {
            // Contrainte technique : Gestion d'erreurs avec promesses
            reject(new Error('Erreur lors de la sauvegarde du score'));
        }
    });
};
// Contrainte technique : async/await
export const loadGameData = async () => {
    try {
        // Simulation d'un chargement asynchrone
        await new Promise(resolve => setTimeout(resolve, 100));
        const highScore = getHighScore();
        const lastScore = getLastScore();
        return { highScore, lastScore };
    }
    catch (error) {
        // Contrainte technique : try/catch avec async/await
        console.error('Erreur lors du chargement des données:', error);
        return { highScore: 0, lastScore: 0 };
    }
};
// Récupération du meilleur score
export const getHighScore = () => {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    }
    catch {
        return 0;
    }
};
// Sauvegarde du dernier score joué
export const saveLastScore = (score) => {
    try {
        localStorage.setItem('pacman-lastscore', score.toString());
    }
    catch (error) {
        console.error('Erreur sauvegarde dernier score:', error);
    }
};
// Récupération du dernier score
export const getLastScore = () => {
    try {
        const saved = localStorage.getItem('pacman-lastscore');
        return saved ? parseInt(saved, 10) : 0;
    }
    catch {
        return 0;
    }
};
// Contrainte technique : Promesses parallèles avec Promise.all
export const initializeScoring = async () => {
    try {
        // Contrainte technique : Opérations parallèles avec Promise.all
        const [gameData, isFirstVisit] = await Promise.all([
            loadGameData(),
            checkFirstVisit()
        ]);
        return {
            ...gameData,
            isNewSession: isFirstVisit
        };
    }
    catch (error) {
        console.error('Erreur initialisation scoring:', error);
        return { highScore: 0, lastScore: 0, isNewSession: true };
    }
};
// Vérification si c'est la première visite
const checkFirstVisit = () => {
    return new Promise(resolve => {
        const hasVisited = localStorage.getItem('pacman-visited');
        if (!hasVisited) {
            localStorage.setItem('pacman-visited', 'true');
            resolve(true);
        }
        else {
            resolve(false);
        }
    });
};
// Contrainte technique : Promise.race pour timeout
export const saveScoreWithTimeout = (score, timeout = 5000) => {
    const savePromise = saveHighScore(score);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout sauvegarde')), timeout);
    });
    // Contrainte technique : Promise.race
    return Promise.race([savePromise, timeoutPromise]);
};
// Calcul du score total avec bonus
export const calculateFinalScore = (gameState) => {
    let finalScore = gameState.score;
    if (gameState.victory) {
        finalScore += VICTORY_BONUS;
    }
    return finalScore;
};
// Formatage du score pour affichage
export const formatScore = (score) => {
    // Contrainte technique : Template literals
    return `Score: ${score.toLocaleString()} pts`;
};
//# sourceMappingURL=scoring.js.map