import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function StudentScreen() {
  const [code, setCode] = useState('');
  const [location, setLocation] = useState(null);

  const submitPresence = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission de localisation refusée');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    // Ici, tu pourras envoyer le code + la localisation au backend
    alert(`Code: ${code}\nLocalisation: ${JSON.stringify(currentLocation.coords)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mode Étudiant</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer le code de session"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Envoyer ma présence" onPress={submitPresence} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
});
