// src/App.js
import React, { useState } from 'react';
import { uploadFileAwsSdk, fetchFile } from './components/aws-s3';
import './App.css';
import Header from './components/Header';
import Hero from './components/hero';
import Footer from './components/Footer';
import {applyFilter, removeBackground} from './components/photoEditing';
import ImageCanvas from './components/imageCanvas';

function App() {
    const [image, setImage] = useState(null);
    const [returnedImage, setReturnedImage] = useState(null);
    const [operation, setOperation] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const initiateOp = async () => {
        const file = document.querySelector('input[type="file"]').files[0];
        if (!file) return alert('Please select a file');
        if (operation === null) return alert('Please select an operation');

        const { checksum } = await uploadFileAwsSdk(file);
        if (checksum != null){
        let response = null;
        if (operation === 1) response = await removeBackground(checksum);
        else if (operation === 2) response = await applyFilter(checksum);
        if (response != null){
            if (response.status === 200) {
                const fileResponse = await fetchFile(checksum);
                const blob = await fileResponse.Body.transformToByteArray();
                const imageUrl = URL.createObjectURL(new Blob([blob], { type: 'image/png' }));
                setReturnedImage(imageUrl);
            }
            }
        }
    };

    return (
        <div>
            <Header />
            <Hero />
            <main className="container mx-auto px-4" id="contentStart">
                <section className="p-6 my-4">
                    <h2 className="text-xl font-bold flex justify-center">Upload and Edit Image</h2>
                    <div className="flex flex-col items-center space-y-2">
                        <input type="file" className="file-input w-full max-w-xs" accept="image/*"
                               onChange={handleImageUpload}/>
                        <div className={"join"}>
                            <input className="join-item btn" type="radio" name="options" aria-label="AI - RemoveBackground" onClick={() => setOperation(1)}/>
                            <input className="join-item btn" type="radio" name="options" aria-label="AI - Expand image" onClick={() => setOperation(2)}/>
                            <input className="join-item btn" type="radio" name="options" aria-label="AI Upscale 2x" onClick={() => setOperation(3)}/>
                        </div>
                        <button className="btn btn-primary" onClick={initiateOp}>Upload and Process Image</button>
                        <ImageCanvas image={image} title={"Original"}/>
                        {returnedImage && <ImageCanvas image={returnedImage} title={"Output image"}/>}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
