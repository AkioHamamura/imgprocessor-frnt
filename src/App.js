import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

    useEffect(() => {
        async function fetchRandomNumber() {
            const number = await getRandomNumber();
            setRandomNumber(number);
        }
        fetchRandomNumber();
    }, []);

    async function getRandomNumber() {
        const apiUrl = 'https://zrmulzpv9b.execute-api.us-east-1.amazonaws.com/prod/random';
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.body;
    }

 return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
            <p>Random number:</p>
            <p>{randomNumber}</p>
        </header>
      </div>
  );
}

export default App;
