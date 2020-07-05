import React, { useContext, useState, useEffect, Fragment } from "react";
import WorksContext from "../../context/works/worksContext";
import TasksContext from "../../context/tasks/tasksContext";

const FormTasks = () => {
  //extraer proyecto activo
  const worksContext = useContext(WorksContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const { work } = worksContext;

  //obtener funcion del context de tasks
  const taskContext = useContext(TasksContext);
  const {
    createTask,
    validateTask,
    taskerror,
    getTasks,
    selectedtask,
    editTask,
    clearTask,
    clientTasks
  } = taskContext;
  const { name, phone, email, bike } = clientTasks;
  //effect detecta tarea seleccionada
  useEffect(() => {
    if (selectedtask !== null) {
      setTask(selectedtask);
    } else {
      setTask({
        taskName: "",
        price: ""
      });
    }
  }, [selectedtask]);
  //state form

  const [task, setTask] = useState({
    taskName: "",
    price: ""
  });

  //obtener nombre del proyecto
  const { taskName, price } = task;
  //si no hay proyecto seleccionado
  if (!work) return null;
  //array destructuring para extraer el proyecto actuak
  const [openWork] = work;

  //leer valores del form
  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async event => {
    try {
      event.preventDefault();
      //validar
      if (taskName.trim() === "" || price === "") {
        validateTask();
        return;
      }
      //revisar si edita o agrega tarea
      if (selectedtask === null) {
        //agregar la nueva taraea
        task.work = openWork._id;
        
        createTask(task);
      } else {
        //actualiza tarea existente
        editTask(task);
        clearTask();
      }
      //obtener y filtrar tareas
      //resetear form
      setTask({
        taskName: "",
        price: "",
      });
      setTimeout(() => {
        getTasks(openWork._id);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="flex">
      <div>
        <p>Cliente: {name}</p>
        <p>Teléfono: {phone}</p>
        <p>Email: {email}</p>
        <p>Bicicleta: {bike}</p>
      </div>
        <form onSubmit={onSubmit}>
          <div className="margin-sides">
            <input
              type="text"
              className="input-text input-margin "
              placeholder="New Task"
              name="taskName"
              onChange={handleChange}
              value={taskName}
            />
             <input
              type="number"
              className="input-text input-margin"
              placeholder="Precio"
              name="price"
              onChange={handleChange}
              value={price}
            />
          </div>
          <div className="contenedor-input margin-sides">
            <input
              type="submit"
              className="btn btn-primario btn-submit btn-block"
              value={selectedtask ? "Edit task" : "Add task"}
            />
          </div>
        </form>
        {taskerror ? (
          <p className="mensaje error">Give your task a name, please.</p>
        ) : null}
      </div>
    </Fragment>
  );
};

export default FormTasks;
