import React, { useState } from 'react';
import logo from './images/newFavicon.jpg';
import { uploadFileAwsSdk } from './components/aws-s3';
import './App.css';
import Footer from "./components/Footer";
import Hero from "./components/hero";
import Menu1 from "./components/menu1";

function App() {
    const [image, setImage] = useState(null);
    const [operation, setOperation] = useState(null);

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
        <div>
            <container className={"App w-1/2 mx-auto"}>
            <Hero/>
                <header className="App-header" id={"contentStart"}>
                <container className={"justify-center flex mx-auto"}><Menu1/></container>


                        <div className="flex flex-col items-center mt-4">
                            <input type="file" className="file-input w-full max-w-xs" accept="image/*" onChange={handleImageUpload}/>
                            <button className="btn btn-primary mt-4" onClick={() => initiateOp()}>Upload image</button>
                            {image && <img src={image} alt="Uploaded" className="uploaded-image mt-4"/>}
                        </div>
                </header>
                <Footer/>
            </container>
        </div>
    );
}

export default App;
