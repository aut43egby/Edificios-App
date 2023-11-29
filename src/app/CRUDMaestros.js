import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const EdificiosContainer = document.querySelector('.Edificios');
const FormularioActualizarEdificio = document.querySelector('#Formulario-ActualizarEdificio');

const obtenerEdificio = (id) => getDoc(doc(db, 'Edificios', id));

let id = '';

const actualizarEdificio = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Edificios', id), nuevosValores);
        alert('Edificio actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el edificio', 'error');
    }
};

export const MostrarListaEdificios = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Edificio = documento.data();
            const idDocumento = documento.id;
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del edificio: ${Edificio.Nombre} </h5>
                    <p> Ubicación: ${Edificio.Ubicacion} </p>
                    <p> Fecha de Construcción: ${Edificio.FechaConstruccion} </p>
                    <p> Número de Pisos: ${Edificio.NumeroPisos} </p>
                    <p> Propósito/Función: ${Edificio.Proposito} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Edificio" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Edificio" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarEdificio"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        EdificiosContainer.innerHTML = html;

        const BotonesEliminar = EdificiosContainer.querySelectorAll('.Eliminar-Edificio');

        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Edificios', Documento));
                } catch (error) {
                    alert('Error al eliminar el edificio:', 'error');
                }
            });
        });

        const BotonesActualizar = EdificiosContainer.querySelectorAll('.Actualizar-Edificio');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerEdificio(e.target.dataset.id);
                const DATOSDOCUMENTO = identificadorDocumento.data();

                const NOMBRE = FormularioActualizarEdificio['Actualizar-Nombre'];
                const UBICACION = FormularioActualizarEdificio['Actualizar-Ubicacion'];
                const FECHA_CONSTRUCCION = FormularioActualizarEdificio['Actualizar-FechaConstruccion'];
                const NUMERO_PISOS = FormularioActualizarEdificio['Actualizar-NumeroPisos'];
                const PROPOSITO = FormularioActualizarEdificio['Actualizar-Proposito'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                UBICACION.value = DATOSDOCUMENTO.Ubicacion;
                FECHA_CONSTRUCCION.value = DATOSDOCUMENTO.FechaConstruccion;
                NUMERO_PISOS.value = DATOSDOCUMENTO.NumeroPisos;
                PROPOSITO.value = DATOSDOCUMENTO.Proposito;

                id = identificadorDocumento.id;
            });
        });

        FormularioActualizarEdificio.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const NOMBRE = FormularioActualizarEdificio['Actualizar-Nombre'].value;
                const UBICACION = FormularioActualizarEdificio['Actualizar-Ubicacion'].value;
                const FECHA_CONSTRUCCION = FormularioActualizarEdificio['Actualizar-FechaConstruccion'].value;
                const NUMERO_PISOS = FormularioActualizarEdificio['Actualizar-NumeroPisos'].value;
                const PROPOSITO = FormularioActualizarEdificio['Actualizar-Proposito'].value;

                await actualizarEdificio(id, {
                    Nombre: NOMBRE,
                    Ubicacion: UBICACION,
                    FechaConstruccion: FECHA_CONSTRUCCION,
                    NumeroPisos: NUMERO_PISOS,
                    Proposito: PROPOSITO,
                });

                const actualizarModal = document.querySelector('#ActualizarEdificio');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        EdificiosContainer.innerHTML = `
            <h1>
                No hay edificios registrados.
            </h1>
        `;
    }
};
