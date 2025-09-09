# 🎮 Instructions de Compilation et Test

## 🔧 Auto-compilation TypeScript

### Option 1: Script Shell (Recommandé)
```bash
# Auto-compilation en mode watch (surveille les changements)
./watch.sh

# Compilation simple
./compile.sh
```

### Option 2: NPM
```bash
# Auto-compilation avec npm
npm run watch
# ou
npm run dev

# Compilation simple
npm run build

# Démarrer avec serveur
npm start
```

### Option 3: TypeScript direct
```bash
# Auto-compilation
tsc --watch

# Compilation simple
tsc
```

## 🐛 Debug de l'Ennemi qui ne Bouge Pas

J'ai ajouté beaucoup de logs de debug pour diagnostiquer le problème. Voici comment procéder :

### 1. Compiler le code
```bash
./compile.sh
```

### 2. Ouvrir le jeu dans le navigateur
- Ouvrir `index.html` dans Chrome/Firefox
- Ouvrir la Console de Développement (F12 → Console)

### 3. Tester le jeu
1. Cliquer sur "Démarrer le jeu"
2. Observer les logs dans la console

### 4. Logs à surveiller
Vous devriez voir :
```
🚀 Démarrage du jeu...
🔍 Vérification positions de départ...
👻 Position initiale ennemi: {x: 13, y: 1}
🟨 Position initiale joueur: {x: 1, y: 1}
👻 Enemy update - Time: 1234.567, LastMove: 0, Interval: 800
👻 Position actuelle: (13, 1), Direction: up/down/left/right
👻 C'est le moment de bouger!
👻 ENNEMI BOUGE vers: [direction] à la position (x, y)
```

## 🔍 Problèmes Potentiels

### Si l'ennemi ne bouge toujours pas :

1. **Position dans un mur** : Vérifier les logs "est mur?"
2. **Pas de directions valides** : Vérifier "Directions valides: []"
3. **Problème de timing** : Vérifier les logs de temps
4. **Élément DOM manquant** : Vérifier que l'élément #enemy existe

### Solutions de Debugging

1. **Changer la position initiale de l'ennemi** :
   ```typescript
   // Dans Game.ts, ligne ~162
   const enemyStart: Position = { x: 7, y: 5 }; // Position centrale
   ```

2. **Réduire l'intervalle de mouvement** :
   ```typescript
   // Dans Game.ts, ligne ~34
   enemySpeed: 300 // Plus rapide pour voir le mouvement
   ```

3. **Forcer une direction** :
   ```typescript
   // Dans Enemy.ts, après la ligne ~32
   this.direction = 'right'; // Forcer une direction de départ
   ```

## 🎯 Test Rapide

Pour un test rapide, modifiez temporairement ces valeurs dans `src/core/Game.ts` :

```typescript
this.config = {
  gridWidth: 15,
  gridHeight: 10,
  cellSize: 40,
  playerSpeed: 300, // Plus lent pour voir
  enemySpeed: 400   // Plus rapide pour voir
};
```

Et dans `setupEntities()` :
```typescript
const enemyStart: Position = { x: 7, y: 5 }; // Position centrale sûre
```

Puis recompiler avec `./compile.sh` et tester !
