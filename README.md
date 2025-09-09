# 🎮 Pac-Man Simplifié - Jeu TypeScript

Un jeu Pac-Man simplifié développé en TypeScript avec une architecture modulaire moderne, respectant toutes les contraintes techniques ES6+ et les bonnes pratiques de développement.

## 🚀 Démarrage Rapide

### Installation

```bash
# Cloner ou télécharger le projet
cd pacman-jeu

# Installer les dépendances de développement (optionnel)
npm install

# Compiler le TypeScript
npm run build

# Lancer le serveur de développement
npm run serve
```

### Lancement Direct

1. Compiler le TypeScript : `tsc` (ou `npm run build`)
2. Ouvrir `index.html` dans un navigateur moderne
3. Cliquer sur "Démarrer le jeu" ou utiliser `Ctrl+S`

## 🎯 Objectif du Jeu

- **🟡 Collectez** tous les points jaunes de la grille
- **👻 Évitez** le fantôme rouge qui se déplace automatiquement  
- **🏆 Battez** votre meilleur score sauvegardé localement

## 🎮 Contrôles

| Touche | Action |
|--------|--------|
| `↑ ↓ ← →` | Déplacement du joueur |
| `W A S D` | Déplacement alternatif |
| `Ctrl + S` | Démarrer le jeu |
| `Ctrl + R` | Redémarrer la partie |
| `Échap` | Pause (à implémenter) |

## 🏗️ Architecture du Projet

```
project/
├── index.html              # Page principale avec grille CSS
├── styles/
│   └── game.css            # Styles avec animations CSS
├── src/
│   ├── main.ts             # Point d'entrée principal
│   ├── core/               # Classes principales
│   │   ├── Game.ts         # Gestionnaire de jeu
│   │   ├── Player.ts       # Logique du joueur
│   │   └── Enemy.ts        # IA de l'ennemi
│   ├── utils/              # Utilitaires
│   │   ├── collision.ts    # Détection de collisions
│   │   └── scoring.ts      # Système de score
│   └── types/
│       └── interfaces.ts   # Interfaces TypeScript
├── dist/                   # Fichiers compilés (généré)
├── package.json            # Configuration npm
├── tsconfig.json          # Configuration TypeScript
└── README.md              # Documentation
```

## 💻 Technologies Utilisées

### TypeScript & ES6+
- ✅ **Interfaces strictes** : `Position`, `GameState`, `GameEntity`
- ✅ **Classes modernes** avec `this`, `bind`, `call`, `apply`
- ✅ **Modules ES6+** avec `import`/`export`
- ✅ **Types unions** : `'up' | 'down' | 'left' | 'right'`
- ✅ **Optional chaining** : `player?.position?.x`

### JavaScript Avancé
- ✅ **let/const** pour toutes les déclarations
- ✅ **Fonctions fléchées** : `const movePlayer = (direction) => {...}`
- ✅ **Template literals** : `` `Score: ${score}` ``
- ✅ **Destructuration** : `const { x, y } = player.position`
- ✅ **Spread operator** : `const newState = { ...gameState }`
- ✅ **Closures** : Gestionnaire de score encapsulé

### Asynchronisme
- ✅ **Promesses** : `new Promise` + `.then()`/`.catch()`
- ✅ **async/await** : Chargement et sauvegarde des données
- ✅ **try/catch** : Gestion d'erreurs robuste
- ✅ **Promise.all** : Opérations parallèles
- ✅ **Promise.race** : Timeout pour sauvegardes

### DOM & Interface
- ✅ **Manipulation DOM** : `createElement`, `appendChild`
- ✅ **Gestion événements** : `addEventListener` pour contrôles
- ✅ **Modification styles** : `element.style` pour animations
- ✅ **requestAnimationFrame** : Boucle de jeu fluide à 60 FPS

### CSS Moderne
- ✅ **CSS Grid Layout** : Grille 15x10 responsive
- ✅ **Animations CSS** : Transitions fluides et effets visuels
- ✅ **Design responsive** : Adaptation mobile et tablette
- ✅ **États visuels** : hover, active, disabled, focus

## 🔧 Contraintes Techniques Respectées

### 1. ES6+ et Fondamentaux Avancés ✅

```typescript
// let/const
const GRID_WIDTH = 15;
let gameInstance: Game | null = null;

// Fonctions fléchées
const movePlayer = (direction: Direction) => { /* ... */ };

// Template literals
const scoreHTML = `Score: ${score} points`;

// Destructuration
const { x, y } = player.position;

// Spread operator
const newState = { ...gameState, score: newScore };

// Closures
const createScoreManager = () => {
  let currentScore = 0;
  return { addPoints: (points) => currentScore += points };
};
```

### 2. DOM et Événements ✅

