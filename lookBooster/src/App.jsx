/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from './firebase/config';

function App() {

  // Obtener referencia a la colección de empleados
  const empleadosRef = collection(db, "empleados");

  // Obtener referencia a la colección de clientes
  const clientesRef = collection(db, "clientes");

  // Función para obtener un empleado específico de la base de datos
  const obtenerEmpleado = async () => {
    const snapshot = await getDocs(empleadosRef);
    if (!snapshot.empty) {
      // Aquí puedes seleccionar el empleado que desees, por ejemplo, el primero de la lista
      return snapshot.docs[0].id;
    } else {
      console.error("No se encontraron empleados en la base de datos.");
      return null;
    }
  };

  // Función para obtener un cliente específico de la base de datos
  const obtenerCliente = async () => {
    const snapshot = await getDocs(clientesRef);
    if (!snapshot.empty) {
      // Aquí puedes seleccionar el cliente que desees, por ejemplo, el primero de la lista
      return snapshot.docs[0].id;
    } else {
      console.error("No se encontraron clientes en la base de datos.");
      return null;
    }
  };

  // Función para agregar una nueva cita
  const agregarCita = async () => {
    // Obtener el ID del empleado y del cliente
    const idEmpleado = await obtenerEmpleado();
    const idCliente = await obtenerCliente();

    // Verificar si se obtuvieron los IDs correctamente
    if (idEmpleado && idCliente) {
      // Datos de la nueva cita (aquí debes reemplazar con tus propios datos)
      const nuevaCita = {
        idEmpleado: idEmpleado,
        idCliente: idCliente,
        fecha: "2024-05-06",
        servicio: "Servicio de la cita",
        precio: 50.00,
        horaInicio: "10:00",
        horaFin: "11:00",
        observaciones: "Observaciones de la cita",
        estado: "pendiente"
      };

      // Agregar la nueva cita a la colección "citas"
      addDoc(collection(db, "citas"), nuevaCita)
        .then((docRef) => {
          console.log("Cita agregada correctamente con ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error al agregar la cita: ", error);
        });
    } else {
      console.error("No se pudieron obtener los IDs de empleado y cliente.");
    }
  };

  useEffect(() => {
    agregarCita();
  }, []); // Esto hace que se ejecute solo una vez después de montar el componente

  return (
    <div className="App">
      {/* Aquí puedes agregar tu contenido de la aplicación */}
    </div>
  );
}

export default App;
