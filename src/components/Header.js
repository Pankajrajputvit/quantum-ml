import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Quantum Learning</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quantum-concepts">Quantum Concepts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/games">Games</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/upload-notebook">Quantum Notebooks</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;