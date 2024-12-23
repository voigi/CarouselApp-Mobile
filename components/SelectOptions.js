import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";


export default function SelectOptions() {

    const [open, setOpen] = useState(false); // Gère l'ouverture du dropdown
    const [value, setValue] = useState(null); // Gère la sélection
    const [selectedOption, setSelectedOption] = useState(null); // Gère l'option active
  
    // Options pour chaque catégorie
    const options = {
      Musique: [
        { label: "Classique", value: "Classique" },
        { label: "Jazz", value: "Jazz" },
        { label: "Pop", value: "Pop" },
        { label: "Rock", value: "Rock" },
      ],
      Transition: [
        { label: "Fondu", value: "Fondu" },
        { label: "Diapositive", value: "Diapositive" },
        { label: "Zoom", value: "Zoom" },
        { label: "Rotation", value: "Rotation" },
      ],
    };
  
    return (
      <View style={styles.container}>
        {/* Boutons pour sélectionner la catégorie */}
        <View style={styles.buttonContainer}>
          <Button title="Musique" onPress={() => setSelectedOption("Musique")} />
          <Button
            title="Transition"
            onPress={() => setSelectedOption("Transition")}
          />
        </View>
  
        {/* Dropdown pour l'option sélectionnée */}
        {selectedOption && (
          <DropDownPicker
            open={open}
            value={value}
            items={options[selectedOption]}
            setOpen={setOpen}
            setValue={setValue}
            placeholder="Sélectionnez une option"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    dropdown: {
      backgroundColor: "#f0f0f0",
      borderColor: "#ccc",
    },
    dropdownContainer: {
      backgroundColor: "#ffffff",
    },
  });