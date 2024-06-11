import React, { useState } from 'react';
import app from '../firebase/config';
import Header from './Header';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import ReactLoading from 'react-loading';
import { TbArrowBadgeDown } from "react-icons/tb";
import Footer from './Footer';
import './Contacto.css'; // Añade estilos personalizados si los necesitas

const Contacto = () => {
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    const [enviado, setEnviado] = useState(false);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            // Guardar el formulario en la base de datos
            const docRef = await addDoc(collection(db, 'contacto'), form);
            
            setEnviado(true);
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
        setLoading(false);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    onAuthStateChanged(auth, (usuarioAuth) => {
        if(usuarioAuth) {
          setUsuario(usuarioAuth);
        } else {
          setUsuario(null);
        }
      });
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <ReactLoading type={'spinningBubbles'} color='#d34f4aff' height={'200px'} width={'200px'}  />
                <div className='h1'>Cargando</div>
            </div>
        );
    }

    return (
        <div>
            <Header correoUsuario={usuario ? usuario.email : null} />
            <section className="container text-center mb-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h1 className="display-3 py-4">Contáctanos</h1>
                        <p className="lead">
                            Queremos estar en contacto contigo y responder a todas tus preguntas. Tu opinión es importante para nosotros.
                        </p>
                        <hr className="my-4" />
                        <p>
                            Si deseas comunicarte con nosotros, no dudes en llenar el formulario de contacto o utilizar cualquiera de los métodos que aparecen a continuación.
                        </p>
                      
                    </div>
                </div>
            </section>
            <h2 className='text-center fs-3 mb-4 '><TbArrowBadgeDown /> No dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto<TbArrowBadgeDown /></h2>
            <div className="contacto-container mb-5 ">
                {enviado ? (
                    <div className="mensaje-enviado">
                        <p>Tu mensaje ha sido enviado con éxito. ¡Gracias por contactarnos!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='contacto-form mb-5'>
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={form.nombre} placeholder='Introduzca su nombre' onChange={handleChange} required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={form.email} placeholder='Ingrese su correo' onChange={handleChange} required />
                        </label>
                        <label>
                            Mensaje:
                            <textarea name="mensaje" value={form.mensaje} placeholder='¿Cuál es su problema?' onChange={handleChange} required />
                        </label>
                        <button type="submit" className="btn-enviar">Enviar</button>
                    </form>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Contacto;