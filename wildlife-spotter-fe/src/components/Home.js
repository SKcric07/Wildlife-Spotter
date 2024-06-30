import React from 'react'
import './Home.css';
function Home() {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to Wildlife Spotter</h1>
                <p>Explore wildlife community.</p>
            </header>
            <section className="home-content">
                {/* Add content sections as per your design */}
                <div className="feature">
                    <h2>Feature 1</h2>
                    <p>Description of feature 1.</p>
                </div>
                <div className="feature">
                    <h2>Feature 2</h2>
                    <p>Description of feature 2.</p>
                </div>
            </section>
        </div>
    )
}

export default Home