/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importamos Routes y Route desde react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase/config';
import Header from './components/Header';
import FormularioLogin from './pages/FormularioLogin';
import Corte from './components/Corte';
import About from './components/About';
import Carrusel from './components/Carrusel';
import Equipo from './components/Equipo';
import Footer from './components/Footer';
import 'firebase/auth';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

function App() {
  const auth = getAuth(app);

  const [usuario,setUsuario] = useState(null); 

  onAuthStateChanged(auth, (usuarioAuth) => {
    if(usuarioAuth) {
      setUsuario(usuarioAuth);
    } else {
      setUsuario(null);
    }
  });
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header correoUsuario={usuario !== null ? usuario.email : null} />
                <About />
                <Carrusel />
                <Equipo />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<FormularioLogin />} />
          <Route path="/corte" element={<Corte/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
