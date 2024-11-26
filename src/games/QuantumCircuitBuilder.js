import React from 'react';
import './QuantumCircuitBuilder.css';

const QuantumCircuitBuilder = () => {
  return (
    <div className="circuit-builder-container">
      <h2 className="circuit-title">Quantum Circuit Builder</h2>
      <div className="circuit-iframe-container">
        <iframe
          src="https://algassert.com/quirk#circuit={%22cols%22:[]}"
          title="Quantum Circuit Builder"
          className="circuit-iframe"
        ></iframe>
      </div>
      <p className="circuit-description">
        Use the Quantum Circuit Builder to design and simulate quantum circuits. Drag and drop gates to create your circuit and visualize quantum operations.
      </p>
    </div>
  );
};

export default QuantumCircuitBuilder;
