import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {uploadFileAwsSdk } from './aws-s3';

function App() {
    const [image, setImage] = useState(null);
    const [randomNumber, setRandomNumber] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Will try to upload the image to S3
    const initiateOp = async () =>{
        const file = document.querySelector('input[type="file"]').files[0];
        const { response, checksum } = await uploadFileAwsSdk(file);
        return {response, checksum};
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <input type="button" value="Upload image" onClick={() => initiateOp()} />
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