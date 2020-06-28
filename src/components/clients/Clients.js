import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ClientContext from "../../context/clients/ClientContext";
import ClientList from "./ClientList";
import NewClient from "./NewClient";
import { Link } from "react-router-dom";
import ClientSearch from "./ClientSearch";

const Clients = () => {
  const clientContext = useContext(ClientContext);
  const { setNewWork } = clientContext;
  //extraer info de auth
  const authContext = useContext(AuthContext);
  const { userAuth } = authContext;

  useEffect(() => {
    userAuth();
    setNewWork(false)
    //eslint-disable-next-line
  }, []);
  return (
    <div className="contenedor-app">
      <aside>
        <NewClient />
      </aside>
      <div className="seccion-principal">
        <main>
          <div className="flex">
            <div id="botonClientes" className="margin-sides">
              <Link to={"works"} className="btn btn-primario">
                Volver a Trabajos
              </Link>
            </div>
            <ClientSearch />
          </div>
          <ClientList />
        </main>
      </div>
    </div>
  );
};

export default Clients;
