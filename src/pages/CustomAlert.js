// CustomAlert.js
import React from 'react';
import './CustomAlert.css'; // Import your styles

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default CustomAlert;
