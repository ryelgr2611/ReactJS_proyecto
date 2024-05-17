import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/config';
import 'firebase/auth';
import Header from './Header';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { TbArrowBadgeDown } from "react-icons/tb";
import Calendar from 'react-calendar';
import TimePicker from 'react-bootstrap-time-picker';

function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
function removeTimeFromDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function Citas() {
    const auth = getAuth(app);
    const [usuario, setUsuario] = useState(null);
    const [empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState("");
    const [selectedServicio, setSelectedServicio] = useState("");
    const [selectedFecha, setSelectedFecha] = useState(new Date());
    const [morningTime, setMorningTime] = useState("");
    const [afternoonTime, setAfternoonTime] = useState("");
    const [activeTimePicker, setActiveTimePicker] = useState(null); // 'morning' or 'afternoon'

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

    const handleMorningChange = (value) => {
        setMorningTime(value);
    };

    const handleAfternoonChange = (value) => {
        setAfternoonTime(value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const cita = {
            clienteId: usuario.uid,
            empleadoId: selectedEmpleado,
            servicio: selectedServicio,
            fecha: removeTimeFromDate(selectedFecha),
            hora: activeTimePicker === 'morning' ? secondsToTime(morningTime) : secondsToTime(afternoonTime),
        };

        try {
            const citasRef = collection(db, 'citas');
            await addDoc(citasRef, cita);
            alert('Cita creada con éxito');
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
                        <select value={selectedEmpleado} onChange={(e) => setSelectedEmpleado(e.target.value)} required className="border w-80 border-red-800 bg-neutral-300">
                            {empleados.map((empleado) => (
                                <option key={empleado.id} value={empleado.nombre}>
                                    {empleado.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="font-bold">Servicio</div>
                        <select value={selectedServicio} onChange={(e) => setSelectedServicio(e.target.value)} className="bg-neutral-300 text-ellipsis w-80 border border-red-800 text-red-800">
                            <option value="Corte de Pelo">Corte de Pelo</option>
                            <option value="Tinte">Tinte</option>
                            <option value="Barba">Barba</option>
                        </select>
                    </div>
                    <div className="d-flex gap-2 flex-column w-25 mx-auto mt-3">
                    <Calendar onChange={setSelectedFecha} value={selectedFecha} />
                    </div>
                    <div className="d-flex gap-2 flex-row w-25 mx-auto mt-3">
                        <button
                            type="button"
                            className={`w-50 ${activeTimePicker === 'morning' ? 'bg-red-200' : 'bg-neutral-300'}`}
                            onClick={() => setActiveTimePicker('morning')}
                        >
                            Mañana
                        </button>
                        <button
                            type="button"
                            className={`w-50 ${activeTimePicker === 'afternoon' ? 'bg-red-200' : 'bg-neutral-300'}`}
                            onClick={() => setActiveTimePicker('afternoon')}
                        >
                            Tarde
                        </button>
                    </div>
                    <div className="d-flex gap-2 flex-row w-25 mx-auto mt-3">
                        {activeTimePicker === 'morning' && (
                            <div className="w-100">
                                <div className="font-bold">Selecciona la hora de la mañana</div>
                                <TimePicker
                                    onChange={handleMorningChange}
                                    value={morningTime}
                                    disableClock={true}
                                    clearIcon={null}
                                    format="HH:mm"
                                    start="09:00"
                                    end="13:30"
                                    step={30}
                                />
                            </div>
                        )}
                        {activeTimePicker === 'afternoon' && (
                            <div className="w-100">
                                <div className="font-bold">Selecciona la hora de la tarde</div>
                                <TimePicker
                                    onChange={handleAfternoonChange}
                                    value={afternoonTime}
                                    disableClock={true}
                                    clearIcon={null}
                                    format="HH:mm"
                                    start="17:00"
                                    end="19:30"
                                    step={30}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-5 text-center mx-auto">
                    <button className="px-4 py-2" type="submit">Confirmar</button>
                </div>
            </form>
        </div>
    );
}

export default Citas;
