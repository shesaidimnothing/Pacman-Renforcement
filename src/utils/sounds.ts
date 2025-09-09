/**
 * Gestionnaire de sons pour le jeu Pac-Man
 * Contraintes techniques utilisées : Promesses, async/await, Gestion d'erreurs
 */

// Contrainte technique : Closure pour encapsuler les sons
export const createSoundManager = () => {
  const sounds: Map<string, HTMLAudioElement> = new Map();
  
  // Contrainte technique : Fonction fléchée
  const loadSound = (name: string, path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      
      // Contrainte technique : Gestion événements
      audio.addEventListener('canplaythrough', () => {
        sounds.set(name, audio);
        console.log(`🔊 Son chargé: ${name}`);
        resolve();
      });
      
      audio.addEventListener('error', (error) => {
        console.error(`❌ Erreur chargement son ${name}:`, error);
        reject(new Error(`Impossible de charger le son: ${name}`));
      });
      
      audio.src = path;
      audio.preload = 'auto';
      audio.load();
    });
  };
  
  // Contrainte technique : async/await pour chargement
  const initializeSounds = async (): Promise<void> => {
    try {
      console.log('🎵 Initialisation des sons...');
      
      // Contrainte technique : Promise.all pour chargement parallèle
      await Promise.all([
        loadSound('death', 'styles/sounds/Pac-Man Death - Sound Effect (HD).mp3'),
        // Vous pouvez ajouter d'autres sons ici
        // loadSound('victory', 'styles/sounds/victory.mp3'),
        // loadSound('collect', 'styles/sounds/collect.mp3'),
      ]);
      
      console.log('✅ Tous les sons chargés');
    } catch (error) {
      // Contrainte technique : Gestion d'erreurs
      console.warn('⚠️ Certains sons n\'ont pas pu être chargés:', error);
    }
  };
  
  // Contrainte technique : Fonction fléchée pour jouer un son
  const playSound = (name: string, volume: number = 0.5): void => {
    const audio = sounds.get(name);
    
    if (audio) {
      try {
        audio.volume = Math.max(0, Math.min(1, volume));
        audio.currentTime = 0; // Remettre au début
        
        // Contrainte technique : Promesse pour gestion du play
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`🔊 Son joué: ${name}`);
            })
            .catch(error => {
              console.warn(`⚠️ Impossible de jouer le son ${name}:`, error);
            });
        }
      } catch (error) {
        console.warn(`⚠️ Erreur lors de la lecture du son ${name}:`, error);
      }
    } else {
      console.warn(`⚠️ Son non trouvé: ${name}`);
    }
  };
  
  // Arrêter un son
  const stopSound = (name: string): void => {
    const audio = sounds.get(name);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  
  // Vérifier si un son existe
  const hasSound = (name: string): boolean => {
    return sounds.has(name);
  };
  
  // Contrainte technique : Retour d'objet avec méthodes
  return {
    initializeSounds,
    playSound,
    stopSound,
    hasSound,
    
    // Méthodes spécifiques au jeu
    playDeath: () => playSound('death', 0.7),
    playVictory: () => playSound('victory', 0.6),
    playCollect: () => playSound('collect', 0.3),
  };
};

// Instance globale du gestionnaire de sons
export const soundManager = createSoundManager();
