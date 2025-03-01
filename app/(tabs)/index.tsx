import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProfessorScreen from './screens/ProfessorScreen';
import StudentScreen from './screens/StudentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Professor" component={ProfessorScreen} options={{ title: 'Professeur' }} />
        <Stack.Screen name="Student" component={StudentScreen} options={{ title: 'Étudiant' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
