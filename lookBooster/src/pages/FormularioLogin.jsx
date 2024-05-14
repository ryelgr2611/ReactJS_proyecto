import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './FormLogin.css'; 
import Logo from '../assets/logoCompleto.png';
import { Link } from 'react-router-dom';
import { FaGoogle, FaApple } from "react-icons/fa";
import app from '../firebase/config';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(app);


function FormularioLogin() {
  const [registrando, setRegistrando] = useState(false);

  const iniciarSesion = async (e) => {
    
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (registrando) {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario creado');
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado');
    }
    
    // Redirect to home page
    window.location.href = "/";
  };

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
              <Form className="signin-form" onSubmit={iniciarSesion}>
                {}
                <div className="form-group mb-4">
                  <Form.Control type="text" placeholder="Correo Electrónico" required id='email'/>
                </div>
                <div className="form-group mb-4">
                  <Form.Control type="password" placeholder="Contraseña" required id='password' />
                  {registrando && <Form.Control className='mt-4' type="text" placeholder="Nombre" id='name' />}
                  {registrando && <Form.Control className='mt-4' type="phone" placeholder="Teléfono" id='phone' />}
                  <span className="fa fa-fw fa-eye field-icon toggle-password" />
                  <div className="text-md-end mt-2">
                  {!registrando && <a href="#">Olvidé la contraseña</a>}
                  </div>
                </div>
                <div className="form-group mt-3">
                  <Button variant="primary" type="submit" className="form-control btn btn-primary submit px-3">{ registrando ? "Regístrate": "Inicia Sesión"}</Button>
                </div>
                <p className="w-100 text-center mt-3">— O inicia sesión con —</p>
                <div className="social d-flex text-center justify-content-center">
                <a href="#" className="px-2 py-2 fs-3">
                  <FaGoogle className="icon mb-1" /> Google
                </a>
                </div>
              </Form>
              <a onClick={()=>setRegistrando(!registrando)} className="d-flex justify-content-center mt-2 " href='#'> { registrando ? "Volver a inicio de sesión": "! Soy nuevo ! | Registrarse"}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioLogin;
