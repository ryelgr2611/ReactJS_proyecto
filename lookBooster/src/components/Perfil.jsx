import React, { useState, useEffect } from 'react';
import Header from './Header';
import app from '../firebase/config';
import { db } from '../firebase/config';
import { doc, collection, getDocs, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import {
    MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn
} from 'mdb-react-ui-kit';
import Calendar from 'react-calendar';
import './Perfil.css';

function Perfil() {
    const auth = getAuth(app);
    const [usuario, setUsuario] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [citas, setCitas] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioAuth) => {
            if (usuarioAuth) {
                setUsuario(usuarioAuth);
            } else {
                setUsuario(null);
                window.location.href = "/";
            }
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const clientesRef = collection(db, 'clientes');
                const empleadosRef = collection(db, 'empleados');
                const citasRef = collection(db, 'citas');

                onSnapshot(clientesRef, (snapshot) => {
                    setClientes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                });
                onSnapshot(empleadosRef, (snapshot) => {
                    setEmpleados(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                });
                onSnapshot(citasRef, (snapshot) => {
                    setCitas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    setLoading(false);
                });
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };
        obtenerDatos();
    }, []);

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            if (usuario) {
                let coleccion = usuario.email.includes('lookbooster') ? 'empleados' : 'clientes';
                try {
                    const usuarioRef = collection(db, coleccion);
                    const snapshot = await getDocs(usuarioRef);
                    const usuarioData = snapshot.docs.find(doc => doc.data().correo === usuario.email);
                    if (usuarioData) {
                        setDatosUsuario(usuarioData.data());
                    }
                } catch (error) {
                    console.error(`Error al obtener los datos del usuario desde la colección ${coleccion}`, error);
                }
            }
        };
        obtenerDatosUsuario();
    }, [usuario]);

    const eliminarCita = async (id) => {
        if (usuario.email.includes('lookbooster')) {
            try {
                await deleteDoc(doc(db, 'citas', id));
                setCitas(prevCitas => prevCitas.filter(cita => cita.id !== id));
            } catch (error) {
                console.error('Error al eliminar la cita', error);
            }
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    const editarCita = async (citaEditada) => {
        try {
            const citaRef = doc(db, 'citas', citaEditada.id);
            await updateDoc(citaRef, citaEditada);
            setCitas(prevCitas => prevCitas.map(cita => cita.id === citaEditada.id ? citaEditada : cita));
        } catch (error) {
            console.error('Error al actualizar la cita', error);
        }
    };
    return (
        <div>
            <Header correoUsuario={usuario ? usuario.email : null} />
            <section>
                <div className="container-fluid py-5">
                    <MDBRow>
                        <MDBCol lg="4" md="12">
                            <MDBCard className="mb-4 border-0">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <MDBRow className='mt-5'>
                                        <MDBCol sm="4">
                                            <MDBCardText>Nombre</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="8">
                                            <MDBCardText className="text-muted">{datosUsuario?.nombre || ''}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="4">
                                            <MDBCardText>Apellido</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="8">
                                            <MDBCardText className="text-muted">{datosUsuario?.apellido || ''}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="4">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="8">
                                            <MDBCardText className="text-muted">{datosUsuario?.correo || ''}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="4">
                                            <MDBCardText>Teléfono</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="8">
                                            <MDBCardText className="text-muted">{datosUsuario?.telefono || ''}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol lg="8" md="12">
                            <div className="card-deck mb-4 border-0 bg-transparent">
                                <div className='d-flex flex-wrap gap-4 justify-content-center'>
                                    {usuario?.email.includes('lookbooster') ? (
                                        citas.filter(cita => cita.empleadoId === usuario.uid).map((cita, index) => {
                                            const cliente = clientes.find(cli => cli.id === cita.clienteId);
                                            return (
                                                <CitaCard
                                                    key={index}
                                                    cita={cita}
                                                    persona={cliente}
                                                    onEliminar={eliminarCita}
                                                    onEditar={editarCita} // Pasa la función de edición
                                                    tipo="empleado"
                                                />
                                            );
                                        })
                                    ) : (
                                        citas.filter(cita => cita.clienteId === usuario.uid).map((cita, index) => {
                                            const empleado = empleados.find(emp => emp.id === cita.empleadoId);
                                            return (
                                                <CitaCard
                                                    key={index}
                                                    cita={cita}
                                                    persona={empleado}
                                                    tipo="cliente"
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            </section>
        </div>
    );
}

const CitaCard = ({ cita, persona, onEliminar, onEditar, tipo }) => {
    const [editando, setEditando] = useState(false);
    const [citaEditada, setCitaEditada] = useState({ ...cita });

    const handleEditChange = (e) => {
        setCitaEditada({
            ...citaEditada,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEditar(citaEditada);
        setEditando(false);
    };

    return (
        <div id="cartaCita" className={`col-4 ${editando ? 'editando' : ''}`}>
            <div id='cartaCitaInner'>
                {editando ? (
                    <form id='cartaCitaFront' onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            name="fecha"
                            value={citaEditada.fecha}
                            onChange={handleEditChange}
                            placeholder="Fecha"
                        />
                        <input
                            type="text"
                            name="hora"
                            value={citaEditada.hora}
                            onChange={handleEditChange}
                            placeholder="Hora"
                        />
                        <input
                            type="text"
                            name="servicio"
                            value={citaEditada.servicio}
                            onChange={handleEditChange}
                            placeholder="Servicio"
                        />
                        <textarea
                            name="observaciones"
                            value={citaEditada.observaciones}
                            onChange={handleEditChange}
                            placeholder="Observaciones"
                        />
                        <button type="submit">Guardar</button>
                    </form>
                ) : (
                    <div id='cartaCitaFront'>
                        <p>{cita.fecha}, a las {cita.hora}</p>
                        <p>Con {tipo === "empleado" ? 'el cliente' : 'el barbero'}: <strong>{persona ? persona.nombre : `${tipo === "empleado" ? 'Cliente' : 'Empleado'} no encontrado`}</strong></p>
                        <p>{cita.servicio}</p>
                        <p>Observaciones: {cita.observaciones}</p>
                    </div>
                )}
                <div id='cartaCitaBack'>
                    {tipo === "empleado" && (
                        <>
                            <button id='btnBackCard' onClick={() => onEliminar(cita.id)}>Eliminar Cita</button>
                            <button id='btnBackCard' onClick={() => setEditando(true)}>Editar Cita</button>
                        </>
                    )}
                    <a href={`tel:${persona?.telefono}`}>
                        <button id='btnBackCard'>Contactar {tipo === "empleado" ? 'Cliente' : 'Barbero'}</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
