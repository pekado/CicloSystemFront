import React, { useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import FadeIn from "react-fade-in";
import AlertContext from "../../context/alerts/AlertContext";
import Work from "./Work";
import WorksContext from "../../context/works/worksContext";
import AuthContext from "../../context/auth/authContext";
import "../styles/table.css";

const WorksList = () => {
  //obtener state
  const worksContext = useContext(WorksContext);
  const {
    message,
    works,
    getWorks,
    unfinishedWorks,
    finishedWorks
  } = worksContext;
  const authContext = useContext(AuthContext);
  const { userAuth, logOut } = authContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    userAuth();
    getWorks();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    //eslint-disable-next-line
  }, [message]);
  //revisar si hay Works
  
  return (
    <div>
      <h1>Trabajos Pendientes</h1>
      {unfinishedWorks.length !== 0 ? (
        <FadeIn delay={300} transitionDuration={700}>
        <table>
          <thead>
            <tr>
              <th>Fecha de Ingreso</th>
              <th>Bicicleta</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Entrega</th>
              <th>Hora de Entrega</th>
            </tr>
          </thead>
          <tbody>
            {unfinishedWorks.map(work => (
              <Work work={work} key={work._id}/>
            ))}
          </tbody>
        </table>
        </FadeIn>
      ) : (
        <p>No works yet</p>
      )}
      <h1>Trabajos Finalizados</h1>
      {finishedWorks.length !== 0 ? (
        <FadeIn delay={300} transitionDuration={700}>
        <table>
          <thead>
            <tr>
              <th>Fecha de Ingreso</th>
              <th>Bicicleta</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Entrega</th>
              <th>Hora de Entrega</th>
            </tr>
          </thead>
          <tbody>
            {finishedWorks.map(work => (
              <Work work={work} />
            ))}
          </tbody>
        </table>
        </FadeIn>
      ) : (
        <p>No works yet</p>
      )}
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <button className="btn btn-block btn-primario" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  );
};

export default WorksList;
