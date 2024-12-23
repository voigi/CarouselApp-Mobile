// import React, { useState } from "react";
// import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import Video from "react-native-video";

// export default function PreviewModal({ visible, onClose, onSettingsTabs ,videoUri}) {
//   const [selectedOption, setSelectedOption] = useState(null); // Suivre le bouton cliqué
//   const [value, setValue] = useState(""); // Option sélectionnée dans le menu déroulant
//   const [open, setOpen] = useState(false);

//   // Transformer les options en format compatible DropDownPicker
//   const dropdownItems = selectedOption
//     ? selectedOption.options.map((option) => ({ label: option, value: option }))
//     : [];

//   return (
//     <Modal transparent={true} animationType="slide" visible={visible}>
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Aperçu de la Vidéo</Text>

//           {/* Placeholder pour la vidéo */}
//           <View style={styles.videoPlaceholder}>
//           <Video
//     source={{ uri: videoUri }} // Chemin de la vidéo
//     style={styles.videoPlayer}
//     resizeMode="contain" // Ajuste le mode de redimensionnement
//     controls // Affiche les contrôles natifs
//     type="video/mp4" // Type de fichier vidéo
//   />
//           </View>

//           {/* Boutons pour sélectionner Musique ou Transition */}
//           <View style={styles.tabsContainer}>
//             {onSettingsTabs.map((tab, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.tabButton}
//                 onPress={() => {
//                   if (selectedOption?.name !== tab.name) {
//                     // Si un nouvel onglet est sélectionné, réinitialiser la valeur et fermer le menu
//                     setSelectedOption(tab);
//                     setValue(""); // Réinitialise le placeholder
//                     setOpen(false); // Ferme le menu déroulant si ouvert
//                   } else {
//                     // Si on reclique sur le même onglet, le placeholder est réinitialisé
//                     setValue(""); // Réinitialise aussi
//                   }
//                 }}
//               >
//                 <Text style={styles.tabText}>{tab.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Menu déroulant conditionnel */}
//           {selectedOption && (
//             <DropDownPicker
//               open={open}
//               value={value}
//               items={dropdownItems} // Injecte les options transformées ici
//               setOpen={setOpen}
//               setValue={setValue}
//               placeholder={`Sélectionnez une option pour ${selectedOption.name}`}
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           )}

//           {/* Bouton pour fermer la modal */}
//           <Button style={styles.CloseButton} title="Fermer" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({

//   tabsContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   tabButton: {
//     marginHorizontal: 10,
//     padding: 10,
//     backgroundColor: "#ddd",
//     borderRadius: 5,
//   },
//   tabText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 20,
//   },
//   videoPlaceholder: {
//     width: "100%",
//     height: 200,
//     backgroundColor: "#ddd",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   dropdown: {
//     backgroundColor: "#f0f0f0",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom:20

//   },
//   dropdownContainer: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,

//   },
// });

import React, { useState } from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

const App = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState('');

  const convertVideo = async () => {
    console.log('FFmpegKit is:', FFmpegKit);  // Vérifie si le module est correctement importé
    setIsConverting(true);
    const inputFilePath = '/path/to/input/video.mp4';
    const outputFilePath = '/path/to/output/video.mp4';

    // Commande pour convertir la vidéo
    const command = `-i ${inputFilePath} ${outputFilePath}`;
    
    // Exécution de la commande FFmpeg
    FFmpegKit.execute(command).then((result) => {
      setMessage(`Conversion réussie : ${result.returnCode}`);
      setIsConverting(false);
    }).catch((error) => {
      setMessage(`Erreur lors de la conversion : ${error}`);
      setIsConverting(false);
    });
  };

  return (
    <View>
      <Button
        title={isConverting ? "Conversion en cours..." : "Convertir vidéo"}
        onPress={convertVideo}
        disabled={isConverting}
      />
      {message && <Text>{message}</Text>}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;


