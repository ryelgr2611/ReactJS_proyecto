import React from 'react';
import Header from './Header';
import Carrusel from './Carrusel';
import app from '../firebase/config';
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { useState } from 'react';
import { Container, Image, Col } from 'react-bootstrap';
import Corte1 from '../assets/corte1.jpg';
import Footer from './Footer';

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

            <div className="container mt-5 mb-5 ">
                <h2 className="text-center mb-4">Nuestros Precios</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card bg-transparent border-0 ">
                            <img
                                src={Corte1}
                                className="card-img-top"
                                alt="Corte Recurrente"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Corte Recurrente</h5>
                                <p className="card-text">
                                    Para nuestros clientes más fieles.
                                </p>
                                <p className="card-text">Precio: 10€</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-transparent border-0">
                            <img
                                src={Corte1}
                                className="card-img-top"
                                alt="Corte Nuevos Clientes"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Corte para nuevos clientes</h5>
                                <p className="card-text">
                                    No dudes en dejar tu cabello en nuestras manos.
                                </p>
                                <p className="card-text">Precio: 12€</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-transparent border-0">
                            <img
                                src={Corte1}
                                className="card-img-top"
                                alt="Service 3"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Servicio 3</h5>
                                <p className="card-text">
                                    Descripción del servicio 3.
                                </p>
                                <p className="card-text">Precio: $30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Corte;