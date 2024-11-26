import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content text-center">
                <h1>Welcome to Quantum Learning</h1>
                <p>Explore the world of Quantum Computing and Machine Learning with interactive visualizations and fun challenges!</p>
                <a href="/quantum-concepts" className="btn btn-primary btn-lg">Get Started</a>
            </div>
        </div>
    );
}

export default Home;
