import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importamos Routes y Route desde react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import FormularioLogin from './pages/FormularioLogin';
import About from './components/About';
import Carrusel from './components/Carrusel';
import Equipo from './components/Equipo';
import Footer from './components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
