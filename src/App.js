// App.js
import React, { useState } from 'react';
import logo from './images/newFavicon.jpg';
import { uploadFileAwsSdk } from './components/aws-s3';
import './App.css';

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

    const initiateOp = async () => {
        if (!document.querySelector('input[type="file"]').files[0]) {
            alert('Please select a file');
            return;
        }
        const file = document.querySelector('input[type="file"]').files[0];
        const { response, checksum } = await uploadFileAwsSdk(file);
        return { response, checksum };
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className=" underline">Hello world!</h1>
                <input type="file" accept="image/*" onChange={handleImageUpload}/>
                <button className="btn" onClick={() => initiateOp()}>hello</button>
                {image && <img src={image} alt="Uploaded" className="uploaded-image"/>}

            </header>
        </div>
    );
}

export default App;