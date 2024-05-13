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
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Inicio</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="about">Sobre Nosotros</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="servicios">Servicios</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="contacto">Contacto</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Servicios</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Política de Devolución</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Garantía de Producto</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Reembolsos</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Otros Enlaces</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Proveedores</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Encuesta de satisfación</Link></li>
                            <li className="menu-item mb-2"><Link className="menu-link" to="#">Política de cookies</Link></li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>Formas de Pago</h3>
                        <ul className="menu">
                            <li className="menu-item mb-2"><FaCreditCard /><Link className="menu-link" to="#"> Tarjeta de Crédito</Link></li>
                            <li className="menu-item mb-2"><FaPaypal /><Link className="menu-link" to="#">PayPal</Link></li>
                            <li className="menu-item mb-2"><BsBank2 /> <Link className="menu-link" to="#">Transferencia</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-bottom">
                <Container>
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
                            <p className="text-center">&copy;2024 Raul Yelamos | Todos los derechos reservados</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
