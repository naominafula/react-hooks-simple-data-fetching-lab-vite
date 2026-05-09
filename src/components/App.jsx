import React, { useState, useEffect } from 'react';

function App() {
  // State for storing the dog image URL
  const [dogImage, setDogImage] = useState(null);
  // State for managing the loading message
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://dog.ceo/api/breeds/image/random";

  // Logic to fetch a new dog image
  const fetchDogImage = () => {
    setIsLoading(true);
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // According to Dog CEO API docs, the image URL is in the 'message' property
        setDogImage(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the dog image:", error);
        setIsLoading(false);
      });
  };

  // Task: Load a random dog image when the app first loads
  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Random Dog Fetcher</h1>

      {/* Task: Display a loading message while waiting for API requests */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img 
            src={dogImage} 
            alt="A random dog" 
            style={{ maxWidth: '500px', borderRadius: '8px' }} 
          />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {/* Task: Allow user to change the dog image by a button click */}
        <button onClick={fetchDogImage} disabled={isLoading}>
          {isLoading ? "Fetching..." : "Get New Dog!"}
        </button>
      </div>
    </div>
  );
}

export default App;