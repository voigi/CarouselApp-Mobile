import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import Carousel from "./components/Carousel";
import MediaUploader from "./components/MediaUploader";
import PreviewModal from "./components/PreviewModal";



export default function App() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [autoScroll, setAutoScroll] = useState("Non");

  // Fonction pour gérer le média ajouté et récupérer l'URI
  const handleMediaAdded = (newMedia) => {
    console.log("New media added:", newMedia);
    setImageUri(newMedia.uri);
    setMediaList((prevMediaList) => [...prevMediaList, newMedia]);
  };

  // Fonction pour basculer la visibilité du modal de prévisualisation
  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };
  

  
 const onSettingsTabs = [
  { name: "Musique", options: ["Classique", "Jazz", "Pop", "Rock"] },
    { name: "Transition", options: ["Fondu", "Diapositive", "Zoom", "Rotation"]},
 ]
  

  useEffect(() => {
    console.log("mediaList updated:", mediaList);
  }, [mediaList]);

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Carrousel Intuitif</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Le carrousel sera affiché uniquement si mediaList a des éléments */}
          {mediaList.length > 0 && (
            <View style={styles.carouselContainer}>
              <Carousel mediaList={mediaList} autoScroll={autoScroll} />
            </View>
          )}

          <MediaUploader
            onPreview={togglePreview}
            onMediaAdded={handleMediaAdded}
            onSelectionChange={setAutoScroll}
          />

          {/* Affichage de la modal de prévisualisation */}
          
            {previewVisible && <PreviewModal onClose={togglePreview}  onSettingsTabs={onSettingsTabs} video="https://www.w3schools.com/html/mov_bbb.mp4"/>  }
         
        </ScrollView>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  carouselContainer: {
    width: "100%",
    marginBottom: 20,
  },
  screenContent: {
    alignItems: 'center',
    margin: 20,
  },
});
