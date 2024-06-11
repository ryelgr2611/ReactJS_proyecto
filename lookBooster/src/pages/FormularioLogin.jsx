import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './FormLogin.css'; 
import Logo from '../assets/logoCompleto.png';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import app from '../firebase/config';
import 'firebase/auth';
import { getAuth } from 'firebase/auth'; // Add this import statement
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Add this import statement
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore'; 
import { BsEye, BsEyeSlash } from "react-icons/bs";



const auth = getAuth(app);
const dbClientes = collection(db, 'clientes');

const dbEmpleados = collection(db, 'empleados');


function FormularioLogin() {

  const [registrando, setRegistrando] = useState(false);
  const [userId, setUserId] = useState('');
  const[revealed, setRevealed]= useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
};

  const iniciarSesion = async (e) => {
    
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validación de correo electrónico
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }


    
    let userId ;
    
    if (registrando) {
      const name = e.target.name.value;
      const surname = e.target.surname.value;
      const phone = e.target.phone.value;
      await createUserWithEmailAndPassword(auth, email, password);
      userId = auth.currentUser.uid;
      const usuario={
        id: userId,
        correo: email,
        nombre: name,
        apellido: surname,
        telefono: phone
      }
        if (email.includes('.lookbooster')) {
          await addDoc(dbEmpleados, usuario);
                
          
        } else {
          await addDoc(dbClientes, usuario);
          
        }
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      
    }
    
    // Redirect 
    
    window.location.href = '/perfil';
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
                <div className="password-wrapper">
                    <Form.Control 
                        type={revealed ? "text" : "password"} 
                        placeholder="Contraseña" 
                        required 
                        id='password' 
                        className="password-input"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_-]).{8,}"
                        title="Debe contener al menos un número, una letra mayúscula, una letra minúscula, un carácter especial y al menos 8 o más caracteres."
                    />
                    <div className="password-icon" onClick={handleReveal}>
                        {revealed ? <BsEyeSlash /> : <BsEye />}
                    </div>
                </div>
                  {registrando && <Form.Control className='mt-4' type="text" placeholder="Nombre" id='name' />}
                  {registrando && <Form.Control className='mt-4' type="text" placeholder="Apellido" id='surname' />}
                  {registrando && <Form.Control className='mt-4' type="phone" placeholder="Teléfono" id='phone' pattern="[67][0-9]{8}" title="Debe ser un número de teléfono válido" />}
                  <span className="fa fa-fw fa-eye field-icon toggle-password" />
                  <div className="text-md-end mt-2">
                  {!registrando && <a href="#" onClick={() => ResetPassAsync(document.getElementById('email').value)}>Olvidé la contraseña</a>}
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
