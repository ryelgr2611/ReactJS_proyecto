/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCreditCard,FaPaypal,FaFacebook,FaTwitter,FaLinkedin,FaInstagram  } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
                <Row className='w-75'>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Inicio</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="/sobre">Sobre Nosotros</Link></li>
                            
                            <li className="menu-item mb-2"><Link className="menu-link" to="contacto">Contacto</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Servicios</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="/corte">Corte de pelo</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="/tinte">Tinte</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="/barba">Barba</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Otros Enlaces</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Proveedores</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Política de privacidad</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Política de cookies</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Preguntas frecuentes</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">¿Trabajar con vosotros?</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">¿Puedo cancelar mi cita?</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">¿Necesito tener cuenta para pedir mi cita?</Link></li>
                        </ul>
                    </Col>
                </Row>
            <div className="footer-bottom">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <ul className="social-icon">
                            <li className="social-icon-item"><a className="social-icon-link" href="#"><FaFacebook /></a></li>
                            <li className="social-icon-item"><a className="social-icon-link" href="#"><FaTwitter /></a></li>
                            <li className="social-icon-item"><a className="social-icon-link" href="#"><FaLinkedin /></a></li>
                            <li className="social-icon-item"><a className="social-icon-link" href="#"><FaInstagram /></a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <img src="img/pago.png" className="w-75 d-block mx-auto" alt="" />
                        <p className="text-center">&copy;2024 Lookbooster | Todos los derechos reservados</p>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
