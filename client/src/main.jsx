import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './presentation/pages/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter> 

  </React.StrictMode>
)
