import React, { useState, Fragment, useContext } from "react";
import TasksList from "./TasksList";
import FormTasks from "./FormTasks";
import "../styles/Modal.css";
import TasksContext from "../../context/tasks/tasksContext";

const Tasks = () => {
  //obtener tasks del trabajo
  const taskContext = useContext(TasksContext);
  const { openModal, closeModal } = taskContext;
  const [show, setShow] = useState(false);
  return (
      <Fragment>
      {openModal ? (
      <Fragment>
        <div
          className="overlay"
          onClick={() => closeModal()}
        />
          <div className="modal">
            <button onClick={closeModal}>X</button>
            <div className="contenedor-tareas">
              <FormTasks />
              <TasksList />
            </div>
          </div>
    </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Tasks;
