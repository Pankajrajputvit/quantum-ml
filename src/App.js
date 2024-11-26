import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuantumConcepts from './pages/QuantumConcepts';
import Games from './pages/Games';
import NotebookUploader from './pages/NotebookUploader'; 

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quantum-concepts" element={<QuantumConcepts />} />
                <Route path="/games" element={<Games />} />
                <Route path="/upload-notebook" element={<NotebookUploader />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
