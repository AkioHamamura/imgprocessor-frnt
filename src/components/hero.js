// src/components/Hero.js
function Hero() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images5.alphacoders.com/127/1279331.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Image Processor</h1>
                    <p className="mb-5">
                        Upload and edit your images with ease.
                    </p>
                    <button className="btn btn-primary" onClick={() => document.getElementById('contentStart').scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;