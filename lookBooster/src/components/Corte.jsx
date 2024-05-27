import React from 'react';
import Header from './Header';
import Carrusel from './Carrusel';
import app from '../firebase/config';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState } from 'react';
import { Container, Image, Col } from 'react-bootstrap';
import Corte1 from '../assets/corte1.jpg';
import Footer from './Footer';
import './Corte.css';

const auth = getAuth(app);

function Corte(){

    const auth = getAuth(app);

    const [usuario,setUsuario] = useState(null); 

    onAuthStateChanged(auth, (usuarioAuth) => {
        if(usuarioAuth) {
        setUsuario(usuarioAuth);
        } else {
        setUsuario(null);
        }
    });

    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <div className="relative ">
                <h1 className="h-100 d-flex align-items-center text-center position-absolute z-1 end-0 pe-4 ">
                    Cortes de Pelo
                </h1>
                <Image
                    src="https://lella.qodeinteractive.com/wp-content/uploads/2019/08/title-area-img-3.jpg"
                    className="d-flex w-100"
                    alt="Our Services"
                />
            </div>
            <Carrusel />

            <section className="container mt-3">
                <h2 className="text-center text-3xl py-4 ">Algunos de nuestros precios</h2>
                <ul className="row list-unstyled">
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Clásico</h3>
                                <p className="card-text">Un corte limpio y tradicional, perfecto para cualquier ocasión.</p>
                                <p className="card-text text-danger font-weight-bold">20€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Moderno</h3>
                                <p className="card-text">Estilos modernos y frescos adaptados a las últimas tendencias.</p>
                                <p className="card-text text-danger font-weight-bold">25€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte" >
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte Degradado</h3>
                                <p className="card-text">Un corte con un degradado suave y elegante.</p>
                                <p className="card-text text-danger font-weight-bold">30€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte con Diseño</h3>
                                <p className="card-text">Añade un diseño único a tu corte para un look original.</p>
                                <p className="card-text text-danger font-weight-bold">35€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte para Niños</h3>
                                <p className="card-text">Cortes divertidos y adecuados para los más pequeños.</p>
                                <p className="card-text text-danger font-weight-bold">15€</p>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm" id="cartaCorte">
                            <div className="card-body">
                                <h3 className="card-title text-danger" id="tituloCarta">Corte con Afeitado</h3>
                                <p className="card-text">Un corte completo con un afeitado profesional.</p>
                                <p className="card-text text-danger font-weight-bold">40€</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

            <div className="container mt-5 mb-5 ">
                <h2 className="text-center mb-4">Opiniones de nuestros clientes</h2>
                <article className="review">
                    <div className="img-container">
                        <img src={Corte1} alt={name} className="person-img" />
                        <span className="quote-icon">
                        <FaQuoteRight />
                        </span>
                    </div>
                    <h4 className="author">Raúl Yélamos</h4>
                    <p className="job">Cliente nuevo</p>
                    <p className="info">Un amigo me recomendó una peluquería nueva, así que decidí probarla. El ambiente era acogedor y el estilista muy profesional. Después de una breve consulta, comenzó a trabajar con precisión, utilizando tijeras y máquina.

                    El resultado final fue increíble: un corte moderno que se adaptaba perfectamente a mi estilo. Me sentí renovado y recibí muchos cumplidos de amigos y familiares. Definitivamente, volveré a esa peluquería. Fue una experiencia fantástica que me dio mucha confianza.</p>
                    <div className="button-container">
                        <button className="prev-btn" >
                        <FaChevronLeft />
                        </button>
                        <button className="next-btn" >
                        <FaChevronRight />
                        </button>
                    </div>
                    
                </article>
            </div>
            <Footer />
        </div>
    );
};

export default Corte;