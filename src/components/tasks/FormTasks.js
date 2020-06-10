import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import TasksContext from "../../context/tasks/tasksContext";

const FormTasks = () => {
  //extraer proyecto activo
  const projectsContext = useContext(projectContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const { project } = projectsContext;

  //obtener funcion del context de tasks
  const taskContext = useContext(TasksContext);
  const {
    createTask,
    validateTask,
    taskerror,
    getTasks,
    selectedtask,
    editTask,
    clearTask
  } = taskContext;

  //effect detecta tarea seleccionada
  useEffect(() => {
    if (selectedtask !== null) {
      setTask(selectedtask);
    } else {
      setTask({
        name: ""
      });
    }
  }, [selectedtask]);
  //state form

  const [task, setTask] = useState({
    name: ""
  });

  //obtener nombre del proyecto
  const { name } = task;
  //si no hay proyecto seleccionado
  if (!project) return null;
  //array destructuring para extraer el proyecto actuak
  const [openProject] = project;

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
      if (name.trim() === "") {
        validateTask();
        return;
      }
      //revisar si edita o agrega tarea
      if (selectedtask == null) {
        //agregar la nueva taraea
        task.project = openProject._id;
        createTask(task);
      } else {
        //actualiza tarea existente
        editTask(task);
        clearTask();
      }
      //obtener y filtrar tareas
      //resetear form
      setTask({
        name: ""
      });
      setTimeout(() => {
        getTasks(openProject._id);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="New Task"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className="contenedor-input">
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
  );
};

export default FormTasks;
