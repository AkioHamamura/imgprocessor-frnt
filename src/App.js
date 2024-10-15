import React, { useState } from 'react';
import logo from './logo.svg';
import {uploadFileAwsSdk } from './components/aws-s3';

function App() {
    const [image, setImage] = useState(null);

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
        if (!document.querySelector('input[type="file"]').files[0]) {
            alert ('Please select a file');
            return;
        }
        const file = document.querySelector('input[type="file"]').files[0];
        const { response, checksum } = await uploadFileAwsSdk(file);
        return {response, checksum};
    }
    return (
        <div className="App">
            <header className="App-header"><img src={logo} className="App-logo" alt="logo"/></header>

            <h1 className="font-bold underline">Hello world!</h1>

            <container>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <input type="file" accept="image/*" onChange={handleImageUpload}/>
                <input type="button" value="Upload image" onClick={() => initiateOp()}/>
                {image && <img src={image} alt="Uploaded" className="uploaded-image"/>}

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </container>
        </div>
    );
}

export default App;