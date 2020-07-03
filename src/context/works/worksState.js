import React, { useReducer } from "react";
import worksContext from "./worksContext";
import worksReducer from "./worksReducer";
import axiosClient from '../../config/axios'
import {
  WORK_ERROR,
  FORM_WORK,
  GET_WORKS,
  ADD_WORK,
  FORM_VALIDATION,
  OPEN_WORK,
  DELETE_WORK,
  EDIT_WORK
} from "../../types";

const WorksState = props => {

  const initialState = {
    works: [],
    finishedWorks: [],
    unfinishedWorks: [],
    newWorkForm: false,
    formError: false,
    work: {},
    newWorkId: null,
    message: null
  };
  //dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(worksReducer, initialState);
  //serie de funciones para el crud
  const showForm = () => {
    dispatch({
      type: FORM_WORK
    });
  };
  //obtener trabajos
  const getWorks = async () => {
    try {
      const result = await axiosClient.get('/api/works');
      dispatch({
        type: GET_WORKS,
        payload: result.data.workAndClient
      });
    } catch (error) {
      const alert = {
        msg: 'Something went wrong!',
        category: 'alerta-error'
      }
      dispatch({
        type: WORK_ERROR,
        payload: alert
      })
    }
  };
  //agregar proyecto
  const addWork = async work => {
    try {
       const results = await axiosClient.post('/api/works', work)
       console.log(results)
      dispatch({
        type: ADD_WORK,
        payload: results.data
      });
    } catch (error) {
      const alert = {
        msg: 'Something went wrong!',
        category: 'alerta-error'
      }
      dispatch({
        type: WORK_ERROR,
        payload: alert
      })
    }
  
  };
  //selecciona trabajo con un click
  const openWork =  (workId) => {
    dispatch({
      type: OPEN_WORK,
      payload: workId
    });
  };

  //EDITA MODIFICA PRYECTO
  const editWork = async (workId, state) => {
    try {
      const results = await axiosClient.put(`/api/works/${workId}`, state);
      dispatch({
        type: EDIT_WORK,
        payload: results.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  //ELIMINA PORYECTO
  const deleteWork = async workId => {
    try {
     await axiosClient.delete(`/api/works/${workId}`);
      dispatch({
        type: DELETE_WORK,
        payload: workId
      });
    } catch (error) {
      const alert = {
        msg: 'Something went wrong!',
        category: 'alerta-error'
      }
      dispatch({
        type: WORK_ERROR,
        payload: alert
      })
    }
  };

  //validar form por errores
  const showError = () => {
    dispatch({
      type: FORM_VALIDATION
    });
  };
  return (
    <worksContext.Provider
      value={{
        works: state.works,
        unfinishedWorks: state.unfinishedWorks,
        finishedWorks: state.finishedWorks,
        form: state.form,
        formError: state.formError,
        work: state.work,
        message: state.message,
        newWorkId: state.newWorkId,
        showForm,
        getWorks,
        addWork,
        showError,
        openWork,
        deleteWork,
        editWork
      }}
    >
      {props.children}
    </worksContext.Provider>
  );
};

export default WorksState;
