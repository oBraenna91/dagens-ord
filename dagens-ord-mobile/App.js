import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [word, setWord] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.56:5001/api/word')
      .then(response => {
        setWord(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the word!", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dagens Ord</Text>
      {word ? (
        <View>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.definition}>{word.definition}</Text>
        </View>
      ) : (
        <Text>Laster...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 18,
  },
});