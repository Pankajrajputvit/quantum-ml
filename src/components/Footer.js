import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Quantum Learning. All rights reserved.</p>
                <ul className="footer-links list-inline">
                    <li className="list-inline-item"><a href="https://twitter.com" className="text-white">Twitter</a></li>
                    <li className="list-inline-item"><a href="https://github.com" className="text-white">GitHub</a></li>
                    <li className="list-inline-item"><a href="https://linkedin.com" className="text-white">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
