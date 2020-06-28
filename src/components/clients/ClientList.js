import React, { useEffect, useState, useContext, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
 
  return (
    <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Bicicleta</th>
              <th>Opciones</th>
            </tr>
            
        {filteredClients.length === 0 ? 
        ( <Fragment> {clients.map(client => 
              <CSSTransition
                  key={client._id}
                  timeout={300} 
                >
              <Client  client={client} />
              </CSSTransition>
            )} 
            </Fragment>)
            :
           ( <Fragment>
              {filteredClients.map(client => (
                <CSSTransition
                  key={client._id}
                  timeout={300}
                  
                >
                  <Client  client={client} />
                </CSSTransition>
              ))}
              </Fragment>)
        }
     
          </thead>
          <tbody></tbody>
          {alert ? (
            <div className={`alerta ${alert.category}`}>{alert.msg}</div>
          ) : null}
        </table>

  );
};

export default ClientList;
