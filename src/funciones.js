// Funciones del Componente Columna

function obtenerColumnas(setColumnas) {
    fetch("http://localhost:3000/columnas")
        .then(response => response.json())
        .then(result => setColumnas(result))
        .catch(error => console.log('error', error));

}
function insertarColumna(insertarColumna, setColumnas, columnas) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(insertarColumna)
    }
    fetch("http://localhost:3000/columnas", requestOptions)
        .then(response => response.json())
        .then(result => setColumnas([...columnas, result]))
        .catch(error => console.log('error', error));

}

function eliminarColumna(id, columnas, setColumnas, tareas) {

    const existenTareas = tareas.filter(tarea=>tarea.id_columna==id)
    
    if(existenTareas.length==0){
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
    
        fetch("http://localhost:3000/columnas/" + id, requestOptions)
            .then(response => {
                if (response.ok) {
                    let columnasFiltradas = columnas.filter((columna) => (columna.id != id))
                    setColumnas(columnasFiltradas)
                }
            })
            .catch(error => console.log('error', error));
    }else{
        alert("No se puede eliminar la columna. Siguen existiendo tareas")
    }
    
}

function modificarColumna(input, columnaAntigua, columnas, setColumnas) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: input })
    };

    fetch("http://localhost:3000/columnas/" + columnaAntigua.id, requestOptions)
        .then(response => {
            if (response.ok) {
                const nuevasColumnas = columnas.map(columna => {
                    if (columna.id === columnaAntigua.id) {
                        return { ...columna, nombre: input };
                    }
                    return columna;
                });
                setColumnas(nuevasColumnas);
            }

        })
}





// Funciones del Componente Tareas

function obtenerTareas(setTareas) {
    fetch("http://localhost:3000/tareas")
        .then(response => response.json())
        .then(result => setTareas(result))
        .catch(error => console.log('error', error));
}
function insertarTarea(insertarTarea, setTareas, tareas) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(insertarTarea)
    }

    fetch("http://localhost:3000/tareas", requestOptions)
        .then(response => response.json())
        .then(result => setTareas([...tareas, result]))
        .catch(error => console.log('error', error));
}

function eliminarTarea(id, setTareas, tareas) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }

    fetch("http://localhost:3000/tareas/" + id, requestOptions)
        .then(response => {
            if (response.ok) {
                let tareasFiltradas = tareas.filter((tarea) => (tarea.id != id))
                setTareas(tareasFiltradas)
            }
        })
        .catch(error => console.log('error', error));
}

function modificarTarea(inputNombre, inputDescripcion, columna, tareaAnterior, tareas, setTareas) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: inputNombre, descripcion: inputDescripcion, id_columna: columna.id })
    };

    fetch("http://localhost:3000/tareas/" + tareaAnterior.id, requestOptions)
        .then(response => {
            if (response.ok) {
                const nuevasTareas = tareas.map(tarea => {
                    if (tarea.id === tareaAnterior.id) {
                        return { ...tarea, nombre: inputNombre, descripcion: inputDescripcion, id_columna: columna.id };
                    }
                    return tarea;
                });
                setTareas(nuevasTareas);
            }

        })
}

function cambiarColorTarea() {

}

export {
    obtenerColumnas,
    insertarColumna,
    eliminarColumna,
    modificarColumna,
    obtenerTareas,
    insertarTarea,
    eliminarTarea,
    modificarTarea
}