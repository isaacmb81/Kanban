import React, { useState } from 'react'
import "./styles/tarea.css"
import { eliminarTarea } from './funciones'

export const Tarea = ({ startDrag, tarea, tareas, setTareas, setMostrarForm, setNombre, setDescripcion, setModTarea, setTareaAnterior }) => {
    const [color, setColor] = useState()

    function mostrarEditarTarea(tarea) {
        setTareaAnterior(tarea)
        setMostrarForm(true);
        setNombre(tarea.nombre)
        setDescripcion(tarea.descripcion)
        setModTarea(true)
    }

    function deleteTarea(id) {
        eliminarTarea(id, setTareas, tareas)
    }



    function handleColor(e) {
        setColor(e.target.value)

    }



    return (

        <div className='tarea' style={{ backgroundColor: color }} draggable onDragStart={(event) => startDrag(event, tarea)}>
            <div id='infoTarea'>
                <h3>{tarea.nombre}</h3>
                <p>{tarea.descripcion}</p>
            </div>
            <div id='botonesTarea'>
                <input className='botones' type='color' value={color} onChange={handleColor}></input>
                <button className='botones' onClick={() => mostrarEditarTarea(tarea)}>✏️</button>
                <button className='botones' onClick={() => deleteTarea(tarea.id)}>❌</button>
            </div>
        </div>

    )
}
