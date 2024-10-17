function Hero(){
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to...</h1>
                    <p className="mb-5">
                        Yet another generic af webapp, but it's CS506's app so it's cool.
                    </p>
                    <button className="btn btn-primary" onClick={() => document.getElementById('contentStart').scrollIntoView({behavior: 'smooth'})} >Get Started</button>
                </div>
            </div>
        </div>
    );
}
export default Hero;