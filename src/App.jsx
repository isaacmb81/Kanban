import { useState, useEffect } from 'react'
import './styles/App.css';
import { Columna } from './Columna';
import  logo  from "./assets/logo.png"
import { obtenerColumnas, insertarColumna, modificarColumna } from "./funciones"

function App() {
  const [input, setInput] = useState('');
  const [columnas, setColumnas] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [modificar, setModificar] = useState(false);
  const [columnaAntigua, setColumnaAntigua] = useState({});

  function handleInput(e) {
    setInput(e.target.value);
  }

  useEffect(() => {
    obtenerColumnas(setColumnas)
  }, [])



  function submit(e) {
    e.preventDefault();


    if (modificar) {

      modificarColumna(input, columnaAntigua, columnas, setColumnas)
      setModificar(false);

    } else {
      const idColumna = columnas.reduce((maxId, columna) => { return columna.id > maxId ? columna.id : maxId; }, 0);
      console.log(idColumna)
      const columnaAInsertar = { id: idColumna+1, nombre: input }

      insertarColumna(columnaAInsertar, setColumnas, columnas)

    }

    setInput("");
  }



  return (
    <div id='paginaPricipal'>


      <div id='header'>
        <img src={logo}></img>
        <div id='contenedorInput'>
          <form onSubmit={(e) => submit(e)}>
            <input type='text' placeholder='Crear columna... ' value={input} onChange={(e) => handleInput(e)}></input>
            <button type='submit'>{modificar ? "Modificar" : "Añadir"}</button>
          </form>
        </div>
      </div>

      <hr />
      <div id='contenedorColumnas'>
        {columnas.map((columna, indice) => (
          <Columna tareas={tareas} setTareas={setTareas} columna={columna} setColumnas={setColumnas} columnas={columnas} setInput={setInput} setModificar={setModificar} setColumnaAntigua={setColumnaAntigua} key={indice}>{columna}</Columna>
        ))}

      </div>
    </div>
  )
}

export default App
