import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./GameModal.css"
const GameModal = ({ show, onHide, title, children }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            fullscreen={title === 
                "Quantum Circuit Builder" ? true :false} // Ensures the modal is full-screen width
            centered={true} // Vertically centers the modal
            dialogClassName={title === 
                "Quantum Circuit Builder" ? "custom-fullscreen-modal" : ""} // Apply custom styling class
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameModal;
