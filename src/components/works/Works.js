import React, { useContext, useEffect, useState, Fragment } from "react";
import Sidebar from "../layout/Sidebar";

import Tasks from "../tasks/Tasks";
import TasksList from "../tasks/TasksList";
import WorksList from "./WorksList";
import AuthContext from "../../context/auth/authContext";
import NewWork from "./NewWork";
import WorksContext from "../../context/works/worksContext";

const Works = () => {
  //obtener state del formulario
  const worksContext = useContext(WorksContext);
  //deracturing states(de lado izquierdo) y funciones(lado derecho)
  const { work } = worksContext;
  //extraer info de auth
  const authContext = useContext(AuthContext);
  const { userAuth } = authContext;

  const [clients, setClients] = useState(false);
  useEffect(() => {
    userAuth();
    //eslint-disable-next-line
    if (!work) {
      setClients(true);
    }
  }, []);
  return (
    <div className="contenedor-app">
        <Sidebar />
        
      <div className="seccion-principal">
        <NewWork />
        <main>
          <Fragment>
            <Tasks />
            <div>
              <WorksList />
            </div>
          </Fragment>
        </main>
      </div>
    </div>
  );
};

export default Works;
