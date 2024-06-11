import React from 'react';
import Header from './Header';
import app from '../firebase/config';
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Barba1 from '../assets/barba1.jpg';
import Barba2 from '../assets/barba2.jpg';
import Barba3 from '../assets/barba3.jpeg';
import Footer from './Footer';
import './Barba.css';


function Barba(){

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
                        <h1 className="display-4 py-4">Barba</h1>
                        <p className="lead">Nuestra barbería es el sitio de confianza de tu cuidado de barba. Con asesorías personalizadas para cada cliente ofrecemos el mejor servicio para tu imagen.</p>
                        <hr className="my-4" />
                        <p>Desde estilos clásicos hasta looks modernos y audaces, nos especializamos en una variedad de técnicas de afeitado y modelado de barba, incluyendo recortes, delineados, y más. Experimenta la diferencia con nuestro enfoque personalizado para tu estilo de barba.</p>
                        <div className="text-center mt-4">
                            <a href="/citas">
                                <button className="btnCita fs-3">¡Agenda!</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <div className="container d-flex gap-5 justify-content-center mb-5 mt-5" id='containerBarba'>
                <div className="card" id='cartaBarba'>
                    <img src={Barba1} alt="" className='w-100'/>
                </div>
                <div className="card" id="cartaBarba">
                    <img src={Barba2} alt="" className='w-100'/>
                </div>
                <div className="card" id="cartaBarba">
                    <img src={Barba3} alt="" className='w-100'/>
                </div>
            </div>
                <br />
                <br />
                <div className="text-center mt-4 mb-5">
                    <a href="/citas">
                        <button className="btnCita fs-3">¡Agenda!</button>
                    </a>
                </div>
                <br />
                <br />
            <Footer />
        </div>
    );
};

export default Barba;