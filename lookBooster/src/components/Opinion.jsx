import React from 'react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import Corte1 from '../assets/corte1.jpg';


function Opinion() {
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
    );
}

export default Opinion;