import React from 'react';
import Header from './Header';
import Carrusel from './Carrusel';
import app from '../firebase/config';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Container, Image, Col } from 'react-bootstrap';
import Clasico from '../assets/clasico.jpg';
import Moderno from '../assets/moderno.jpg';
import Degradado from '../assets/degradado.jpg';
import Diseño from '../assets/diseño.jpg';
import Niños from '../assets/niños.jpg';
import Afeitado from '../assets/afeitado.jpg';
import Footer from './Footer';
import './Corte.css';

const auth = getAuth(app);

function Corte(){

    const auth = getAuth(app);

    const [usuario,setUsuario] = useState(null); 

    useEffect(() => {
        onAuthStateChanged(auth, (usuarioAuth) => {
            if(usuarioAuth) {
            setUsuario(usuarioAuth);
            } else {
            setUsuario(null);
            }
        });
    }, []);

    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <section className="container  text-center mb-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h1 className="display-4 py-4">Corte de Pelo</h1>
                        <p className="lead">En nuestra peluquería ofrecemos una amplia variedad de cortes de pelo para hombres y niños. Nuestros estilistas profesionales están capacitados para crear estilos modernos y clásicos que se adapten a tus necesidades y preferencias.</p>
                        <hr className="my-4" />
                        <p>Ya sea que estés buscando un corte clásico, un degradado elegante o un diseño único, estamos aquí para ayudarte a lucir tu mejor versión. ¡Ven a visitarnos y descubre lo que podemos hacer por ti!</p>
                        <div className="text-center mt-4">
                            <a href="/citas">
                                <button className="btnCita fs-3">Pedir Cita</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Carrusel />

            <section className="container mt-3">
                <h2 className="text-center text-3xl py-4 ">Algunos de nuestros precios</h2>
                <ul className="row list-unstyled">
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                        <img src={Clasico} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Clásico</h3>
                                <p className="card-text">Un corte limpio y tradicional, perfecto para cualquier ocasión.</p>
                                <p className="card-text text-danger font-weight-bold">20€</p>
                                
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                        <img src={Moderno} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Moderno</h3>
                                <p className="card-text">Estilos modernos y frescos adaptados a las últimas tendencias.</p>
                                <p className="card-text text-danger font-weight-bold">25€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte" >
                        <img src={Degradado} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Degradado</h3>
                                <p className="card-text">Un corte con un degradado suave y elegante.</p>
                                <p className="card-text text-danger font-weight-bold">30€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                        <img src={Diseño} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte con Diseño</h3>
                                <p className="card-text">Añade un diseño único a tu corte para un look original.</p>
                                <p className="card-text text-danger font-weight-bold">35€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                        <img src={Niños} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte para Niños</h3>
                                <p className="card-text">Cortes divertidos y adecuados para los más pequeños.</p>
                                <p className="card-text text-danger font-weight-bold">15€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                        <img src={Afeitado} alt="Descripción de la imagen" className="card-img-top " />
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte con Afeitado</h3>
                                <p className="card-text">Un corte completo con un afeitado profesional.</p>
                                <p className="card-text text-danger font-weight-bold">40€</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="text-center mt-4 mb-5">
                    <a href="/citas">
                        <button className="btnCita fs-3">Pedir Cita</button>
                    </a>
                </div>
            </section>

            
            <Footer />
        </div>
    );
};

export default Corte;