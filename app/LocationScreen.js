import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null); // Pour stocker la position
  const [errorMsg, setErrorMsg] = useState(null); // Pour gérer les erreurs
  const [isLoading, setIsLoading] = useState(true); // Pour afficher un indicateur de chargement

  useEffect(() => {
    (async () => {
      // Demander la permission d'accéder à la localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission d\'accéder à la localisation refusée');
        setIsLoading(false);
        return;
      }

      // Récupérer la position actuelle
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
  }, []);

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de la localisation...</Text>
      </View>
    );
  }

  // Affichage en cas d'erreur
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  // Affichage des coordonnées
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Latitude: {location.coords.latitude}
      </Text>
      <Text style={styles.text}>
        Longitude: {location.coords.longitude}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;