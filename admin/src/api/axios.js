import axios from '/node_modules/axios/dist/axios.js';

const devUrl = "http://localhost:4000/temiperi";
const prodUrl = "https://temiperi-backend.onrender.com/temiperi";

const api = axios.create({
  baseURL: window.location.hostname === "localhost" ? devUrl : prodUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
