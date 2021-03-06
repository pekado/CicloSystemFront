import React, { useEffect, useState, useContext, Fragment } from "react";
import Pagination from "pagination-react-hooks";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FadeIn from "react-fade-in";
import ClientContext from "../../context/clients/ClientContext";
import AlertContext from "../../context/alerts/AlertContext";
import Client from "./Client";
import "../styles/table.css";

const ClientList = () => {
  const clientContext = useContext(ClientContext);
  const { clients, getClients, filteredClients } = clientContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    getClients();

    //eslint-disable-next-line
  }, []);

  const show = value =><tr className="box" ><Client client={value} key={value._id} /></tr>;
  return (
    <FadeIn delay={300} transitionDuration={700}>
    <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Bicicleta</th>
            <th>Opciones</th>
          </tr>
        </thead>

        <Pagination
          data={filteredClients.length === 0 ? clients : filteredClients}
          Show={show}
          displayNumber="20"
          previousText="Anterior"
          nextText="Siguiente"
        />
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
      </table>
    </FadeIn>
  );
};

export default ClientList;
