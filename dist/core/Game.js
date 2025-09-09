/**
 * Classe Game - Gestionnaire principal du jeu
 * Contraintes techniques utilisées : requestAnimationFrame, Gestion état centralisée, async/await
 */
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { checkEntityCollision } from '../utils/collision.js';
import { createScoreManager, saveHighScore, initializeScoring } from '../utils/scoring.js';
export class Game {
    constructor(container) {
        this.animationId = null;
        // Contrainte technique : Fonction fléchée pour démarrage
        this.startGame = async () => {
            if (this.gameState.isRunning)
                return;
            try {
                console.log('🚀 Démarrage du jeu...');
                // Contrainte technique : Spread operator
                this.gameState = {
                    ...this.gameState,
                    isRunning: true,
                    gameOver: false,
                    victory: false
                };
                this.scoreManager.resetScore();
                this.hideMessage();
                console.log('👻 Position initiale ennemi:', this.enemy.getPosition());
                console.log('🟨 Position initiale joueur:', this.player.getPosition());
                // Contrainte technique : requestAnimationFrame pour boucle de jeu
                this.gameLoop();
            }
            catch (error) {
                console.error('Erreur démarrage:', error);
            }
        };
        // Boucle principale du jeu
        this.gameLoop = (currentTime = performance.now()) => {
            if (!this.gameState.isRunning)
                return;
            // Mise à jour du joueur avec timing
            this.player.update(currentTime);
            // Mise à jour de l'ennemi avec timing
            this.enemy.update(currentTime, this.player.getPosition());
            // Vérifications de collision et logique de jeu
            this.checkCollisions();
            this.checkDotCollection();
            this.checkWinCondition();
            this.updateDisplay();
            // Contrainte technique : requestAnimationFrame pour animation fluide
            if (!this.gameState.gameOver && !this.gameState.victory) {
                this.animationId = requestAnimationFrame(this.gameLoop);
            }
        };
        this.gameContainer = container;
        // Contrainte technique : Configuration centralisée
        this.config = {
            gridWidth: 15,
            gridHeight: 10,
            cellSize: 40,
            playerSpeed: 200, // ms entre les mouvements
            enemySpeed: 800 // Plus lent que le joueur pour équilibrer
        };
        // Contrainte technique : État centralisé
        this.gameState = {
            score: 0,
            totalDots: 0,
            gameOver: false,
            victory: false,
            isRunning: false
        };
        // Contrainte technique : Closure pour gestion des scores
        this.scoreManager = createScoreManager();
        this.walls = new Set();
        this.dots = new Set();
        this.initializeDOM();
        this.initializeGame();
    }
    // Initialisation des éléments DOM
    initializeDOM() {
        // Contrainte technique : createElement pour éléments dynamiques
        this.scoreElement = document.createElement('div');
        this.scoreElement.id = 'score-display';
        this.scoreElement.className = 'score-display';
        this.messageElement = document.createElement('div');
        this.messageElement.id = 'game-message';
        this.messageElement.className = 'game-message';
        // Contrainte technique : appendChild pour ajout d'éléments
        this.gameContainer.appendChild(this.scoreElement);
        this.gameContainer.appendChild(this.messageElement);
    }
    // Contrainte technique : async/await pour initialisation
    async initializeGame() {
        try {
            // Contrainte technique : await pour opération asynchrone
            const scoringData = await initializeScoring();
            // Contrainte technique : Template literals
            console.log(`Initialisation: Meilleur score = ${scoringData.highScore}`);
            this.setupGrid();
            this.setupEntities();
            this.updateDisplay();
            if (scoringData.isNewSession) {
                this.showMessage('Bienvenue dans Pac-Man! Utilisez les flèches pour bouger.');
            }
        }
        catch (error) {
            // Contrainte technique : try/catch avec async/await
            console.error('Erreur lors de l\'initialisation:', error);
            this.showMessage('Erreur de chargement du jeu');
        }
    }
    // Configuration de la grille de jeu
    setupGrid() {
        // Définition simple de la map (1 = mur, 0 = chemin avec point)
        const mapLayout = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        // Créer la grille dans le DOM
        const gameGrid = document.getElementById('game-grid');
        if (!gameGrid)
            return;
        gameGrid.innerHTML = ''; // Nettoyer
        let dotCount = 0;
        for (let y = 0; y < this.config.gridHeight; y++) {
            for (let x = 0; x < this.config.gridWidth; x++) {
                // Contrainte technique : createElement
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                const posKey = `${x}-${y}`;
                if (mapLayout[y][x] === 1) {
                    // Mur
                    cell.classList.add('wall');
                    this.walls.add(posKey);
                }
                else {
                    // Chemin avec point
                    cell.classList.add('path', 'dot');
                    this.dots.add(posKey);
                    dotCount++;
                    // Contrainte technique : createElement pour point
                    const dot = document.createElement('div');
                    dot.className = 'dot-element';
                    cell.appendChild(dot);
                }
                gameGrid.appendChild(cell);
            }
        }
        // Contrainte technique : Spread operator pour mise à jour d'état
        this.gameState = { ...this.gameState, totalDots: dotCount };
    }
    // Configuration des entités (joueur et ennemi)
    setupEntities() {
        const playerElement = document.getElementById('player');
        const enemyElement = document.getElementById('enemy');
        if (!playerElement || !enemyElement) {
            throw new Error('Éléments joueur ou ennemi introuvables');
        }
        // Positions de départ (vérifier qu'elles ne sont pas dans des murs)
        const playerStart = { x: 1, y: 1 };
        const enemyStart = { x: 13, y: 1 }; // Position modifiée pour éviter les murs
        console.log('🔍 Vérification positions de départ...');
        console.log('Joueur en (1,1) est mur?', this.walls.has('1-1'));
        console.log('Ennemi en (13,1) est mur?', this.walls.has('13-1'));
        this.player = new Player(playerStart, playerElement, this.walls, this.config.playerSpeed);
        this.enemy = new Enemy(enemyStart, enemyElement, this.walls, this.config.enemySpeed);
    }
    // Vérification des collisions
    checkCollisions() {
        // Collision joueur-ennemi
        if (checkEntityCollision(this.player, this.enemy)) {
            this.endGame(false); // Défaite
        }
    }
    // Vérification de collecte des points
    checkDotCollection() {
        const playerPos = this.player.getPosition();
        const posKey = `${playerPos.x}-${playerPos.y}`;
        if (this.dots.has(posKey)) {
            // Contrainte technique : Retirer le point
            this.dots.delete(posKey);
            // Ajouter des points au score
            const points = this.scoreManager.addPoints(this.scoreManager.calculateDotScore());
            // Contrainte technique : Spread operator
            this.gameState = { ...this.gameState, score: points };
            // Retirer visuellement le point
            this.removeDotFromDOM(playerPos);
        }
    }
    // Retirer le point du DOM
    removeDotFromDOM(position) {
        const gameGrid = document.getElementById('game-grid');
        if (!gameGrid)
            return;
        const cellIndex = position.y * this.config.gridWidth + position.x;
        const cell = gameGrid.children[cellIndex];
        if (cell) {
            const dot = cell.querySelector('.dot-element');
            if (dot) {
                // Contrainte technique : Animation de disparition
                dot.style.opacity = '0';
                setTimeout(() => dot.remove(), 150);
            }
            cell.classList.remove('dot');
        }
    }
    // Vérification de la condition de victoire
    checkWinCondition() {
        if (this.dots.size === 0) {
            // Cacher l'ennemi lors de la victoire
            this.enemy.hide();
            this.endGame(true); // Victoire
        }
    }
    // Fin de partie
    async endGame(victory) {
        // Contrainte technique : Spread operator
        this.gameState = {
            ...this.gameState,
            gameOver: true,
            victory,
            isRunning: false
        };
        // Arrêter l'animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        // Calculer le score final avec bonus
        let finalScore = this.gameState.score;
        if (victory) {
            finalScore += this.scoreManager.calculateVictoryBonus();
            this.gameState.score = finalScore;
        }
        // Contrainte technique : async/await pour sauvegarde
        try {
            const isNewHighScore = await saveHighScore(finalScore);
            // Contrainte technique : Template literals
            const message = victory
                ? `🎉 VICTOIRE ! 🎉\n\nScore: ${finalScore} points${isNewHighScore ? '\n🏆 NOUVEAU RECORD! 🏆' : ''}\n\n🎮 Félicitations ! Tous les points collectés !`
                : `💀 DÉFAITE 💀\n\nScore final: ${finalScore} points\n\n👻 L'ennemi vous a attrapé !`;
            this.showVictoryMessage(message, victory);
        }
        catch (error) {
            console.error('Erreur sauvegarde score:', error);
            const message = victory
                ? '🎉 VICTOIRE ! 🎉\n\nTous les points collectés !'
                : '💀 DÉFAITE 💀\n\nL\'ennemi vous a attrapé !';
            this.showVictoryMessage(message, victory);
        }
    }
    // Redémarrage du jeu
    restartGame() {
        // Réinitialiser l'état
        this.gameState = {
            score: 0,
            totalDots: 0,
            gameOver: false,
            victory: false,
            isRunning: false
        };
        // Réinitialiser les entités
        this.player.reset({ x: 1, y: 1 });
        this.enemy.reset({ x: 13, y: 1 });
        // Remettre l'ennemi visible
        this.enemy.show();
        // Réinitialiser la grille
        this.setupGrid();
        this.scoreManager.resetScore();
        this.hideMessage();
    }
    // Mise à jour de l'affichage
    updateDisplay() {
        // Contrainte technique : Template literals
        this.scoreElement.textContent = `Score: ${this.gameState.score} | Points restants: ${this.dots.size}`;
    }
    // Afficher un message
    showMessage(text) {
        this.messageElement.textContent = text;
        this.messageElement.style.display = 'block';
    }
    // Afficher un grand message de victoire/défaite
    showVictoryMessage(text, victory) {
        this.messageElement.innerHTML = text.replace(/\n/g, '<br>');
        this.messageElement.style.display = 'block';
        // Styles spéciaux pour victoire/défaite
        if (victory) {
            this.messageElement.className = 'game-message victory-message';
            this.messageElement.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
            this.messageElement.style.fontSize = '1.8rem';
            this.messageElement.style.padding = '30px';
            this.messageElement.style.textAlign = 'center';
            this.messageElement.style.borderRadius = '15px';
            this.messageElement.style.boxShadow = '0 10px 30px rgba(39, 174, 96, 0.4)';
            this.messageElement.style.animation = 'victoryPulse 2s ease-in-out infinite alternate';
        }
        else {
            this.messageElement.className = 'game-message defeat-message';
            this.messageElement.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            this.messageElement.style.fontSize = '1.6rem';
            this.messageElement.style.padding = '25px';
            this.messageElement.style.textAlign = 'center';
            this.messageElement.style.borderRadius = '15px';
            this.messageElement.style.boxShadow = '0 10px 30px rgba(231, 76, 60, 0.4)';
        }
    }
    // Cacher le message
    hideMessage() {
        this.messageElement.style.display = 'none';
        this.messageElement.className = 'game-message';
    }
    // Getter pour l'état du jeu
    getGameState() {
        // Contrainte technique : Spread operator
        return { ...this.gameState };
    }
    // Nettoyage
    cleanup() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.player?.cleanup();
    }
}
//# sourceMappingURL=Game.js.map