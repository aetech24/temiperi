import { StrictMode } from '/node_modules/react/index.js'
import { createRoot } from '/node_modules/react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from '/node_modules/react-router-dom/dist/index.js'
import { ToastContainer } from '/node_modules/react-toastify/dist/react-toastify.js'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </StrictMode>
  </BrowserRouter>
);
