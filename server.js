const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import CORS
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'userData/';
        fs.exists(dir, (exists) => {
            if (!exists) {
                fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
            }
            cb(null, dir); // Specify the folder for uploads
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('notebook'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully.' });
});

// Endpoint to get the uploaded notebook content
app.get('/userData/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'userData', req.params.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: 'File not found.' }); // File not found
            }
            return res.status(500).json({ message: 'Error reading file.' });
        }
        try {
            res.json(JSON.parse(data)); // Send back the JSON content
        } catch (parseError) {
            return res.status(500).json({ message: 'Error parsing file.' });
        }
    });
});

// Endpoint to list uploaded notebooks
app.get('/uploaded-notebooks', (req, res) => {
    const dir = path.join(__dirname, 'userData');
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading directory.' });
        }
        // Filter to only return .ipynb files
        const notebooks = files.filter(file => file.endsWith('.ipynb'));
        res.json(notebooks);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
