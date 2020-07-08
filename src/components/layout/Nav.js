import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Nav = () => {
  const authContext = useContext(AuthContext);
  const { userAuth, logOut } = authContext;

  useEffect(() => {
    userAuth();
    //eslint-disable-next-line
  }, []);
  return (

      <div >
        <Link to={"clients"} className="btn btn-primario">
          Clientes
        </Link>
        <Link to={"clients"} className="btn btn-primario">
          Trabajos
        </Link>
        <button className="btn btn-primario" onClick={() => logOut()}>
        Log Out
      </button>
      </div>
    

  );
};

export default Nav;
