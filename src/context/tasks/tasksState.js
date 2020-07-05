import React, { useReducer } from "react";
import TasksContext from "./tasksContext";
import TasksReducer from "./tasksReducer";
import axiosClient from "../../config/axios";
import {
  WORK_TASKS,
  CREATE_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  EDIT_TASK,
  CLEAR_TASK,
  CLOSE_MODAL
} from "../../types";

const TasksState = props => {
  const initialState = {
    worktasks: [],
    taskerror: false,
    taskstate: false,
    selectedtask: null,
    openModal: false,
    clientTasks:{}
  };

  //crear dispatch y sstate
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  // funciones

  //obtener tareas de un proyecto
  const getTasks = async work => {
    try {
      const results = await axiosClient.get("/api/tasks", {
        params: { work }
      });
      console.log(results)
      dispatch({
        type: WORK_TASKS,
        payload: results.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  //crear tarea al proyecto
  const createTask = async task => {
    try {
      const result = await axiosClient.post("/api/tasks", task);
      console.log(result)
      dispatch({
        type: CREATE_TASK,
        payload: task
      });
    } catch (error) {}
  };
  //trae taer par editar
  const actualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    });
  };

  //valida y muestra un error
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    });
  };

  //eliminar tarea por id
  const deleteTask = async (id, work) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { work } });

      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  };

  //EDITA MODIFICA TAREA
  const editTask = async task => {
    try {
      const results = await axiosClient.put(`/api/tasks/${task._id}`, task);
      dispatch({
        type: EDIT_TASK,
        payload: results.data.currentTask
      });
    } catch (error) {
      console.log(error);
    }
  };

  //borra selectedtask
  const clearTask = () => {
    dispatch({
      type: CLEAR_TASK
    });
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  return (
    <TasksContext.Provider
      value={{
        worktasks: state.worktasks,
        taskerror: state.taskerror,
        taskstate: state.taskstate,
        selectedtask: state.selectedtask,
        clientTasks: state.clientTasks,
        openModal: state.openModal,
        getTasks,
        createTask,
        validateTask,
        deleteTask,
        actualTask,
        editTask,
        clearTask,
        closeModal
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
