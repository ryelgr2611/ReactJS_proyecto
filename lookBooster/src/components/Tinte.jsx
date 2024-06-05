import React from 'react';
import Header from './Header';
import app from '../firebase/config';
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Tinte1 from '../assets/tinte1.jpg';
import Tinte2 from '../assets/tinte2.jpg';
import Tinte3 from '../assets/tinte3.jpg';

import Footer from './Footer';
import './Tinte.css';

const auth = getAuth(app);

function Tinte(){

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
                        <h1 className="display-4 py-4">Tintes</h1>
                        <p className="lead">Nuestro salón es un destino destacado para servicios de coloración de cabello. Con un equipo de coloristas expertos, nos enorgullece ofrecer soluciones de color personalizadas para cada cliente.</p>
                        <hr className="my-4" />
                        <p>Desde tonos sutiles hasta transformaciones de color audaces, nos especializamos en una variedad de técnicas de coloración, incluyendo balayage, reflejos, color completo y más. Experimenta la diferencia con nuestro enfoque personalizado para tu color de cabello.</p>
                        <div className="text-center mt-4">
                            <a href="/citas">
                                <button className="btnCita fs-3">¡Reserva ya!</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <div className="container mb-5 mt-5" id='containerTinte'>
                <div data-text="Tinte Unicolor 20€" style={{ '--r': '-15' }} className="glass">
                    <img src={Tinte1} alt="" className='w-100'/>
                </div>
                <div data-text="Tinte Bicolor 30€" style={{ '--r': '5' }} className="glass">
                    <img src={Tinte2} alt="" className='w-100'/>
                </div>
                <div data-text="Reflejos 15€" style={{ '--r': '25' }} className="glass">
                    <img src={Tinte3} alt="" className='w-100'/>
                </div>
            </div>
                <br />
                <br />
            <Footer />
        </div>
    );
};

export default Tinte;