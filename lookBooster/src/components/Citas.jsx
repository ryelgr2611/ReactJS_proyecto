import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/config';
import 'firebase/auth';
import Header from './Header';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
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
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [citasEmpleado, setCitasEmpleado] = useState([]);
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [observaciones, setObservaciones] = useState('');

    // Definir los servicios y su duración
    const servicios = {
        "Corte de Pelo": 60,
        "Tinte": 30,
        "Barba": 30
    };

    const calculateTotalDuration = () => {
        let totalDuration = 0;
        selectedServicios.forEach(servicio => {
            totalDuration += servicios[servicio];
        });
        setTotalDuration(totalDuration);
    };

    const generateAvailableHours = () => {
        let availableHours = []; // Iniciar con un array vacío
    
        // Asegurarse de que totalDuration nunca sea 0
        let increment = totalDuration > 0 ? totalDuration / 60 : 1;
    
        // Obtener la fecha y hora actual
        let now = new Date();
        let currentHour = now.getHours() + now.getMinutes() / 60;
    
        // Comprobar si el día seleccionado es el mismo que el día actual
        let isToday = selectedDay && selectedDay.getDate() === now.getDate() &&
                      selectedDay.getMonth() === now.getMonth() &&
                      selectedDay.getFullYear() === now.getFullYear();
    
        // Ajustar la hora de inicio si la hora actual está dentro del rango de horas y el día seleccionado es hoy
        let startHourMorning = isToday && currentHour >= 9 && currentHour < 14 ? Math.ceil(currentHour / increment) * increment : 9;
        let startHourAfternoon = isToday && currentHour >= 17 && currentHour < 20 ? Math.ceil(currentHour / increment) * increment : 17;
    
        // Generar las horas disponibles en función de la duración total de los servicios seleccionados
        for (let hour = startHourMorning; hour <= 14; hour += increment) {
            if (!isToday || hour >= currentHour) {
                // Comprobar si el empleado tiene una cita a esta hora
                let isBooked = citasEmpleado.some(cita => {
                    let citaHour = parseInt(cita.hora.split(':')[0]) + parseInt(cita.hora.split(':')[1]) / 60;
                    let citaServices = cita.servicio.split(', ');
                    let citaDuration = citaServices.reduce((total, servicio) => total + servicios[servicio] / 60, 0);
                    return (citaHour <= hour && hour < citaHour + citaDuration) || (citaHour < hour + totalDuration / 60 && hour + totalDuration / 60 <= citaHour + citaDuration);
                });
    
                if (!isBooked) {
                    availableHours.push({ hour: Math.floor(hour), minute: Math.floor((hour % 1) * 60) });
                }
            }
        }
        for (let hour = startHourAfternoon; hour <= 20; hour += increment) {
            if (!isToday || hour >= currentHour) {
                // Comprobar si el empleado tiene una cita a esta hora
                let isBooked = citasEmpleado.some(cita => {
                    let citaHour = parseInt(cita.hora.split(':')[0]) + parseInt(cita.hora.split(':')[1]) / 60;
                    let citaServices = cita.servicio.split(', ');
                    let citaDuration = citaServices.reduce((total, servicio) => total + servicios[servicio] / 60, 0);
                    return (citaHour <= hour && hour < citaHour + citaDuration) || (citaHour <= hour + totalDuration / 60 && hour + totalDuration / 60 < citaHour + citaDuration);
                });
    
                if (!isBooked) {
                    availableHours.push({ hour: Math.floor(hour), minute: Math.floor((hour % 1) * 60) });
                }
            }
        }
    
        return availableHours;
    };

    const handleServiceChange = (event) => {
        const servicio = event.target.value;
        if (event.target.checked) {
            setSelectedServicios((prevServicios) => [...prevServicios, servicio]);
            console.log('Servicios seleccionados:', selectedServicios);
        } else {
            setSelectedServicios((prevServicios) => prevServicios.filter((s) => s !== servicio));
        }
    };
    const handleObservacionesChange = (event) => {
        setObservaciones(event.target.value);
    };

    useEffect(() => {
        calculateTotalDuration();
    }, [selectedServicios]);

    useEffect(() => {
        const obtenerCitasEmpleado = async () => {
            try {
                const citasRef = collection(db, 'citas');
                const snapshot = await getDocs(citasRef);
                const citasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const citasEmpleado = citasData.filter(cita => cita.empleadoId === selectedEmpleado && cita.fecha === removeTimeFromDate(selectedDay));
                setCitasEmpleado(citasEmpleado);
            } catch (error) {
                console.error('Error al obtener las citas del empleado', error);
            }
        };
    
        if (selectedEmpleado) {
            obtenerCitasEmpleado();
        }
    }, [selectedEmpleado, selectedDay]);

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
            servicio: selectedServicios.join(', '),
            observaciones: observaciones,
            fecha: removeTimeFromDate(selectedDay),
            hora: selectedTime,
        };
        console.log(cita);
        try {
            const citasRef = collection(db, 'citas');
            await addDoc(citasRef, cita);
            setShowOffcanvas(true);
            
            setTimeout(() => {
                window.location.href = "/perfil";
            }, 1000);
        } catch (error) {
            console.error('Error al crear la cita', error);
        }
    };
    const eliminarCitasAntiguas = async () => {
        try {
            const citasRef = collection(db, 'citas');
            const snapshot = await getDocs(citasRef);
            const citasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const hoy = new Date();
            hoy.setDate(hoy.getDate() - 1); 
            const fechaActual = removeTimeFromDate(hoy);
    
            const citasAEliminar = citasData.filter(cita => {
                const [day, month, year] = cita.fecha.split('-');
                const fechaCita = new Date(`${year}-${month}-${day}`);
                return fechaCita <= hoy;
            });
    
            const deletePromises = citasAEliminar.map(cita => deleteDoc(doc(db, 'citas', cita.id)));
            await Promise.all(deletePromises);
    
            console.log('Citas antiguas eliminadas');
        } catch (error) {
            console.error('Error al eliminar citas antiguas', error);
        }
    };

    useEffect(() => {
        eliminarCitasAntiguas();
    }, []);

    return (
        <div>
            <Header correoUsuario={usuario !== null ? usuario.email : null} />
            <h2 className='text-center fw-bold mt-3'>Agenda tu corte de la manera más fácil</h2>
            <h2 className='textillo text-center fs-3 mb-0'>
                <TbArrowBadgeDown />No te quedes sin tu corte<TbArrowBadgeDown />
            </h2>

            <form className="d-flex text-2xl flex-column text-center px-4" onSubmit={handleFormSubmit}>
                <div className="d-flex py-4 flex-column gap-2 px-3">
                    <div className="d-flex gap-2 flex-column mx-auto mt-3">
                    <div className="font-bold">Día</div>
                        <Calendar 
                            onChange={(value) => {  setSelectedDay(value); }} 
                            value={selectedDay} 
                            minDate={new Date()} 
                            tileClassName={({ date, view }) => 
                                view === "month" && 
                                date.getDate() === selectedDay?.getDate() &&
                                date.getMonth() === selectedDay?.getMonth() &&
                                date.getFullYear() === selectedDay?.getFullYear() ? "selected-day" : null}
                            tileDisabled={({ date, view }) =>
                                view === "month" && (date.getDay() === 0 || (date.getDate() === new Date().getDate() && new Date().getHours() >= 20))}
                        />
                    </div>
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
                        <div className="font-bold mt-1">Servicio</div>
                        <div className="d-flex flex-wrap">
                            {Object.keys(servicios).map((servicio) => (
                                <div key={servicio} className="px-2">
                                    <input
                                        type="checkbox"
                                        id={servicio}
                                        name={servicio}
                                        value={servicio}
                                        onChange={(e) => handleServiceChange(e)}
                                    />
                                    <label htmlFor={servicio}>{servicio}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea
                    className="form-control w-50 mx-auto"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Indica el tipo de corte de pelo, barba y tinte que deseas"
                    />
                    <div className="">
                        <div className="font-bold mt-3">Hora</div>
                        <div className="contHoras mx-auto mt-3">
                            {generateAvailableHours().map(time => (
                                <button className='btnHoras' key={`${time.hour}:${time.minute}`} type='button' onClick={() => setSelectedTime(`${time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute}`)}>
                                    {time.hour}:{time.minute < 10 ? '0' + time.minute : time.minute}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-2 text-center mx-auto mb-2">
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
