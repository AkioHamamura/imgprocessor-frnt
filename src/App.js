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
            reader.onloadend = async () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const initiateOp = async () => {
        const file = document.querySelector('input[type="file"]').files[0];
        if (!file) return alert('Please select a file');
        if (operation === null) return alert('Please select an operation');

        const { checksum} = await uploadFileAwsSdk(file);
        let result;
        switch (operation) {
            case 1:result = await applyFilter(checksum);break;
            case 2:result = await applyFilter(checksum);break;
            case 3:result = await applyFilter(checksum);break;
            default:alert('Invalid operation');break;
        }
        if (result.status === 200) {
            const fileResponse = await fetchFile(checksum);
            const blob = await fileResponse.Body.transformToByteArray();
            const imageUrl = URL.createObjectURL(new Blob([blob], { type: 'image/png' }));
            setReturnedImage(imageUrl);
        }
    };

    return (
        <div>
            <container className={"App w-1/2 mx-auto"}>
                <Hero/>
                <header className="App-header" id={"contentStart"}></header>
                <container className={"justify-center flex mx-auto"}><Menu1 item={operation} setItem={setOperation}/>
                        <div className="flex flex-col items-center mt-4">
                            <input type="file" className="file-input w-full max-w-xs" accept="image/*" onChange={handleImageUpload}/>
                            <button className="btn btn-primary mt-4" onClick={() => initiateOp()}>Upload image</button>
                            {image && <img src={image} alt="Uploaded" className="uploaded-image mt-4"/>}
                            {returnedImage && <img src={returnedImage} alt="Returned" className="returned-image mt-4"/>}
                        </div>
                </container>
                <Footer/>
            </container>
        </div>
    );
}

export default App;
