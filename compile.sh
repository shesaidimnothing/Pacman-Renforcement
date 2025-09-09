#!/bin/bash

# Script simple de compilation TypeScript
echo "🔨 Compilation TypeScript..."

tsc

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie!"
    echo "🌐 Vous pouvez maintenant ouvrir index.html dans votre navigateur"
else
    echo "❌ Erreur de compilation!"
    exit 1
fi
