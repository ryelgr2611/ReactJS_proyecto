
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logoCompleto.png';
import './Header.css';

function Header() {
  return (
    <Navbar expand="lg" className="fs-3">
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
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
            <NavDropdown title="Servicios" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/service1">Corte de Pelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/service2">Tinte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/service3">Barba</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
