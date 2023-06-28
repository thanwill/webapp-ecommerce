import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'; // 
import 'bootstrap/dist/js/bootstrap.bundle'; // bootstrap JS bundle para funcionalidades javascript
import CartProvider from './context/cartContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <ToastContainer />
      <CartProvider>
        <App />
      </CartProvider>
    </>
  </React.StrictMode>
);
reportWebVitals();
