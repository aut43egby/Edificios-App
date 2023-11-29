import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioEdificio = document.querySelector('#Formulario-Edificio');

    formularioEdificio.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioEdificio['Nombre-Edificio'].value;
        const UBICACION = formularioEdificio['Ubicacion-Edificio'].value;
        const FECHA_CONSTRUCCION = formularioEdificio['FechaConstruccion-Edificio'].value;
        const NUMERO_PISOS = parseInt(formularioEdificio['NumeroPisos-Edificio'].value);
        const PROPOSITO = formularioEdificio['Proposito-Edificio'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoEdificioRef = await addDoc(collection(db, 'Edificios'), {
                Nombre: NOMBRE,
                Ubicacion: UBICACION,
                FechaConstruccion: FECHA_CONSTRUCCION,
                NumeroPisos: NUMERO_PISOS,
                Proposito: PROPOSITO
            });

            // Muestra un mensaje si todo sale bien
            alert(`El edificio ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioEdificio.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el edificio:', error.message);
        }
    });
});
