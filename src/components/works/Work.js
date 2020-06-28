import React, { useContext } from 'react'
import WorksContext from "../../context/works/worksContext";
import TasksContext from "../../context/tasks/tasksContext";


const Work = ({work}) => {
   //obtener state de proyectos
   const worksContext = useContext(WorksContext);
   //deracturing states(de lado izquierdo) y funciones(lado derecho)
   const { openWork } = worksContext;
   //obtener funcion del context de tasks
   const taskContext  = useContext(TasksContext)
   const { getTasks } = taskContext;


   //funciona para agregar proyecto actual
   const selectWork = id => {
        openWork(id)//fijar proyecto actual
        getTasks(id); //filtrar tareas al hacer click
   }

    return ( 
    
            <tr onClick={() => selectWork(work._id)}>
            <td ><span>Fecha de Ingreso</span> {work.date.slice(0, 10)}</td>
            <td><span>Bicicleta</span> {work.Client.bike}</td>
            <td><span>Nombre</span> {work.Client.name}</td>
            <td><span>Teléfono</span> {work.Client.phone}</td>
            <td><span>Entrega</span> {work.entregaDia}</td>
            <td><span>Hora de Entrega</span> {work.entregaHora}</td>
        </tr>

     );
}
 
export default Work;