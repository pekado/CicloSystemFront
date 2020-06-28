import React from "react";


import Nav from "../layout/Nav";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        Ciclo<span>System</span>
      </h1>
      <Link to={"clients"} className="btn btn-primario">
        Clientes
      </Link>
      <Nav />
   
    </aside>
  );
};

export default Sidebar;
