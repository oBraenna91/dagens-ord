import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [word, setWord] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/word')
      .then(response => {
        setWord(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the word!", error);
      });
  }, []);

  return (
    <div>
      <h1>Dagens Ord</h1>
      {word ? (
        <div>
          <h2>{word.word}</h2>
          <p>{word.definition}</p>
        </div>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  );
}

export default App;
