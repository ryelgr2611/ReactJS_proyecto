import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/config';
import 'firebase/auth';
import Header from './Header';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Equipo from './Equipo';
import './Sobre.css';

function Sobre() {
    const auth = getAuth(app);
    const [usuario, setUsuario] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const empleadosRef = collection(db, 'empleados');
                const snapshot = await getDocs(empleadosRef);
                const empleadosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEmpleados(empleadosData);
            } catch (error) {
                console.error('Error al obtener los empleados', error);
            }
        };

        obtenerEmpleados();
    }, []);

    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <div className="container-fluid">
                <h1 className="text-center mt-5">Sobre nosotros</h1>
                <section className="py-5 gap-4 d-flex justify-content-center position-relative contHistoria">
                    <div className="d-flex flex-column gap-4 px-4">
                        <p className="display-4 rotate-90 position-absolute fw-bold">Historia</p>
                        <p className="px-5 ms-5 textoHistoria">En el corazón de nuestra ciudad, una pequeña y modesta barbería abrió sus puertas. Fue en este espacio sencillo donde Alex comenzó su viaje, armado con sus confiables tijeras, navajas y una incansable búsqueda de la perfección. Desde el principio, quedó claro que la dedicación de Alex a su oficio lo distinguía de los demás.</p>
                        <p className="px-5 ms-5 textoHistoria">Con el paso del tiempo, la reputación de Alex como maestro barbero creció. No solo construyó un negocio próspero, sino también relaciones fuertes y duraderas con sus clientes. La barbería se convirtió en un lugar donde se reunían amigos, se compartían historias y las risas resonaban en el aire.</p>
                        <p className="px-5 ms-5 textoHistoria">Hoy, la Barbería de Alex ha evolucionado, pero nuestro compromiso con la excelencia permanece intacto. Hemos ampliado nuestro equipo de talentosos barberos, cada uno seleccionado por su habilidad y dedicación al arte de la barbería. Nuestros barberos no son solo profesionales; son artistas, artesanos que entienden que un gran corte de cabello es más que un servicio: es una experiencia.</p>

                    </div>
                </section>
                <h2 className="text-center mt-5">Nuestro equipo</h2>
                <div className="empleados">

                <Equipo empleados={empleados} />
                </div>
               
            </div>
        </div>
    );
}

export default Sobre;