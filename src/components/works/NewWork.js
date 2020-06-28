import React, { Fragment, useState, useContext, useEffect } from "react";
import WorksContext from "../../context/works/worksContext";
import ClientSearch from "../clients/ClientSearch";
import ClientContext from "../../context/clients/ClientContext";
import ClientList from "../clients/ClientList";
import NewClient from "../clients/NewClient";
import "../styles/Modal.css";

const NewWork = () => {
  //obtener state del formulario
  const worksContext = useContext(WorksContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const {
    form,
    formError,
    showForm,
    addWork,
    showError,
    getWorks
  } = worksContext;
  const clientContext = useContext(ClientContext);
  const {
    clients,
    clearClient,
    findClient,
    selectedClient,
    filteredClients,
    setNewWork,
    
  } = clientContext;
  const [newClient, setNewClient] = useState(false);
  const [show, setShow] = useState(false);
  //state para nuevo trabajo
  const [work, setWork] = useState({
    entregaDia: "",
    entregaHora: "",
    cliente: ""
  });
  //defracturing
  const { cliente, entregaDia, entregaHora } = work;
  useEffect(() => {
    setNewWork(true);
  }, [newClient]);

  useEffect(() => {
    if (selectedClient !== null) {
      setWork({
        ...work,
        cliente: selectedClient._id
      });
    }
  }, [selectedClient]);
  const handleChange = event => {
    setWork({
      ...work,
      [event.target.name]: event.target.value
    });
  };
  //al enviar trabajo
  const submitWork = event => {
    event.preventDefault();
    // validar
    if (cliente === "" || entregaDia === "" || entregaHora === "") {
      showError();
      return;
    }
    console.log(work);
    //agregar al state
    addWork(work);
    //limpia el cliente seleccionado
    clearClient();
    //reiniciar form
    setWork({
      entregaDia: "",
      entregaHora: "",
      cliente: ""
    });
    setTimeout(() => {
      getWorks();
    }, 1000);
    setShow(false);
  };
  const seeForm = () => {
    showForm();
    setShow(true);
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primario"
        onClick={seeForm}
        id="botonTrabajo"
      >
        Crear un nuevo Trabajo
      </button>
      <div
        className={show ? "overlay" : "hide"}
        onClick={() => setShow(false)}
      />
      <div className={show ? "modal" : "hide"}>
        <div className="flex margin-sides">
        <button onClick={() => setShow(false)}>X</button>
          {!show && <button onClick={() => setShow(true)}>Show modal</button>}
          {!newClient ? (
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => setNewClient(true)}
            >
              Nuevo Cliente
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => setNewClient(false)}
            >
              Buscar Cliente
            </button>
          )}
        </div>
        {newClient ? (
          <div className="formulario">
            <NewClient />
          </div>
        ) : (
          <div>
            {selectedClient !== null ? (
              <Fragment>
                <div className="flex margin-sides">
                  <h4>Cliente: {selectedClient.name}</h4>
                  <h4>Teléfono: {selectedClient.phone}</h4>
                  <h4>Email: {selectedClient.email}</h4>
                  <h4>Bicicleta: {selectedClient.bike}</h4>
                </div>
                <form onSubmit={submitWork}>
                  <label>Día de entrega</label>
                  <input
                    type="date"
                    name="entregaDia"
                    onChange={handleChange}
                  />
                  <label>Hora de entrega</label>
                  <input
                    type="time"
                    name="entregaHora"
                    onChange={handleChange}
                  />
                  <div className="flex">
                  <button className="btn-primario btn" onClick={() => clearClient()}>
                    Seleccionar Otro Cliente
                  </button>
                    <button type="submit" className="btn btn-primario">
                      Crear Trabajo
                    </button>
                  </div>
                </form>
              </Fragment>
            ) : 
            <Fragment><h1>Seleccionar Cliente</h1>
            <div>
              <ClientSearch />
            </div>
            <ClientList />
            </Fragment>
          }
        </div>
            
        )}

        {formError ? (
          <p className="mensaje error">El trabajo debe tener un nombre.</p>
        ) : null}
      </div>
    </Fragment>
  );
};

export default NewWork;
