import React, { Fragment, useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import WorksContext from "../../context/works/worksContext";
import TasksContext from "../../context/tasks/tasksContext";
import Task from "./Task"; 

const TasksList = () => {
  //obtener state de proyectos
  const worksContext = useContext(WorksContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const { work, deleteWork, editWork } = worksContext;
 
  //obtener tasks del trabajo
  const taskContext = useContext(TasksContext);
  const { worktasks } = taskContext;
  const [totalPrice, setTotalPrice] = useState("")
  useEffect(() => {
    const totalCost = () =>{
      if(worktasks.length !== 0){
        const prices = worktasks.map(task => task.price)
        const add = (a, b) => a + b; 
        const sum = prices.reduce(add)
        setTotalPrice(sum)
      }
    }
    totalCost()
  }, [worktasks]);
  if (!work) return <h2>Pick a work</h2>;
  //array destructuring para extraer el proyecto actual
  const [openWork] = work;

  return (
    <Fragment>
      <h1>El costo total es: {totalPrice}</h1>
      <ul className="listado-tareas">
        {worktasks === [] || undefined ? (
          <li className="tarea">
            <p>No tasks yet</p>
          </li>
        ) : (
          <TransitionGroup>
            {worktasks.map(task => (
              <CSSTransition 
                key={task.id} 
                timeout={300} 
                classNames="tarea">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
        <div className="flex">

        <button
          type="button"
          className="btn btn-primario"
          onClick={() => deleteWork(openWork._id)}
        >
         Borrar Trabajo
        </button>
        <div>
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => editWork(openWork._id, {state: true})}
        >
          Trabajo Completo
        </button>

        </div>
        </div>
      </ul>
    </Fragment>
  );
};

export default TasksList;
