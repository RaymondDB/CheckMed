import React from 'react';
import ReactDOM from 'react-dom/client';
//import {Main} from "./components/Main";
//import {Sidebar} from "./components/Sidebar";
//import {Widget} from "./components/Widget";
//import {ContenedorWidget} from "./components/Contenedor";
//import {Headerr} from "./components/Header";
import App from './client/src/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const RenderApp= ()=>{
     root.render(  
    <React.StrictMode>
        <BrowserRouter> 
        <App/>
        </BrowserRouter>
    </React.StrictMode>
   );
} 
RenderApp();