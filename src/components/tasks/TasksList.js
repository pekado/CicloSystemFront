import React, { Fragment, useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import WorksContext from "../../context/works/worksContext";
import TasksContext from "../../context/tasks/tasksContext";
import Task from "./Task";

const TasksList = () => {
  //obtener state de proyectos
  const worksContext = useContext(WorksContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const { work, deleteWork, editWork, getWorks } = worksContext;

  //obtener tasks del trabajo
  const taskContext = useContext(TasksContext);
  const { worktasks, closeModal } = taskContext;
  const [totalPrice, setTotalPrice] = useState("");
  console.log(work.state);
  useEffect(() => {
    const totalCost = () => {
      if (worktasks.length !== 0) {
        const prices = worktasks.map(task => task.price);
        const add = (a, b) => a + b;
        const sum = prices.reduce(add);
        setTotalPrice(sum);
      }
    };
    totalCost();
  }, [worktasks]);

  const toDelete = id => {
    deleteWork(id);
    closeModal();
    setTimeout(() => {
      getWorks();
    }, 1000);
  };
  const finishWork = id => {
    if (!work[0].state) {
      editWork(id, { state: true });
    } else {
      editWork(id, { state: false });
    }
    closeModal();
    setTimeout(() => {
      getWorks();
    }, 1000);
  };
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
              <CSSTransition key={task.id} timeout={300} classNames="tarea">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
        {!work[0].state ? (
          <div className="flex">
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => toDelete(openWork._id)}
            >
              Borrar Trabajo
            </button>
            <div>
              <button
                type="button"
                className="btn btn-primario"
                onClick={() => finishWork(openWork._id)}
              >
                Trabajo Completo
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => finishWork(openWork._id)}
            >
              Volver a Pendientes
            </button>
            <div>
              <button
                type="button"
                className="btn btn-primario"
                onClick={() => toDelete(openWork._id)}
              >
                Finalizar Trabajo
              </button>
            </div>
          </div>
        )}
      </ul>
    </Fragment>
  );
};

export default TasksList;
