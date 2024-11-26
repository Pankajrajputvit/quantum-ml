import React, { useState, useEffect } from 'react';
import './QuizGame.css';

const quizQuestions = [
        {
            "question": "What does a qubit represent in quantum computing?",
            "options": [
                "A binary digit",
                "A classical bit",
                "A quantum state that can be 0, 1, or both",
                "A measure of computing speed"
            ],
            "answer": 2
        },
        {
            "question": "What is superposition in quantum computing?",
            "options": [
                "The ability of a quantum system to be in multiple states at once",
                "A way to measure quantum states",
                "A type of quantum algorithm",
                "A property of classical bits"
            ],
            "answer": 0
        },
        {
            "question": "What is entanglement in quantum computing?",
            "options": [
                "A method of data encryption",
                "A quantum phenomenon where qubits become correlated",
                "The process of measuring qubits",
                "An error-correcting code"
            ],
            "answer": 1
        },
        {
            "question": "Which of the following describes quantum gates?",
            "options": [
                "Operations that manipulate classical bits",
                "The building blocks of quantum circuits that manipulate qubits",
                "A way to measure quantum states",
                "A physical barrier for qubits"
            ],
            "answer": 1
        },
        {
            "question": "What is the primary difference between classical and quantum computing?",
            "options": [
                "Classical computers use bits; quantum computers use qubits.",
                "Quantum computers are always faster than classical computers.",
                "Classical computers can perform parallel computations.",
                "Quantum computers are limited by classical physics."
            ],
            "answer": 0
        },
        {
            "question": "What happens during quantum measurement?",
            "options": [
                "The qubit's superposition collapses to a definite state",
                "The qubit is cloned",
                "Information is lost permanently",
                "The qubit enters a new superposition"
            ],
            "answer": 0
        },
        {
            "question": "What is the role of quantum algorithms in quantum machine learning?",
            "options": [
                "They are used to measure qubits",
                "They help solve optimization and eigenvalue problems",
                "They replace classical algorithms completely",
                "They only sort data"
            ],
            "answer": 1
        },
        {
            "question": "What is the main advantage of quantum machine learning over classical machine learning?",
            "options": [
                "It can process classical data faster",
                "It can handle quantum data that classical systems cannot efficiently process",
                "It is easier to implement",
                "It requires less data"
            ],
            "answer": 1
        },
        {
            "question": "Which of the following statements about classical and quantum machine learning is true?",
            "options": [
                "Classical ML can process quantum data.",
                "Quantum ML can achieve exponential speed-ups in certain tasks.",
                "Classical ML uses quantum-enhanced algorithms.",
                "Quantum ML is limited by classical computational constraints."
            ],
            "answer": 1
        },
        {
            "question": "What is the significance of using qubits in quantum computing?",
            "options": [
                "They enable faster classical computations.",
                "They can exist in superposition and entangled states.",
                "They are the same as classical bits.",
                "They are easier to manipulate than classical bits."
            ],
            "answer": 1
        }    
];


const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showAnalysis, setShowAnalysis] = useState(false);

    useEffect(() => {
        if (timer > 0 && !isQuizFinished) {
            const countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            setIsQuizFinished(true); // Finish quiz when timer hits 0
        }
    }, [timer, isQuizFinished]);

    const handleAnswer = (selectedOption) => {
        const updatedAnswers = [...userAnswers, selectedOption];
        setUserAnswers(updatedAnswers);

        // Update score
        if (selectedOption === quizQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setTimer(30); // Reset timer for next question
        } else {
            setIsQuizFinished(true); // Finish the quiz
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setScore(0);
        setIsQuizFinished(false);
        setTimer(30); // Reset timer to start
        setShowAnalysis(false); // Hide the analysis
    };

    const toggleAnalysis = () => {
        setShowAnalysis(!showAnalysis); // Toggle analysis view
    };

    return (
        <div className="quiz-game-container">
            {isQuizFinished ? (
                <div className="results-section">
                    <h2>Quiz Finished!</h2>
                    <p>Your Score: {score} / {quizQuestions.length}</p>
                    <div className="button-container">
                        <button className="btn btn-secondary" onClick={toggleAnalysis}>
                            {showAnalysis ? "Hide Analysis" : "Analyze Results"}
                        </button>
                        <button className="btn btn-primary" onClick={restartQuiz}>Restart Quiz</button>
                    </div>
                    {showAnalysis && (
                        <div className="analysis-section">
                            {quizQuestions.map((question, index) => (
                                <div key={index} className="analysis-item">
                                    <p><strong>Q{index + 1}:</strong> {question.question}</p>
                                    <p><strong>Your Answer:</strong>
                                        {userAnswers[index] !== undefined ? (
                                            <span className={userAnswers[index] === question.answer ? "correct" : "incorrect"}>
                                                {question.options[userAnswers[index]]}
                                            </span>
                                        ) : "No answer"}
                                    </p>
                                    {userAnswers[index] !== undefined && userAnswers[index] !== question.answer && (
                                        <p><strong>Correct Answer:</strong>
                                            <span className="correct">{question.options[question.answer]}</span>
                                        </p>
                                    )}
                                    <p>
                                        {userAnswers[index] === question.answer
                                            ? <span className="correct">Correct</span>
                                            : <span className="incorrect">Incorrect</span>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            ) : (
                <div className="quiz-section">
                    <h2>Quantum Quiz</h2>
                    <div className="timer">Time left: {timer}s</div>
                    {quizQuestions.length > 0 && (
                        <div className="question-section">
                            <p>Question {currentQuestion + 1}: {quizQuestions[currentQuestion].question}</p>
                        </div>
                    )}
                    <div className="options-section">
                        {quizQuestions.length > 0 && quizQuestions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="btn btn-secondary option-btn"
                                onClick={() => handleAnswer(index)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizGame;
