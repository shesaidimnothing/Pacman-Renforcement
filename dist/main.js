/**
 * Point d'entrée principal du jeu Pac-Man
 * Contraintes techniques utilisées : Modules ES6+, DOM, Événements, async/await
 */
// Contrainte technique : Modules ES6+ avec import
import { Game } from './core/Game.js';
import { initializeScoring } from './utils/scoring.js';
// Contrainte technique : let/const pour déclarations
const GAME_CONTAINER_ID = 'game-container';
let gameInstance = null;
// Contrainte technique : async/await pour initialisation
const initializeApp = async () => {
    try {
        console.log('🎮 Initialisation du jeu Pac-Man...');
        // Contrainte technique : Promesses avec .then()/.catch()
        const container = await getGameContainer()
            .then(element => {
            console.log('✅ Container de jeu trouvé');
            return element;
        })
            .catch(error => {
            console.error('❌ Erreur container:', error);
            throw error;
        });
        // Contrainte technique : await pour opération asynchrone
        const scoringData = await initializeScoring();
        // Contrainte technique : Template literals
        console.log(`📊 Données de scoring chargées: Record = ${scoringData.highScore}`);
        // Créer l'instance du jeu
        gameInstance = new Game(container);
        // Configurer les contrôles de l'interface
        setupGameControls();
        // Afficher les informations de démarrage
        displayWelcomeMessage(scoringData.highScore);
        console.log('🚀 Jeu initialisé avec succès!');
    }
    catch (error) {
        // Contrainte technique : Gestion erreurs avec try/catch
        console.error('💥 Erreur lors de l\'initialisation:', error);
        displayErrorMessage('Erreur de chargement du jeu');
    }
};
// Contrainte technique : Promesse pour récupération d'élément DOM
const getGameContainer = () => {
    return new Promise((resolve, reject) => {
        const container = document.getElementById(GAME_CONTAINER_ID);
        if (container) {
            resolve(container);
        }
        else {
            reject(new Error(`Container '${GAME_CONTAINER_ID}' introuvable`));
        }
    });
};
// Configuration des contrôles de jeu
const setupGameControls = () => {
    // Contrainte technique : Gestion événements avec addEventListener
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    if (startButton) {
        // Contrainte technique : Fonction fléchée dans addEventListener
        startButton.addEventListener('click', async () => {
            if (gameInstance) {
                try {
                    await gameInstance.startGame();
                    updateButtonStates(true);
                }
                catch (error) {
                    console.error('Erreur démarrage:', error);
                }
            }
        });
    }
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            if (gameInstance) {
                gameInstance.restartGame();
                updateButtonStates(false);
            }
        });
    }
    // Contrainte technique : Événements clavier globaux
    document.addEventListener('keydown', handleGlobalKeyPress);
};
// Contrainte technique : Fonction fléchée pour gestion clavier
const handleGlobalKeyPress = (event) => {
    // Contrainte technique : Destructuration
    const { code, ctrlKey } = event;
    // Raccourcis clavier
    if (ctrlKey) {
        switch (code) {
            case 'KeyS': // Ctrl+S pour démarrer
                event.preventDefault();
                if (gameInstance) {
                    gameInstance.startGame();
                    updateButtonStates(true);
                }
                break;
            case 'KeyR': // Ctrl+R pour redémarrer
                event.preventDefault();
                if (gameInstance) {
                    gameInstance.restartGame();
                    updateButtonStates(false);
                }
                break;
        }
    }
    // Échap pour pause/arrêt
    if (code === 'Escape' && gameInstance) {
        const gameState = gameInstance.getGameState();
        if (gameState.isRunning) {
            // Note: Ici on pourrait implémenter une pause
            console.log('Échap pressé - fonctionnalité pause à implémenter');
        }
    }
};
// Mise à jour des états des boutons
const updateButtonStates = (gameStarted) => {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    if (startButton) {
        startButton.disabled = gameStarted;
        // Contrainte technique : Modification styles
        startButton.style.opacity = gameStarted ? '0.5' : '1';
    }
    if (restartButton) {
        restartButton.disabled = !gameStarted;
        restartButton.style.opacity = gameStarted ? '1' : '0.5';
    }
};
// Affichage du message de bienvenue
const displayWelcomeMessage = (highScore) => {
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        // Contrainte technique : Template literals
        const welcomeText = `
      🎮 Bienvenue dans Pac-Man Simplifié!
      
      🏆 Meilleur score: ${highScore} points
      
      🎯 Objectif: Collectez tous les points jaunes
      ⚠️  Évitez le carré rouge (ennemi)
      
      🎮 Contrôles:
      • Flèches du clavier ou WASD pour bouger
      • Ctrl+S pour démarrer
      • Ctrl+R pour redémarrer
      
      Cliquez sur "Démarrer" pour commencer!
    `;
        welcomeElement.textContent = welcomeText;
    }
};
// Affichage des messages d'erreur
const displayErrorMessage = (message) => {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        // Contrainte technique : Manipulation DOM
        errorElement.textContent = `❌ ${message}`;
        errorElement.style.display = 'block';
        errorElement.style.color = '#ff0000';
    }
};
// Contrainte technique : Closure pour statistiques de performance
const createPerformanceTracker = () => {
    let startTime = 0;
    let frameCount = 0;
    return {
        start: () => {
            startTime = performance.now();
            frameCount = 0;
        },
        frame: () => {
            frameCount++;
        },
        // Contrainte technique : Fonction fléchée dans closure
        getStats: () => {
            const elapsed = performance.now() - startTime;
            const fps = frameCount / (elapsed / 1000);
            // Contrainte technique : Template literals
            return `FPS: ${fps.toFixed(1)} | Frames: ${frameCount}`;
        }
    };
};
// Instance du tracker de performance
const performanceTracker = createPerformanceTracker();
// Contrainte technique : Gestion du cycle de vie de l'application
const handleApplicationLifecycle = () => {
    // Nettoyage lors de la fermeture
    window.addEventListener('beforeunload', () => {
        if (gameInstance) {
            gameInstance.cleanup();
            console.log('🧹 Nettoyage effectué');
        }
    });
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('⏸️  Page masquée - jeu en pause');
            // Ici on pourrait mettre en pause le jeu
        }
        else {
            console.log('▶️  Page visible - jeu reprend');
            // Ici on pourrait reprendre le jeu
        }
    });
};
// Contrainte technique : Promise.all pour initialisation parallèle
const loadGameAssets = async () => {
    console.log('📦 Chargement des ressources...');
    // Simulation de chargement d'assets
    const loadPromises = [
        // Contrainte technique : new Promise
        new Promise(resolve => setTimeout(resolve, 100)), // Simulation CSS
        new Promise(resolve => setTimeout(resolve, 150)), // Simulation sons
        new Promise(resolve => setTimeout(resolve, 50)) // Simulation images
    ];
    try {
        // Contrainte technique : Promise.all pour opérations parallèles
        await Promise.all(loadPromises);
        console.log('✅ Toutes les ressources chargées');
    }
    catch (error) {
        console.error('❌ Erreur chargement ressources:', error);
        throw error;
    }
};
// Contrainte technique : Fonction principale avec async/await
const main = async () => {
    try {
        console.log('🚀 Démarrage de l\'application...');
        // Démarrer le tracker de performance
        performanceTracker.start();
        // Contrainte technique : await pour attendre le chargement
        await loadGameAssets();
        // Initialiser l'application
        await initializeApp();
        // Configurer le cycle de vie
        handleApplicationLifecycle();
        console.log('✨ Application prête!');
    }
    catch (error) {
        console.error('💥 Erreur fatale:', error);
        displayErrorMessage('Impossible de démarrer le jeu');
    }
};
// Contrainte technique : Événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM chargé, initialisation...');
    // Contrainte technique : Appel de fonction async
    main().catch(error => {
        console.error('Erreur main:', error);
    });
});
// Export pour utilisation éventuelle dans d'autres modules
// Contrainte technique : export ES6+
export { gameInstance, performanceTracker };
//# sourceMappingURL=main.js.map