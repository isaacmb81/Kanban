import React, { useState, useEffect } from 'react'
import './styles/columna.css'
import { Tarea } from './Tarea';
import { eliminarColumna, modificarTarea, insertarTarea, obtenerTareas } from './funciones';

export const Columna = ({tareas,setTareas,columna, columnas, setColumnas, setInput, setModificar, setColumnaAntigua }) => {
    
    const [mostrarForm, setMostrarForm] = useState(false)
    const [inputNombre, setInputNombre] = useState("");
    const [inputDescripcion, setInputDescripcion] = useState("");
    const [modTarea, setModTarea] = useState(false);
    const [tareaAnterior, setTareaAnterior] = useState();



    function handleNombre(e) {
        setInputNombre(e.target.value)
    }

    function handleDescripcion(e) {
        setInputDescripcion(e.target.value)
    }


    useEffect(() => {
        obtenerTareas(setTareas)
    }, [])


    function handleAddTarea(e) {
        e.preventDefault()

        if (mostrarForm) {
            if (modTarea) {

                modificarTarea(inputNombre, inputDescripcion, columna, tareaAnterior, tareas, setTareas)
                setModTarea(false)
                setInputNombre('');
                setInputDescripcion('');

            } else {

                const idTareas = tareas.reduce((maxId, tarea) => { return tarea.id > maxId ? tarea.id : maxId; }, 0);
                
                const tareaAInsertar = { id: idTareas + 1, nombre: inputNombre, descripcion: inputDescripcion, id_columna: columna.id };
                insertarTarea(tareaAInsertar, setTareas, tareas)
                setInputNombre('');
                setInputDescripcion('');

                // window.location.reload();


            }
            setMostrarForm(false)
        } else {
            setMostrarForm(true)
        }

    }


    function deleteColumna(id) {
        eliminarColumna(id, columnas, setColumnas,tareas);
    }

    function mostrarEditarColumna(columna) {
        setInput(columna.nombre);
        setColumnaAntigua(columna);
        setModificar(true);
    }

    function startDrag(event, item) {
        event.dataTransfer.setData("itemID", item.id)
    }

    function draggingOver(event) {
        event.preventDefault();

    }

    function onDrop(event, list) {
        const itemID = event.dataTransfer.getData('itemID')
        const item = tareas.find(tarea => tarea.id == itemID)
        item.id_columna = list


        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_columna: columna.id })
        };

        fetch("http://localhost:3000/tareas/" + itemID, requestOptions)
            .then(response => {
                if (response.ok) {
                    const newState = tareas.map(tarea => {
                        if (tarea.id == itemID) return item;
                        return tarea
                    })
                    setTareas(newState)
                }
            })
    }



    return (
        <div id='contenedorColumna' onDragOver={(event) => draggingOver(event)} onDrop={(event) => onDrop(event, columna.id)}>
            <div id='infoColumna'>
                <h1>{columna.nombre}</h1>
                <div id='contenedorBotonesColumna'>
                    <button className='botones' onClick={() => mostrarEditarColumna(columna)}>✏️</button>
                    <button className='botones' onClick={() => deleteColumna(columna.id)}>❌</button>
                </div>
            </div>



            <form id='formularioAddTarea' onSubmit={(e) => handleAddTarea(e)}>
                {
                    mostrarForm &&
                    <div >
                        <input type='text' required placeholder='Nombre' value={inputNombre} onChange={(e) => handleNombre(e)}></input>
                        <input type='text' placeholder='Descripción' value={inputDescripcion} onChange={(e) => handleDescripcion(e)}></input>
                    </div>
                }
                <button type='submit' >{modTarea ? "Modificar Tarea" : "Añadir Tarea"}</button>
            </form>


            <div id='contenedorTareas' droppable="true" >

                {tareas
                    .filter((tarea) => (tarea.id_columna == columna.id))
                    .map((tarea, indice) => (
                        <Tarea key={indice} startDrag={startDrag} tarea={tarea} tareas={tareas} setTareas={setTareas} setMostrarForm={setMostrarForm} setNombre={setInputNombre} setDescripcion={setInputDescripcion} setModTarea={setModTarea} setTareaAnterior={setTareaAnterior}></Tarea>
                    ))}

            </div>


        </div >

    )
}
