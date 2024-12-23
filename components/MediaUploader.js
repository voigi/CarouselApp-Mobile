import React ,{useState}from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity,Platform ,Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as DocumentPicker from 'expo-document-picker';
 



export default function MediaUploader({ onPreview ,onMediaAdded,onImageSelect,onSelectionChange}) {

  const [selectedValue, setSelectedValue] = useState(null);
  const [document, setDocument] = useState(null);

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    // Passer la valeur sélectionnée au parent
    if (onSelectionChange) {
      onSelectionChange(value);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Types de fichiers autorisés
      });
  
      console.log('Résultat brut:', result);
  
      if (Platform.OS === 'web') {
        // Structure sur le web
        console.log('Résultat web:', result.assets[0]);
        const file = result.assets[0].file ; // Vérifie si `assets` existe
        if (file) {
          console.log('Nom du fichier (Web):', file.name);

          alert('Nom du fichier (Web): '+ file.name);
         


          const newMedia = { name: file.name}; // Exemple de structure
          onMediaAdded(newMedia);
        } else {
          console.log('Aucun fichier trouvé dans assets.');
        }
      } else {
        // Structure sur mobile
        console.log('Résultat mobile:', result.assets[0].name);
        const { name, size, uri } = result.assets[0]; // Assure-toi que ces propriétés existent
        if (name && size && uri) {
          console.log('Nom du fichier (Mobile):', result.assets[0].name);
          console.log('Taille (Mobile):', result.assets[0].size);
          console.log('URI (Mobile):', result.assets[0].uri);
          //alert('Nom du fichier (Mobile): ' + result.assets[0].name);
          Alert.alert("Fichier Selectionné", 'Nom du fichier: ' + result.assets[0].name, [{ text: "OK", onPress: () => console.log("OK Pressé") }]);
          const newMedia = {name,size,uri};
          setDocument(newMedia);
          onMediaAdded(newMedia);
          onImageSelect(result.assets[0].uri);
        } else {
          console.log('Propriétés manquantes sur mobile.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du document', error);
    }
  };
  return (
    <View style={styles.container}>

<View style={styles.uploadContainer}>
      <Text style={styles.sectionTitle}>Ajouter des Médias</Text>

      {/* Étape 1 */}
      <View style={styles.step}>
        <Text style={styles.stepText}>1. Choisir un format :</Text>
        <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'Format Carré', value: 'Format Carré' ,key: 'Format Carré' },
          { label: 'Format Portrait', value: 'Format Portrait', key: 'Format Portrait' },
          { label: 'Format Paysage', value: 'Format Paysage', key: 'Format Paysage' },
        ]}
        placeholder={{ label: "Format (e.g. Image, Carré)", value: null }}
        style={pickerSelectStyles}  />
        {selectedValue ? (
        <Text style={styles.selectedText}>Format sélectionné : {selectedValue}</Text>
      ) : null}
      </View>

      {/* Étape 2 */}
      <View style={styles.step}>
        <Text style={styles.stepText}>2. Ajouter des fichiers :</Text>
        <Button title="Choisir des fichiers" onPress={pickDocument} disabled={selectedValue === null} />
        
        {/* {document && (
          <Text style={{ marginTop: 10 }}>
            Fichier sélectionné : {document.name}
          </Text>
        )} */}
      </View>

      {/* Étape 3 */}
      <View style={styles.step}>
        <Text style={styles.stepText}>3. Activer le défilement :</Text>
        <RNPickerSelect
        onValueChange={(value) => handleSelectionChange(value)}
        items={[
          { label: 'Oui', value: 'Oui', key: 'Oui' },
          { label: 'Non', value: 'Non', key: 'Non' },
        ]}
        placeholder={{ label: "Oui / Non", value: null }}
        style={pickerSelectStyles}   />
      </View>

      <TouchableOpacity style={styles.previewButton} onPress={onPreview}>
        <Text style={styles.previewButtonText}>Configurer</Text>
      </TouchableOpacity>
    </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend tout l'espace disponible
    alignItems: 'center', // Centre horizontalement
    justifyContent: 'center', // Centre verticalement
   
  },
  uploadContainer: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  step: {
    marginBottom: 15,
  },
  stepText: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  previewButton: {
    marginTop: 10,
    backgroundColor: '#0073b1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // pour afficher l'icône dropdown
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  }
});
