import React, { useState, useEffect } from 'react';
import './QuantumStateMatcher.css';

// Array of possible gates and their descriptions
const gates = [
    { name: 'Hadamard', description: 'Transforms state to superposition' },
    { name: 'Pauli-X', description: 'Flips the qubit state' },
    { name: 'Pauli-Y', description: 'Applies rotation to qubit state' },
    { name: 'CNOT', description: 'Flips the target qubit if the control qubit is |1⟩' },
];

const possibleStates = [-1, 0, 0.5, 1]; // Possible target states

// Function to get a random state from possibleStates
const randomState = () => possibleStates[Math.floor(Math.random() * possibleStates.length)];

const QuantumStateMatcher = () => {
    const [userStates, setUserStates] = useState([0, 0]); // Initial user qubit states
    const [targetStates, setTargetStates] = useState([randomState(), randomState()]); // Random target states
    const [score, setScore] = useState(0); // Score tracking
    const [attempts, setAttempts] = useState(0); // Attempt counter
    const [resultMessage, setResultMessage] = useState(''); // Message for result display
    const [isGameOver, setIsGameOver] = useState(false); // Game over state
    const [timer, setTimer] = useState(30); // Timer for the game
    const [level, setLevel] = useState(1); // Current level
    const [hints, setHints] = useState(3); // Number of hints available
    const [selectedQubit, setSelectedQubit] = useState(0); // Track which qubit is selected
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal visibility state

    useEffect(() => {
        if (timer > 0 && !isGameOver) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsGameOver(true);
            setResultMessage('Time is up! Game over.');
        }
    }, [timer, isGameOver]);

    const applyGate = (gate) => {
        const newStates = [...userStates];

        switch (gate) {
            case 'Hadamard':
                newStates[selectedQubit] = (newStates[selectedQubit] === 0) ? 0.5 : 0; // Assume 0.5 indicates superposition
                break;
            case 'Pauli-X':
                newStates[selectedQubit] = (newStates[selectedQubit] === 1) ? 0 : 1;
                break;
            case 'Pauli-Y':
                newStates[selectedQubit] = (newStates[selectedQubit] === 1) ? -1 : 1; // Example phase change
                break;
            case 'CNOT':
                if (userStates[0] === 1) {
                    newStates[1] = (newStates[1] === 0) ? 1 : 0; // Flip second qubit
                }
                break;
            default:
                break;
        }

        setUserStates(newStates);
        setAttempts(prev => prev + 1); // Increment attempts
    };

    const checkResult = () => {
        if (JSON.stringify(userStates) === JSON.stringify(targetStates)) {
            const points = Math.max(0, 100 - attempts * 10); // Score formula
            setScore(prev => prev + points);
            setResultMessage(`Success! You matched the target quantum states in ${attempts + 1} attempts. Your score: ${score + points}`);
            setLevel(prev => prev + 1); // Level up
            resetGame(); // Reset for the next round
            decreaseTimer(); // Decrease timer after each level
        } else {
            setResultMessage('Incorrect! Try applying more gates.');
        }
    };

    const decreaseTimer = () => {
        setTimer(prev => Math.max(3, prev - 5));
    };

    const useHint = () => {
        if (hints > 0) {
            setHints(prev => prev - 1);
            const randomGate = gates[Math.floor(Math.random() * gates.length)].name;
            setResultMessage(`Hint: Try using ${randomGate}!`);
        } else {
            setResultMessage('No hints left!');
        }
    };

    const resetGame = () => {
        setUserStates([0, 0]);
        setTargetStates([randomState(), randomState()]); // New random target states
        setAttempts(0); // Reset attempts
        setIsGameOver(false); // Reset game over state
        setResultMessage(''); // Clear result message
        setTimer(30); // Reset timer for the new level
    };

    const getStateClass = (state) => {
        if (state === -1) return 'state-value-negative';
        if (state === 0) return 'state-value-zero';
        if (state === 0.5) return 'state-value-half';
        if (state === 1) return 'state-value-positive';
        return ''; // Fallback in case of an unexpected value
    };

    // Function to handle opening and closing the information modal
    const toggleInfoModal = () => {
        setIsInfoModalOpen(prev => !prev);
    };

    return (
        <div className="state-matcher-container">
            <h2>Quantum State Matcher</h2>
            <p>Match the target quantum states by applying the correct sequence of gates.</p>
            <p>Score: {score} | Level: {level} | Hints: {hints}</p>
            <p>Time left: {timer} seconds</p>

            <div className="qubits-display">
                {userStates.map((state, index) => (
                    <div
                        key={index}
                        className={`state-display ${getStateClass(state)}`}
                        onClick={() => setSelectedQubit(index)} // Set selected qubit on click
                    >
                        Current Qubit State {index + 1}: {state}
                    </div>
                ))}
                {targetStates.map((state, index) => (
                    <div
                        key={index}
                        className={`state-display ${getStateClass(state)}`}
                    >
                        Target Qubit State {index + 1}: {state}
                    </div>
                ))}
            </div>

            <div className="gates-section">
                {gates.map(gate => (
                    <button key={gate.name} className="gate-btn" onClick={() => applyGate(gate.name)} disabled={isGameOver}>
                        {gate.name}
                    </button>
                ))}
            </div>

            <div className="check-section">
                <button className="check-btn" onClick={checkResult} disabled={isGameOver}>
                    Check Result
                </button>
                <button className="hint-btn" onClick={useHint} disabled={isGameOver}>
                    Use Hint
                </button>
                {/* Information Button */}
                <button className="info-button" onClick={toggleInfoModal}>
                    i
                </button>
                {/* <button class="info-button">i</button> */}
            </div>

            {/* Result message display */}
            {resultMessage && (
                <div className="result-message">
                    {resultMessage}
                </div>
            )}

            {/* Information Modal */}
            {isInfoModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Quantum Gate Information</h3>
                        <ul>
                            {gates.map(gate => (
                                <li key={gate.name}>
                                    <strong>{gate.name}:</strong> {gate.description}
                                </li>
                            ))}
                        </ul>
                        <button onClick={toggleInfoModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuantumStateMatcher;
