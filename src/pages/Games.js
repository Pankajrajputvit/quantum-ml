import React, { useState } from 'react';
import './Games.css';
import QuantumCircuitBuilder from '../games/QuantumCircuitBuilder';
import QuantumStateMatcher from '../games/QuantumStateMatcher';
import QuizGame from '../games/QuizGame';
import GameModal from '../components/GameModal';

const Games = () => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const openModal = (game) => {
        setSelectedGame(game);
        setModalShow(true);
    };

    const renderGameComponent = () => {
        switch (selectedGame) {
            case 'Quantum Circuit Builder':
                return <QuantumCircuitBuilder />;
            case 'Quantum State Matcher':
                return <QuantumStateMatcher />;
            case 'Quantum Quiz':
                return <QuizGame />;
            default:
                return null;
        }
    };
    return (
        <div className="games-container">
            <div className="header-section">
                <h1>Quantum Games</h1>
                <p>Challenge yourself with these fun quantum puzzles and games!</p>
            </div>
            <div className="game-section">
                <h2>Quantum Quiz</h2>
                <p>Test your quantum knowledge with a fun quiz!</p>
                <button className="btn btn-primary" onClick={() => openModal('Quantum Quiz')}>
                    Play Quantum Quiz
                </button>
            </div>
            
            <div className="game-section">
                <h2>Quantum State Matcher</h2>
                <p>Match quantum states using your knowledge of quantum gates and superposition.</p>
                <button className="btn btn-primary" onClick={() => openModal('Quantum State Matcher')}>
                    Play Quantum State Matcher
                </button>
            </div>

            <div className="game-section">
                <h2>Quantum Circuit Builder</h2>
                <p>Build a quantum circuit and see how the qubits evolve.</p>
                <button className="btn btn-primary" onClick={() => openModal('Quantum Circuit Builder')}>
                    Play Quantum Circuit Builder
                </button>
            </div>
            
            {/* Modal to display selected game */}
        
                <GameModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={selectedGame}
            >
                {renderGameComponent()}
            </GameModal>
    
        </div>
    );
};

export default Games;



