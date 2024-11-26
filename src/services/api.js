import axios from 'axios';

const API_URL = 'http://localhost/quantum-backend/index.php';

export const fetchMessage = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
