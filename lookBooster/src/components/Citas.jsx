import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/config';
import 'firebase/auth';
import { useState } from 'react';
import Header from './Header';
import { useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore'; 
import { TbArrowBadgeDown } from "react-icons/tb";
import { Calendar } from 'rsuite';


function Citas() {
   
    const auth = getAuth(app);

    const [usuario,setUsuario] = useState(null); 

    onAuthStateChanged(auth, (usuarioAuth) => {
        if(usuarioAuth) {
        setUsuario(usuarioAuth);
        } else {
        setUsuario(null);
        window.location.href = "/login";
        }
    });
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const empleadosRef = collection(db, 'empleados');
                const snapshot = await getDocs(empleadosRef);
                const empleadosData = snapshot.docs.map(doc => doc.data());
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
            <h2 className='text-center fw-bold mt-3 '>Agenda tu corte de la manera más facil</h2>
            <h2 className=' textillo text-center fs-3 mb-4 '><TbArrowBadgeDown />No te quedes sin tu corte<TbArrowBadgeDown /></h2>

            <form className="d-flex text-2xl flex-column text-center  px-4">
                <div className="d-flex py-4 flex-column gap-2 px-3">
                    <div className="d-flex flex-column gap-2 items-center mx-auto ">
                        <div className="font-bold">Barbero</div>
                        <select required className="border w-80 border-red-800 bg-neutral-300">
                            {empleados.map((empleado) => (
                                <option key={empleado.id} value={empleado.nombre}>
                                    {empleado.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="font-bold">Servicio</div>
                        <select className="bg-neutral-300 text-ellipsis w-80 border border-red-800 text-red-800">
                            <option value="Corte de Pelo">Corte de Pelo</option>
                            <option value="Tinte">Tinte</option>
                            <option value="Barba">Barba</option>
                        </select>
                    </div>
                    <div className="flex gap-2 flex-col items-center">
                    
                    </div>
                </div>
            
                <div className="d-flex flex-column gap-2 mt-5 text-center mx-auto ">
                    <button className="px-4 py-2" type="submit">Confirmar</button>
                </div>
            </form>
        </div>
    );
}

export default Citas;