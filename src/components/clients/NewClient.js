import React, { useState, useEffect, useContext } from "react";
import ClientContext from "../../context/clients/ClientContext";

const NewClient = () => {
  const clientContext = useContext(ClientContext);
  const {
    editClient,
    addClient,
    showError,
    formError,
    selectedClient,
    clearClient,
    getClients
  } = clientContext;
  useEffect(() => {
    if (selectedClient !== null) {
      setClient(selectedClient);
    } else {
      setClient({
        name: "",
        phone: "",
        email: "",
        bike: ""
      });
    }
  }, [selectedClient]);
  const [client, setClient] = useState({
    name: "",
    phone: "",
    email: "",
    bike: ""
  });
  const { name, phone, email, bike } = client;
  //effect detecta tarea seleccionada
  const onChangeWork = event => {
    setClient({
      ...client,
      [event.target.name]: event.target.value
    });
  };
  const submitClient = event => {
    event.preventDefault();
    
    if (name === "" || phone === "" || email === "" || bike === "") {
      showError();
      return;
    }
       //revisar si edita o agrega tarea
       if (selectedClient === null) {
        //agregar cliente
        addClient(client);
      } else {
        //actualiza tarea existente
        editClient(client);
        clearClient();
      }
    setClient({
      name: "",
      phone: "",
      email: "",
      bike: ""
    });
    setTimeout(() => {
      getClients();
    }, 1000);
  };
  return (
    <form className="formulario-nuevo-proyecto" onSubmit={submitClient}>
      <h1>Nuevo Cliente</h1>
      <input
        type="text"
        className="input-text input-margin"
        placeholder="Nombre"
        name="name"
        value={name}
        onChange={onChangeWork}
      />

      <input
        type="text"
        className="input-text input-margin"
        placeholder="Bicicleta"
        name="bike"
        value={bike}
        onChange={onChangeWork}
      />
      <input
        type="email"
        className="input-text input-margin"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChangeWork}
      />
      <input
        type="text"
        className="input-text input-margin"
        placeholder="Teléfono"
        name="phone"
        value={phone}
        onChange={onChangeWork}
      />
      <input
        type="submit"
        className="btn btn-block btn-primario"
        value={selectedClient === null ? "Agregar Cliente" : "Editar Cliente"}
      />
      {formError ? <p className="mensaje error">Error en los datos!</p> : null}
    </form>
  );
};

export default NewClient;
