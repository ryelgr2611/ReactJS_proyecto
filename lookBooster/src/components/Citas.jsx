import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/config';
import 'firebase/auth';
import Header from './Header';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { TbArrowBadgeDown } from "react-icons/tb";
import Calendar from 'react-calendar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Citas.css';

function removeTimeFromDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
    let day = date.getDate();

    // Asegurarse de que el mes y el día sean de dos dígitos
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${day}-${month}-${year}`;
}

function Citas() {
    const auth = getAuth(app);
    const [usuario, setUsuario] = useState(null);
    const [empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState("");
    const [selectedServicio, setSelectedServicio] = useState("");
    const [selectedFecha, setSelectedFecha] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [citasEmpleado, setCitasEmpleado] = useState([]);

    const hours = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    for (let i = 9; i <= 19; i++) {
        if (i === 14 || i === 15) continue;
        if (removeTimeFromDate(selectedFecha) === removeTimeFromDate(now)) {
            if (i > currentHour || (i === currentHour && currentMinutes < 30)) {
                if (!citasEmpleado.some(cita => cita.hora.startsWith(i.toString()))) {
                    hours.push(i);
                }
            }
        } else {
            if (!citasEmpleado.some(cita => cita.hora.startsWith(i.toString()))) {
                hours.push(i);
            }
        }
    }

    useEffect(() => {
        const obtenerCitasEmpleado = async () => {
            try {
                const citasRef = collection(db, 'citas');
                const snapshot = await getDocs(citasRef);
                const citasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const citasEmpleado = citasData.filter(cita => cita.empleadoId === selectedEmpleado && cita.fecha === removeTimeFromDate(selectedFecha));
                setCitasEmpleado(citasEmpleado);
            } catch (error) {
                console.error('Error al obtener las citas del empleado', error);
            }
        };
    
        if (selectedEmpleado) {
            obtenerCitasEmpleado();
        }
    }, [selectedEmpleado, selectedFecha]);

    useEffect(() => {
        onAuthStateChanged(auth, (usuarioAuth) => {
            if (usuarioAuth) {
                setUsuario(usuarioAuth);
            } else {
                setUsuario(null);
                window.location.href = "/login";
            }
        });
    }, [auth]);

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Selected empleado:', selectedEmpleado);

        const cita = {
            clienteId: usuario.uid,
            empleadoId: selectedEmpleado,
            servicio: selectedServicio,
            fecha: removeTimeFromDate(selectedFecha),
            hora: selectedTime,
        };
        console.log(cita);
        try {
            const citasRef = collection(db, 'citas');
            await addDoc(citasRef, cita);
            setShowOffcanvas(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error al crear la cita', error);
        }
    };

    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <h2 className='text-center fw-bold mt-3'>Agenda tu corte de la manera más fácil</h2>
            <h2 className='textillo text-center fs-3 mb-4'>
                <TbArrowBadgeDown />No te quedes sin tu corte<TbArrowBadgeDown />
            </h2>

            <form className="d-flex text-2xl flex-column text-center px-4" onSubmit={handleFormSubmit}>
                <div className="d-flex py-4 flex-column gap-2 px-3">
                    <div className="d-flex flex-column gap-2 items-center mx-auto">
                        <div className="font-bold">Barbero</div>
                        <select
                            value={selectedEmpleado}
                            onChange={(e) => setSelectedEmpleado(e.target.value)}
                            required
                            className="border-0 "
                        >
                            <option value="" disabled>Seleccione un barbero</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.id} value={empleado.id}>
                                    {empleado.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="font-bold">Servicio</div>
                        <select value={selectedServicio} onChange={(e) => setSelectedServicio(e.target.value)} className="border-0  ">
                            <option value="" disabled>Seleccione un servicio</option>
                            <option value="Corte de Pelo">Corte de Pelo</option>
                            <option value="Tinte">Tinte</option>
                            <option value="Barba">Barba</option>
                        </select>
                    </div>
                    <div className="d-flex gap-2 flex-column mx-auto mt-3">
                    <Calendar 
                        onChange={(value) => { setSelectedFecha(value); setSelectedDay(value); }} 
                        value={selectedFecha} 
                        minDate={new Date()} 
                        tileClassName={({ date, view }) => 
                            view === "month" && 
                            date.getDate() === selectedDay?.getDate() &&
                            date.getMonth() === selectedDay?.getMonth() &&
                            date.getFullYear() === selectedDay?.getFullYear() ? "selected-day" : null}
                        tileDisabled={({ date, view }) =>
                            view === "month" && date.getDay() === 0}
                    />
                    </div>
                    <div className="d-flex flex-column w-50 mx-auto mt-3"> 
                        <div className="font-bold">Hora</div>
                        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className=' mx-auto mt-1 '>
                            <option value="" disabled>Seleccione hora</option>
                            {hours.map((hour) => (
                                <React.Fragment key={hour}>
                                    <option value={`${hour}:00`}>{`${hour}:00`}</option>
                                </React.Fragment>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-5 text-center mx-auto">
                    <button className="px-4 py-2" type="submit">Confirmar</button>
                </div>
            </form>

            <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement='bottom' className='citasOffCanva'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cita agendada</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p className='fs-1 mt-4'>Tu cita ha sido creada correctamente.</p>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Citas;
