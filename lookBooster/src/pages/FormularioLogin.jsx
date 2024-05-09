import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './FormLogin.css'; 
import Logo from '../assets/logoCompleto.png';
import { Link } from 'react-router-dom';
import { FaGoogle, FaApple } from "react-icons/fa";

function RegistroForm() {
  return (
    <Form className="signin-form">
      
      <div className="form-group mb-4">
        <Form.Control type="text" placeholder="Nombre de usuario" required />
      </div>
      <div className="form-group mb-4">
        <Form.Control type="email" placeholder="Correo electrónico" required />
      </div>
      <div className="form-group mb-4">
        <Form.Control type="password" placeholder="Contraseña" required />
      </div>
      <div className="form-group mb-4">
        <Form.Control type="password" placeholder="Repite la contraseña" required />
      </div>
      <div className="form-group mb-4">
        <Form.Control type="tel" placeholder="Número de teléfono" required />
      </div>
      <div className="form-group mt-3">
        <Button variant="primary" type="submit" className="form-control btn btn-primary submit px-3">Registrarse</Button>
      </div>
    </Form>
  );
}

function FormularioLogin() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const toggleMostrarRegistro = () => {
    setMostrarRegistro(!mostrarRegistro);
  };
  const textoEnlace = mostrarRegistro ? 'Volver a iniciar sesión' : '! Soy nuevo ! | Registrarse';

  return (
    <div className="container">
      <div className="col-12 text-center mb-4">
        <Link to="/">
          <img
            src={Logo}
            width="250"
            height="250"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6 col-sm-10">
          <div className="login p-0">
            {mostrarRegistro ? (
              <RegistroForm />
            ) : (
              <Form className="signin-form">
                {/* Agrega aquí los campos del formulario de inicio de sesión */}
                <div className="form-group mb-4">
                  <Form.Control type="text" placeholder="Usuario" required />
                </div>
                <div className="form-group mb-4">
                  <Form.Control type="password" placeholder="Contraseña" required />
                  <span className="fa fa-fw fa-eye field-icon toggle-password" />
                  <div className="text-md-end mt-2">
                    <a href="#">Olvidé la contraseña</a>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <Button variant="primary" type="submit" className="form-control btn btn-primary submit px-3">Iniciar Sesión</Button>
                </div>
                <p className="w-100 text-center mt-3">— O inicia sesión con —</p>
                <div className="social d-flex text-center justify-content-center">
                <a href="#" className="px-2 py-2 fs-3">
                  <FaGoogle className="icon mb-1" /> Google
                </a>
                <a href="#" className="px-2 py-2 fs-3">
                  <FaApple className="icon mb-1 " /> Apple
                </a>
                </div>
              </Form>
              
            )}
            <div className="form-group d-md-flex justify-content-center mt-3">
              <div className="w-100 d-flex justify-content-center mt-1">
                <p>
                <Link to="#" onClick={toggleMostrarRegistro}>{textoEnlace}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioLogin;
