import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { generateExpiringCode } from '../utils/codeGenerator'; 

export default function ProfessorScreen() {
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (expiresAt) {
      const interval = setInterval(() => {
        const remainingTime = Math.max(0, expiresAt - Date.now());
        setTimeLeft(Math.floor(remainingTime / 1000));

        if (remainingTime === 0) {
          setSessionCode(null);
          setExpiresAt(null);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  const createSession = () => {
    const { code, expiresAt } = generateExpiringCode(5); // 5 minutes
    setSessionCode(code);
    setExpiresAt(expiresAt);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mode Professeur</Text>
      <Button title="Créer une session" onPress={createSession} disabled={!!sessionCode} />
      
      {sessionCode && (
        <>
          <Text style={styles.code}>Code de session: {sessionCode}</Text>
          {timeLeft !== null && <Text style={styles.timer}>Expire dans : {timeLeft} sec</Text>}
        </>
      )}
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
  code: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  timer: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});
