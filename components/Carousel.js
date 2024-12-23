import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';


export default function Carousel({mediaList,autoScroll}) {

//remplacer par imageUri pour la  source  de Image , imageuri est uploader via le button situé ds MediaUploader.js

const [currentIndex, setCurrentIndex] = useState(0);  // Index de l'image affichée
const intervalRef = useState(null);

// Fonction pour afficher l'image suivante
const nextImage = () => {
  if (currentIndex < mediaList.length - 1) {
    setCurrentIndex(currentIndex + 1);  // Passer à l'image suivante
  }
};

// Fonction pour afficher l'image précédente
const prevImage = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);  // Retourner à l'image précédente
  }
};
    // Fonction pour démarrer le défilement automatique
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
  
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % mediaList.length;
          return nextIndex;
        });
      }, 3000); // Défilement toutes les 3 secondes
    };
  
    // Fonction pour arrêter le défilement automatique
    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    const safeAutoScroll = autoScroll || 'Non';
    // Effet pour démarrer ou arrêter le défilement automatique en fonction de `autoScroll`
    useEffect(() => {
      console.log("autoScroll:", autoScroll);  // Vérifie la valeur de autoScroll
      if (safeAutoScroll === 'Oui') {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Nettoyer l'intervalle
        }
      };
    }, [safeAutoScroll]);  // Suivre les changements de `autoScroll`
    
  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carousel}>
        {/* Placeholder for dynamic media */}
        {mediaList.length > 0 && (
          <Image
            key={currentIndex}
            source={{ uri: mediaList[currentIndex].uri }}  // Utiliser l'URI de l'image
            style={styles.carouselItem}
          />
        )}

 
      </View>
      <TouchableOpacity style={[styles.carouselButton, styles.prev]} onPress={prevImage}>
        <Text style={styles.buttonText}>&#10094;</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.carouselButton, styles.next]} onPress={nextImage}>
        <Text style={styles.buttonText}>&#10095;</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    maxWidth: 1200,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  prev: {
    left: 10,
  },
  next: {
    right: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});
