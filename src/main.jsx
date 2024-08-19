import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <BrowserRouter basename="/trouve_ton_artisan">
         <App />
      </BrowserRouter>
   </React.StrictMode>
);
