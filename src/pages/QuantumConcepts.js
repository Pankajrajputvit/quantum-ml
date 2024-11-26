import React from 'react';
import './QuantumConcepts.css';
import qubitImage from './images/one.png'; // Example image for Qubit
// import entangleImage from './images/entanglement.webp'; // Example image for Qubit
import comparisonImage from './images/two.webp'; // Example image for Classical vs. Quantum Computing
import mlComparisonImage from './images/cml-vs-qml.png'; // Example image for Classical vs. Quantum ML
import circuitImage from './images/circuit.png'; // Example image for Classical vs. Quantum ML
import IBMImage from './images/IBM-System.png'; // Example image for Classical vs. Quantum ML

const QuantumConcepts = () => {
    return (
        <div className="quantum-concepts-container">
            {/* Section 0: Introduction */}
            <div className="header-section">
                <h1>Quantum Computing Concepts</h1>
                <p>Explore the foundational principles and components of quantum computing.</p>
            </div>

            {/* Section 1: Basics of Quantum Computing */}
            <div className="concept-section">
                <h2>1. Basics of Quantum Computing</h2>
                <p>Quantum computing uses principles of quantum mechanics to perform computations at a fundamentally different level than classical computers.</p>
                <ul>
                    <li><strong>Qubit:</strong> The basic unit of quantum information, capable of existing in a superposition of states.</li>
                    <li><strong>Superposition:</strong> The ability of qubits to exist in multiple states simultaneously.</li>
                    <li><strong>Entanglement:</strong> A phenomenon where qubits become correlated in such a way that the state of one affects the state of the other, no matter the distance between them.</li>
                    <li><strong>Quantum Gates:</strong> Operations that manipulate qubits, similar to logic gates in classical computing but leveraging quantum effects.</li>
                </ul>
                <img src={qubitImage} alt="Qubit Visualization" className="visualization-image" />
                {/* <img src={entangleImage} alt="entanglement Visualization" className="visualization-image" /> */}
                <img src={circuitImage} alt="entanglement Visualization" className="visualization-image" />
            </div>

            {/* Section 2: Classical vs. Quantum Computing */}
            <div className="concept-section">
                <h2>2. Classical vs. Quantum Computing</h2>
                <p>Classical computers process information as bits (0 or 1), while quantum computers use qubits, allowing for far more complex computations.</p>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Classical Computing</th>
                            <th>Quantum Computing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Uses bits (0 or 1).</td>
                            <td>Uses qubits, which can exist in superposition (both 0 and 1 at once).</td>
                        </tr>
                        <tr>
                            <td>Processes information sequentially.</td>
                            <td>Performs parallel computation due to superposition and entanglement.</td>
                        </tr>
                        <tr>
                            <td>Limited by the laws of classical physics.</td>
                            <td>Leverages the principles of quantum mechanics (e.g., superposition, entanglement).</td>
                        </tr>
                        <tr>
                            <td>Well-suited for traditional computing tasks.</td>
                            <td>Excels at solving certain types of problems like factoring large numbers or simulating quantum systems.</td>
                        </tr>
                    </tbody>
                </table>
                <img src={comparisonImage} alt="Comparison Visualization" className="visualization-image" />
            </div>

            {/* Section 3: Quantum Gates */}
            <div className="concept-section">
                <h2>3. Quantum Gates</h2>
                <p>Quantum gates are the building blocks of quantum circuits, used to manipulate qubits. Here are the basic quantum gates:</p>
                <ul>
                    <li><strong>Pauli-X Gate (NOT Gate):</strong> Flips the state of a qubit (0 to 1, 1 to 0).</li>
                    <li><strong>Pauli-Y Gate:</strong> Rotates the qubit around the Y-axis by 180 degrees.</li>
                    <li><strong>Pauli-Z Gate:</strong> Flips the phase of the qubit when in superposition.</li>
                    <li><strong>Hadamard Gate (H Gate):</strong> Places a qubit into a superposition of 0 and 1.</li>
                    <li><strong>Phase Gate:</strong> Shifts the phase of the qubit by a specified angle.</li>
                    <li><strong>Controlled-NOT (CNOT) Gate:</strong> Flips a target qubit if the control qubit is in the state 1.</li>
                    <li><strong>Toffoli Gate (CCNOT):</strong> A three-qubit gate that flips the third qubit if the first two are in the state 1.</li>
                    <li><strong>Swap Gate:</strong> Swaps the states of two qubits.</li>
                </ul>
            </div>

            {/* Section 5: Quantum Measurement */}
            <div className="concept-section">
                <h2>4. Quantum Measurement</h2>
                <p>Quantum measurement collapses the qubit's superposition into a definite state, either 0 or 1, based on probabilities.</p>
                <ul>
                    <li><strong>Example:</strong> A qubit in equal superposition has a 50% chance of collapsing to 0 or 1 when measured.</li>
                </ul>
            </div>

            {/* Section 5: Classical vs. Quantum Machine Learning */}
            <div className="concept-section">
                <h2>5. Classical vs. Quantum Machine Learning</h2>
                <p>While classical machine learning is powerful, QML aims to extend these capabilities by leveraging quantum principles.</p>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Classical ML</th>
                            <th>Quantum ML</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Uses classical data.</td>
                            <td>Can process quantum data.</td>
                        </tr>
                        <tr>
                            <td>Uses classical optimization methods.</td>
                            <td>Employs quantum-enhanced algorithms.</td>
                        </tr>
                        <tr>
                            <td>Limited by classical computational constraints.</td>
                            <td>Potential for exponential speed-ups in certain tasks.</td>
                        </tr>
                    </tbody>
                </table>
                <img src={mlComparisonImage} alt="Classical vs. Quantum ML Visualization" className="visualization-image" />
            </div>
            <div className="concept-section">
                <h2>7. Introduction to Quantum Machine Learning (QML)</h2>
                <p>Quantum Machine Learning (QML) applies quantum computing to machine learning algorithms, offering potential speed-ups for specific computational tasks.</p>

                <h4>Quantum Data</h4>
                <p>QML works with quantum data, which is encoded in qubits. Quantum data can represent complex patterns that classical systems struggle to process efficiently.</p>

                <h4>Quantum Algorithms</h4>
                <p>Key algorithms like the <strong>Quantum Approximate Optimization Algorithm (QAOA)</strong> and <strong>Variational Quantum Eigensolver (VQE)</strong> are used in QML for optimization and eigenvalue problems, which are essential for training quantum models.</p>

                <h4>Quantum Neural Networks (QNNs)</h4>
                <p>QNNs are extensions of classical neural networks that use quantum systems to process quantum data. They can offer advantages in specific learning tasks by utilizing quantum superposition and entanglement.</p>

                <h4>Why Use QML?</h4>
                <p>QML has the potential to enhance machine learning by providing faster processing for high-dimensional data and optimization problems. Its promise lies in tackling tasks that are computationally expensive for classical systems.</p>
                <img src={IBMImage} alt="Ibm news" className="visualization-image" />
            </div>
                
        </div>
    );
};

export default QuantumConcepts;