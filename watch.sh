#!/bin/bash

# Script d'auto-compilation TypeScript pour le jeu Pac-Man
# Ce script surveille les changements dans les fichiers .ts et recompile automatiquement

echo "🎮 Démarrage de l'auto-compilation TypeScript pour Pac-Man..."
echo "📁 Répertoire: $(pwd)"
echo "🔄 Surveillance des fichiers .ts en cours..."
echo "⏹️  Appuyez sur Ctrl+C pour arrêter"
echo ""

# Compilation initiale
echo "🔨 Compilation initiale..."
tsc

if [ $? -eq 0 ]; then
    echo "✅ Compilation initiale réussie"
else
    echo "❌ Erreur lors de la compilation initiale"
    exit 1
fi

echo ""
echo "👀 Surveillance des changements..."

# Lancer la surveillance avec TypeScript
tsc --watch --preserveWatchOutput

# Alternative si tsc --watch ne fonctionne pas bien
# Vous pouvez décommenter cette section et commenter la ligne au-dessus

# while true; do
#     # Attendre qu'un fichier .ts soit modifié
#     fswatch -1 src/**/*.ts | while read file; do
#         echo "📝 Fichier modifié: $file"
#         echo "🔨 Recompilation..."
#         
#         tsc
#         
#         if [ $? -eq 0 ]; then
#             echo "✅ Compilation réussie à $(date)"
#         else
#             echo "❌ Erreur de compilation à $(date)"
#         fi
#         echo ""
#     done
# done
