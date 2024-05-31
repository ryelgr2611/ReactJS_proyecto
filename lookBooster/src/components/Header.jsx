
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logoCompleto.png';
import './Header.css';
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import app from '../firebase/config';
import { getAuth,signOut } from 'firebase/auth';

const auth = getAuth(app);


function Header({correoUsuario}) {
  return (
    <Navbar expand="lg" className="fs-3 sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="150"
            height="150"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="">
          <Nav className="me-auto my-2 my-lg-0 mx-auto  " navbarScroll>
            <Nav.Link as={Link} to="/sobre">Sobre Nosotros</Nav.Link>
            <NavDropdown title="Servicios" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/corte" className='text-center '>Corte de Pelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tinte" className='text-center '>Tinte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/barba" className='text-center '>Barba</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={correoUsuario ? "/perfil" : "/login"}>{correoUsuario ?  correoUsuario : <><LuLogIn /> Iniciar Sesión</>}</Nav.Link>
            <Nav.Link as={Link} onClick={() => signOut(auth)}>{correoUsuario ? <LuLogOut /> : "" } </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