```typescript
// Manipulation DOM
const cell = document.createElement('div');
gameGrid.appendChild(cell);

// Gestion événements
document.addEventListener('keydown', handleKeyDown);

// Modification styles
element.style.left = `${x}px`;

// Animations
requestAnimationFrame(gameLoop);
```

### 3. Asynchronisme ✅

```typescript
// Promesses
const saveScore = (score: number): Promise<boolean> => {
  return new Promise((resolve, reject) => { /* ... */ });
};

// async/await
const initializeGame = async (): Promise<void> => {
  try {
    const data = await loadGameData();
    // ...
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Promise.all
const results = await Promise.all([loadData(), loadAssets()]);
```

### 4. TypeScript ✅

```typescript
// Interfaces
interface Position { x: number; y: number; }
interface GameState { score: number; gameOver: boolean; }

// Typage strict
public update(currentTime: number): boolean { /* ... */ }

// Optional chaining
const x = player?.position?.x ?? 0;

// Types unions
type Direction = 'up' | 'down' | 'left' | 'right';
```

### 5. Architecture ✅

- **Séparation des responsabilités** : Modules distincts pour chaque fonctionnalité
- **Gestion d'état centralisée** : État du jeu dans la classe `Game`
- **Documentation complète** : Commentaires détaillés sur les contraintes techniques

## 🎨 Fonctionnalités Implémentées

### Gameplay
- ✅ Grille de jeu 15x10 avec murs et chemins
- ✅ Déplacement fluide du joueur (carré jaune Pac-Man)
- ✅ IA simple pour l'ennemi (fantôme rouge)
- ✅ Collecte automatique des points
- ✅ Détection de collision en temps réel
- ✅ Conditions de victoire/défaite

### Interface
- ✅ Interface moderne et responsive
- ✅ Boutons de contrôle (Démarrer/Redémarrer)
- ✅ Affichage du score en temps réel
- ✅ Messages de victoire/défaite
- ✅ Informations d'aide et raccourcis

### Technique
- ✅ Sauvegarde des scores dans localStorage
- ✅ Gestion d'erreurs robuste
- ✅ Performance optimisée (60 FPS)
- ✅ Code modulaire et maintenable
- ✅ Support navigateurs modernes

## 🚀 Performance et Optimisation

- **60 FPS** : Utilisation de `requestAnimationFrame`
- **Mémoire** : Nettoyage des event listeners
- **Responsive** : Adaptation automatique à la taille d'écran
- **Accessibilité** : Support des préférences utilisateur (mouvement réduit, contraste)

## 🌐 Compatibilité Navigateur

| Navigateur | Version Minimale |
|------------|------------------|
| Chrome | 61+ |
| Firefox | 60+ |
| Safari | 10.1+ |
| Edge | 16+ |

## 🔍 Justification des Choix Techniques

### Architecture Modulaire
- **Séparation claire** des responsabilités (Game, Player, Enemy, Utils)
- **Interfaces TypeScript** pour un typage strict et une meilleure maintenance
- **Modules ES6+** pour une importation propre et un bundling efficace

### Gestion d'État
- **État centralisé** dans la classe Game pour éviter les incohérences
- **Immutabilité** avec spread operator pour les mises à jour d'état
- **Closures** pour encapsuler les données sensibles (score manager)

### Performance
- **requestAnimationFrame** pour une animation fluide synchronisée avec le rafraîchissement
- **CSS Grid** pour un layout performant et responsive
- **Event delegation** et nettoyage pour éviter les fuites mémoire

### Expérience Utilisateur
- **Animations CSS** pour des transitions fluides
- **Feedback visuel** immédiat (hover, active, focus)
- **Raccourcis clavier** pour une utilisation avancée
- **Messages d'erreur** explicites et gestion gracieuse des pannes

## 🐛 Débogage et Développement

```bash
# Mode développement avec watch
npm run dev

# Compilation simple
npm run build

# Serveur local
npm run serve
```

### Logs de Débogage
Le jeu affiche des logs détaillés dans la console :
- 🎮 Initialisation du jeu
- 📊 Chargement des données de scoring
- ⚡ Temps de chargement et performance
- 💥 Gestion des erreurs

## 📝 Améliorations Possibles

- [ ] Système de pause/reprise
- [ ] Niveaux multiples avec difficulté progressive
- [ ] Power-ups et bonus temporaires
- [ ] Son et musique de fond
- [ ] Multijoueur local
- [ ] Sauvegarde cloud des scores
- [ ] Mode plein écran
- [ ] Thèmes visuels personnalisables

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

## 👨‍💻 Développement

Développé avec ❤️ en TypeScript, respectant toutes les contraintes techniques modernes et les bonnes pratiques de développement web.

---

**🎯 Projet 100% fonctionnel au premier lancement avec toutes les contraintes techniques respectées !**
