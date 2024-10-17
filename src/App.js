import React, { useState } from 'react';
import { uploadFileAwsSdk, fetchFile } from './components/aws-s3';
import './App.css';
import Footer from "./components/Footer";
import Hero from "./components/hero";
import Menu1 from "./components/menu1";
import {applyFilter} from "./components/photoEditing";

function App() {
    const [image, setImage] = useState(null);
    const [returnedImage, setReturnedImage] = useState(null);
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
            return;}
        if (operation === null) {
            alert('Please select an operation');
            return;}

        const file = document.querySelector('input[type="file"]').files[0];
        const { response, checksum } = await uploadFileAwsSdk(file);
        let result;
        console.log(response);
        console.log(checksum);
        switch (operation) {
            case 1:
                result = await applyFilter(checksum);
                break;
            case 2:
                result = await applyFilter(checksum);
                break;
            case 3:
                result = await applyFilter(checksum);
                break;
            default:
                alert('Invalid operation');
                break;
        }
        if (result.status === 200) {
            const file = await fetchFile(checksum);
            setReturnedImage(file);

        }
    };

    return (
        <div>
            <container className={"App w-1/2 mx-auto"}>
            <Hero/>
                <header className="App-header" id={"contentStart"}>
                <container className={"justify-center flex mx-auto"}><Menu1 item={operation} setItem={setOperation}/></container>


                        <div className="flex flex-col items-center mt-4">
                            <input type="file" className="file-input w-full max-w-xs" accept="image/*" onChange={handleImageUpload}/>
                            <button className="btn btn-primary mt-4" onClick={() => initiateOp()}>Upload image</button>
                            {image && <img src={image} alt="Uploaded" className="uploaded-image mt-4"/>}
                            {returnedImage && <img src={returnedImage} alt="Returned" className="returned-image mt-4"/>}
                        </div>
                </header>
                <Footer/>
            </container>
        </div>
    );
}

export default App;
