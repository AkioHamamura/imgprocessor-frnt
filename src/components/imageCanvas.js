// src/components/ImageCanvas.js
import React from 'react';

function ImageCanvas({ image, title}) {
    return (
        <div className="border rounded-3xl border-gray-300 p-4 mt-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {image ? (
                <img src={image} alt="Uploaded" className="max-w-full max-h-96" />
            ) : (
                <p>No image uploaded yet.</p>


            )}
        </div>
    );
}

export default ImageCanvas;