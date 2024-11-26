import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdWarning } from 'react-icons/md';
import CustomAlert from './CustomAlert'; // Import your custom alert component
import './NotebookUploader.css';

const NotebookUploader = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [runMessage, setRunMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUploadedFiles();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.ipynb')) {
            const formData = new FormData();
            formData.append('notebook', selectedFile);

            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                showAlertWithMessage(data.message); // Show custom alert
                fetchUploadedFiles(); // Refresh the file list
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                showAlertWithMessage('Error uploading file.');
            });
        } else {
            showAlertWithMessage("Please upload a valid .ipynb file.");
        }
    };

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); // Auto-hide after 3 seconds
    };

    const fetchUploadedFiles = () => {
        fetch('http://localhost:5000/uploaded-notebooks')
            .then(response => response.json())
            .then(data => {
                setUploadedFiles(data);
            })
            .catch(error => {
                console.error('Error fetching uploaded notebooks:', error);
            });
    };

    const handleFileClick = (file) => {
        fetch(`http://localhost:5000/userData/${file}`)
            .then(response => response.json())
            .then(data => {
                setSelectedNotebook({
                    name: file,
                    content: data,
                });
            })
            .catch(error => {
                console.error('Error fetching notebook content:', error);
                showAlertWithMessage('Error fetching notebook content.');
            });
    };

    const renderCells = (cells) => {
        if (!cells || !Array.isArray(cells)) {
            return <div>No cells found.</div>;
        }
        return cells.map((cell, index) => {
            if (cell.cell_type === 'code') {
                return (
                    <div key={index} className="cell code-cell">
                        <div className="cell-title">Code:</div>
                        <pre>{cell.source.join('\n')}</pre>
                        <button onClick={() => handleRunCell(cell, index)} className="run-cell-button">
                            Run Cell
                        </button>
                        {cell.outputs && cell.outputs.length > 0 && (
                            <div className="cell-title">Output:</div>
                        )}
                        {cell.outputs && cell.outputs.map((output, outputIndex) => {
                            if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                                return (
                                    <div key={outputIndex} className="output">
                                        <pre>{output.data['text/plain']}</pre>
                                        {output.data['image/png'] && (
                                            <img src={`data:image/png;base64,${output.data['image/png']}`} alt="output" />
                                        )}
                                    </div>
                                );
                            }
                            if (output.output_type === 'stream') {
                                return (
                                    <div key={outputIndex}>
                                        <pre>{output.text.join('\n')}</pre>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                );
            }
            if (cell.cell_type === 'markdown') {
                return (
                    <div key={index} className="cell markdown-cell">
                        <div className="cell-title">Markdown:</div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {cell.source.join('\n')}
                        </ReactMarkdown>
                    </div>
                );
            }
            return null;
        });
    };

    // Function to run an individual cell
    const handleRunCell = (cell, cellIndex) => {
        if (!selectedNotebook) {
            alert('Please select a notebook.');
            return;
        }
    
        fetch('http://localhost:5001/run-cell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cell: cell.source,
                notebook_name: selectedNotebook.name,
                cell_index: cellIndex,
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            setRunMessage('Cell executed successfully.');
            // Update the notebook content with the new outputs
            setSelectedNotebook(prevState => {
                const updatedContent = [...prevState.content.cells];
                updatedContent[cellIndex] = data.updated_cell;
                return {
                    ...prevState,
                    content: { cells: updatedContent },
                };
            });
        })
        .catch(error => {
            console.error('Error running cell:', error);
            setRunMessage(`Error running cell: ${error.message}`);
        });
    };
    

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="notebook-uploader">
            {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <div className="file-list-container">
                <div className="file-input-wrapper" onClick={handleButtonClick}>
                    <AiOutlineFileAdd size={24} />
                    <span>Upload Notebooks</span>
                </div>
                <input
                    type="file"
                    accept=".ipynb"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="file-input"
                />
                <div className="file-list">
                    <h2>Uploaded Notebooks</h2>
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index} onClick={() => handleFileClick(file)}>
                                {file}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="notebook-content-container">
                {selectedNotebook ? (
                    <div className="notebook-content">
                        <h2>{selectedNotebook.name}</h2>
                        {renderCells(selectedNotebook.content.cells)}
                    </div>
                ) : (
                    <div className="empty-placeholder">
                        <MdWarning size={64} className="placeholder-icon" />
                        <h2>No Notebook Selected</h2>
                        <p>Please upload a Jupyter notebook or select one from the uploaded files to view its content.</p>
                    </div>
                )}
            </div>

            {/* Display run message */}
            {runMessage && <CustomAlert message={runMessage} onClose={() => setRunMessage('')} />}
        </div>
    );
};

export default NotebookUploader;
