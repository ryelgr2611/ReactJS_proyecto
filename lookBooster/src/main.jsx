import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importamos Routes y Route desde react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import FormularioLogin from './components/FormularioLogin';
import About from './components/About';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> {/* Envuelve todas tus rutas con el componente Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
            </>
          }
        /> {/* Renderiza Header y About juntos */}
        <Route path="/login" element={<FormularioLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
