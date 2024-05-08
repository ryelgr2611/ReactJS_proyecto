
import { Form, Button } from 'react-bootstrap';
import './FormLogin.css'; 
import Logo from '../assets/logoCompleto.png';
import { Link } from 'react-router-dom';



function FormularioLogin() {
  return (
    <div className="container mb-0 mt-5 ">
      
        <div className="col-12 text-center mb-4 mt-5">
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
            <Form className="signin-form">
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
              <div className="form-group d-md-flex justify-content-center mt-3">
                <div className="w-100 d-flex justify-content-center">
                  <a href="#">! Soy nuevo ! | registrarse</a>
                </div>
              </div>
            </Form>
            <p className="w-100 text-center mt-4">— O inicia sesión con —</p>
            <div className="social d-flex text-center justify-content-center">
              <a href="#" className="px-2 py-2 mr-md-1 rounded"><i className="bi bi-google me-1" /> Google</a>
              <a href="#" className="px-2 py-2 ml-md-1 rounded"><i className="bi bi-apple me-1" /> Apple</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioLogin;
