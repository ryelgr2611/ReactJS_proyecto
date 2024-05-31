import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import app from '../firebase/config';
import 'firebase/auth';
import 'firebase/firestore';
import { db } from '../firebase/config';
import { doc,collection, getDocs, addDoc, deleteDoc,updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';
import './Perfil.css';
import { Button } from 'react-bootstrap';

function Perfil() {
    const auth = getAuth(app);

    const [usuario,setUsuario] = useState(null); 
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [citas, setCitas] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const clientesRef = collection(db, 'clientes');
                const snapshot = await getDocs(clientesRef);
                const clientesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setClientes(clientesData);
            } catch (error) {
                console.error('Error al obtener los clientes', error);
            }
        };

        obtenerClientes();
    }, []);
    
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

    useEffect(() => {
        const obtenerCitas = async () => {
            try {
                const citasRef = collection(db, 'citas');
                const snapshot = await getDocs(citasRef);
                const citasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCitas(citasData);
            } catch (error) {
                console.error('Error al obtener las citas', error);
            }
        };
    
        obtenerCitas();
    }, []);

    onAuthStateChanged(auth, (usuarioAuth) => {
        if(usuarioAuth) {
        setUsuario(usuarioAuth);
        } else {
        setUsuario(null);
        window.location.href = "/";
        }
    });
    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            if (usuario) {
                let coleccion = usuario.email.includes('lookbooster') ? 'empleados' : 'clientes';
                console.log(coleccion);
                
                try {
                    const usuarioRef = collection(db, coleccion);
                    const snapshot = await getDocs(usuarioRef);
                    const usuarioData = snapshot.docs.find(doc => doc.data().correo === usuario.email);
                    if (usuarioData) {
                        setDatosUsuario(usuarioData.data());
                        console.log(usuarioData.data());
                    }
                } catch (error) {
                    console.error(`Error al obtener los datos del usuario desde la colección ${coleccion}`, error);
                }
            }
        };
    
        obtenerDatosUsuario();
    }, [usuario]);

    const eliminarCita = async (id) => {
        if (usuario.email.includes('lookbooster')) { // Solo permitir a los empleados eliminar citas
            try {
                await deleteDoc(doc(db, 'citas', id));
                setCitas(citas.filter(cita => cita.id !== id)); // Actualizar el estado local
            } catch (error) {
                console.error('Error al eliminar la cita', error);
            }
        }
    };
    
    const actualizarDatosUsuario = async (nuevosDatos) => {
        if (usuario) {
            let coleccion = usuario.email.includes('lookbooster') ? 'empleados' : 'clientes';
            try {
                const usuarioRef = doc(db, coleccion, usuario.uid);
                await updateDoc(usuarioRef, nuevosDatos);
                setDatosUsuario(nuevosDatos);
            } catch (error) {
                console.error(`Error al actualizar los datos del usuario en la colección ${coleccion}`, error);
            }
        }
    };
    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <section>
                <div className=" container-fluid py-5 ">
                    <MDBRow>
                        <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid />
                                <MDBRow className='mt-5'>
                                <MDBCol sm="3">
                                    <MDBCardText>Nombre</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{datosUsuario ? datosUsuario.nombre : ''}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Apellido</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{datosUsuario ? datosUsuario.apellido : ''}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{datosUsuario ? datosUsuario.correo : ''}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Teléfono</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{datosUsuario ? datosUsuario.telefono : ''}</MDBCardText>
                                </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>

                        <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                            {usuario && usuario.email.includes('lookbooster') ? (
                                citas
                                    .filter(cita => cita.empleadoId === usuario.uid)
                                    .map((cita, index) => {
                                        const cliente = clientes.find(cli => cli.id === cita.clienteId);
                                        return (
                                            <div key={index}>
                                                <h2>{cita.fecha}, a las {cita.hora}</h2>
                                                <h2>Con el cliente: <strong>{cliente ? cliente.nombre : 'Cliente no encontrado'}</strong></h2>
                                                <p>{cita.servicio}</p>
                                                <Button onClick={() => eliminarCita(cita.id)} className='botonEliminar'>Eliminar Cita</Button>
                                                <hr />
                                            </div>
                                        );
                                    })
                            ) : (
                                citas
                                    .filter(cita => cita.clienteId === usuario.uid)
                                    .map((cita, index) => {
                                        const empleado = empleados.find(emp => emp.id === cita.empleadoId);
                                        return (
                                            <div key={index}>
                                                <h2>{cita.fecha}, a las {cita.hora}</h2>
                                                <h2>Con el barbero: <strong>{empleado ? empleado.nombre : 'Empleado no encontrado'}</strong></h2>
                                                <p>{cita.servicio }</p>
                                                <hr />
                                            </div>
                                        );
                                    })
                            )}
                            </MDBCardBody>
                        </MDBCard>
                        
                        </MDBCol>
                    </MDBRow>
                </div>
            </section>
        </div>

    );
}

export default Perfil