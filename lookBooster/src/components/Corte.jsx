import React from 'react';
import Header from './Header';
import Carrusel from './Carrusel';
import app from '../firebase/config';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Container, Image, Col } from 'react-bootstrap';
import Corte1 from '../assets/corte1.jpg';
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

    const opiniones = [
        {
          img: Corte1,
          name: 'Raúl Yélamos',
          job: 'Cliente nuevo',
          info: 'Un amigo me recomendó una peluquería nueva, así que decidí probarla. El ambiente era acogedor y el estilista muy profesional. Después de una breve consulta, comenzó a trabajar con precisión, utilizando tijeras y máquina. El resultado final fue increíble: un corte moderno que se adaptaba perfectamente a mi estilo. Me sentí renovado y recibí muchos cumplidos de amigos y familiares. Definitivamente, volveré a esa peluquería. Fue una experiencia fantástica que me dio mucha confianza.'      
        },
        {
            img: Corte1,
            name: 'Ramón González',
            job: 'Cliente habitual',
            info: 'He sido cliente de esta peluquería durante años y siempre he estado satisfecho con los resultados. El personal es amable y profesional, y siempre me hacen sentir bienvenido. El estilista que me atendió esta vez fue muy atento y se aseguró de que me sintiera cómodo durante todo el proceso. Me encantó el corte que me hizo y me sentí genial después de salir de la peluquería. Recomiendo encarecidamente esta peluquería a cualquiera que busque un corte de calidad y un excelente servicio. ¡No te decepcionará!'
        },
        { img: Corte1,
            name: 'Pepe Martí',
            job: 'Cliente habitual',
            info: 'Siempre he sido muy exigente con mi cabello y he tenido malas experiencias en el pasado. Sin embargo, esta peluquería me ha demostrado que todavía hay esperanza. El estilista que me atendió fue muy profesional y me hizo sentir cómodo desde el principio. Escuchó mis peticiones y me dio consejos útiles sobre cómo cuidar mi cabello en casa. El corte que me hizo fue exactamente lo que quería y me sentí increíble después de salir de la peluquería. Definitivamente volveré y recomendaré esta peluquería a mis amigos y familiares.'
        }
    ];
    // Estado para mantener el índice de la opinión actual
    const [indiceActual, setIndiceActual] = useState(0);

    // Funciones para manejar los clics en los botones
    const prevOpinion = () => {
        setIndiceActual(indiceActual === 0 ? opiniones.length - 1 : indiceActual - 1);
    };

    const nextOpinion = () => {
        setIndiceActual(indiceActual === opiniones.length - 1 ? 0 : indiceActual + 1);
    };

    // Opinión actual
    const opinionActual = opiniones[indiceActual];

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
          <img src={opinionActual.img} alt={opinionActual.name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{opinionActual.name}</h4>
        <p className="job">{opinionActual.job}</p>
        <p className="info">{opinionActual.info}</p>
        <div className="button-container">
          <button className="prev-btn" onClick={prevOpinion}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextOpinion}>
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