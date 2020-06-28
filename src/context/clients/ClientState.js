import React, { useReducer } from "react";
import ClientContext from "./ClientContext";
import ClientReducer from "./ClientReducer";
import axiosClient from "../../config/axios";

import {
  GET_CLIENTS,
  CLIENTFORM_VALIDATION,
  OPEN_CLIENT,
  DELETE_CLIENT,
  ADD_CLIENT,
  CLIENT_ERROR,
  ACTUAL_CLIENT,
  EDIT_CLIENT,
  CLEAR_CLIENT,
  FIND_CLIENT,
  NEW_WORK
} from "../../types";

const ClientState = props => {
  const initialState = {
    clients: [],
    newClientForm: false,
    formError: false,
    filteredClients: [],
    message: null,
    selectedClient: null,
    newWork: false
  };
  //dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(ClientReducer, initialState);
  //serie de funciones para el crud

  //obtener clientes
  const getClients = async () => {
    try {
      const result = await axiosClient.get("/api/clients");
      
      dispatch({
        type: GET_CLIENTS,
        payload: result.data.clients
      });
    } catch (error) {
      const alert = {
        msg: "Something went wrong!",
        category: "alerta-error"
      };
      dispatch({
        type: CLIENT_ERROR,
        payload: alert
      });
    }
  };
  //agregar proyecto
  const addClient = async client => {
    try {
      const result = await axiosClient.post("/api/clients", client);
      console.log(result);
      dispatch({
        type: ADD_CLIENT,
        payload: result.data
      });
    } catch (error) {
      const alert = {
        msg: "Something went wrong!",
        category: "alerta-error"
      };
      dispatch({
        type: CLIENT_ERROR,
        payload: alert
      });
    }
  };
  const findClient = clients =>{
    dispatch({
      type: FIND_CLIENT,
      payload: clients
    })
  }


    //trae taer par editar
    const actualClient = client => {
      dispatch({
        type: ACTUAL_CLIENT,
        payload: client
      });
    };

  //ELIMINA PORYECTO
  const deleteClient = async clientId => {
    try {
      await axiosClient.delete(`/api/clients/${clientId}`);
      dispatch({
        type: DELETE_CLIENT,
        payload: clientId
      });
    } catch (error) {
      const alert = {
        msg: "Something went wrong!",
        category: "alerta-error"
      };
      dispatch({
        type: CLIENT_ERROR,
        payload: alert
      });
    }
  };

  //EDITA MODIFICA TAREA
  const editClient = async client => {
    console.log(client)
    try {
      const results = await axiosClient.put(`/api/clients/${client._id}`, client);
      dispatch({
        type: EDIT_CLIENT,
        payload: results.data.currentClient
      });
    } catch (error) {
      console.log(error);
    }
  };

  //validar form por errores
  const showError = () => {
    dispatch({
      type: CLIENTFORM_VALIDATION
    });
  };
   //borra selectedtask
   const clearClient = () => {
    dispatch({
      type: CLEAR_CLIENT
    });
  };

  const setNewWork = (condition) => {
    dispatch({
      type: NEW_WORK,
      payload: condition
    })
  }
  return (
    <ClientContext.Provider
      value={{
        clients: state.clients,
        form: state.form,
        formError: state.formError,
        filteredClients: state.filteredClients,
        message: state.message,
        selectedClient: state.selectedClient,
        newWork: state.newWork,
        getClients,
        addClient,
        showError,
        deleteClient,
        actualClient,
        editClient,
        clearClient,
        findClient,
        setNewWork
        
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientState;
