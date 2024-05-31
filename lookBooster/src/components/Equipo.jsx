/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Equipo.css'
import Raul from '../assets/raul.jpeg'
import Alex from '../assets/alex.jpg'
import Enzo from '../assets/enzo.jpg'
import ReactCardFlip from 'react-card-flip';


function Equipo() {
   const [isFlipped1, setIsFlipped1] = useState(false);
   const [isFlipped2, setIsFlipped2] = useState(false);
   const [isFlipped3, setIsFlipped3] = useState(false);

   const handleClick1 = (e) => {
       e.preventDefault();
       setIsFlipped1(!isFlipped1);
   };

   const handleClick2 = (e) => {
       e.preventDefault();
       setIsFlipped2(!isFlipped2);
   };

   const handleClick3 = (e) => {
       e.preventDefault();
       setIsFlipped3(!isFlipped3);
   };
   
return (
           <section className="d-flex flex-wrap justify-content-center gap-4 py-4">
                   <ReactCardFlip isFlipped={isFlipped1}>
                     <div className="position-relative" >
                        <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white">Enzo</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">CM</p>
                              <p>|</p>
                              <a className="textos textoLink" onClick={handleClick1}>Leer más</a>
                        </div>
                        <img className="imgEquipo brightness-80" src={Enzo}></img>
                     </div>
                     <div className="position-relative " >
                           <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <a className="textos textoLink" onClick={handleClick1}>Volver</a>
                           </div>
                           <div className="position-absolute py-5 d-flex justify-content-center gap-2 w-100">
                           <p className="textos font-weight-bold fs-4 text-white px-5 z-1">Nuestro CM es una persona dedicada y comprometida con su trabajo. Siempre está dispuesto a ayudar y brindar soluciones a los problemas que surgen en el equipo. Su experiencia y conocimientos en el campo de la comunicación son invaluables para el éxito de nuestros proyectos. ¡Estamos muy contentos de tenerlo en nuestro equipo!</p>

                           </div>
                           <img className="imgEquipo imgEquipo-black z-0" src={Enzo}></img>
                     </div>
                  </ReactCardFlip>
                  <ReactCardFlip isFlipped={isFlipped2}>
                     <div className="position-relative">
                        <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white">Álex</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">Owner</p>
                              <p>|</p>
                              <a className="textos textoLink" onClick={handleClick2}>Leer más</a>
                        </div>
                        <img className="imgEquipo brightness-80" src={Alex}></img>
                     </div>
                     <div className="position-relative ">
                           <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <a className="textos textoLink" onClick={handleClick2}>Volver</a>
                           </div>
                           <div className="position-absolute py-5 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold fs-4 text-white px-5 z-1">El dueño de nuestra barbería, es una persona apasionada y visionaria. Con una dedicación inquebrantable y un amor profundo por nuestro sector, ha construido un lugar donde la excelencia y la comunidad se encuentran. Su liderazgo y su habilidad para conectar con los clientes han sido fundamentales para el éxito y la reputación de nuestra barbería. ¡Nos sentimos muy afortunados de tenerlo como nuestro líder y guía!</p>
                           </div>
                           <img className="imgEquipo imgEquipo-black z-0" src={Alex}></img>
                     </div>
                  </ReactCardFlip>
                  <ReactCardFlip isFlipped={isFlipped3}>
                     <div className="position-relative" >
                        <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white">Raúl</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">Web developer</p>
                              <p>|</p>
                              <a className="textos textoLink" onClick={handleClick3}>Leer más</a>
                        </div>
                        <img className="imgEquipo brightness-80" src={Raul}></img>
                     </div>
                     <div className="position-relative ">
                           <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <a className="textos textoLink" onClick={handleClick3}>Volver</a>
                           </div>
                           <div className="position-absolute py-5 d-flex justify-content-center gap-2 w-100">
                           <p className="textos font-weight-bold fs-4 text-white px-5 z-1"> Nuestro desarrollador web, es un profesional altamente capacitado y creativo. Siempre está a la vanguardia de las últimas tecnologías y tendencias, asegurando que nuestra presencia en línea sea moderna y funcional. Su atención al detalle y su capacidad para resolver problemas técnicos son esenciales para el crecimiento digital de nuestro negocio.</p>

                           </div>
                           <img className="imgEquipo imgEquipo-black z-0" src={Raul}></img>
                     </div>
                  </ReactCardFlip>
           </section>
)
}

export default Equipo