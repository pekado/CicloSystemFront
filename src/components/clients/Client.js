import React, { useContext, useState } from "react";
import ClientContext from "../../context/clients/ClientContext";

const Client = ({ client }) => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    actualClient,
    deleteClient,
    editClient,
    getClients,
    newWork
  } = clientContext;
  //state condicional de botones

  //funcion para eliminar tarea
  const selectedClient = id => {
    console.log(id);
    deleteClient(id, actualClient._id); //id de la tarea
    getClients(actualClient._id); //id del proyecto
  };
  //agrega cliente actual cuando el usuario quiere editarlo
  const selectClient = client => {
    actualClient(client);
  };
  return (
    <tr>
    <td ><span>Nombre</span> {client.name}</td>
    <td><span>Teléfono</span> {client.name}</td>
    <td><span>Email</span> {client.email}</td>
    <td><span>Bicicleta</span> {client.bike}</td>
    {!newWork ?
   ( <td><span>Opciones</span>  <button
            onClick={() => selectClient(client)}
            type="button"
            className=""
          >
            Edit
          </button>
          <button
            type="button"
            className=""
            onClick={() => selectedClient(client._id)}
          >
            Delete
          </button></td>) :
    (<td><span>Opciones</span>  <button
            type="button"
            className=""
            onClick={() => selectClient(client)}
          >
            Seleccionar
          </button></td>)}
</tr>

  );
};

export default Client;
