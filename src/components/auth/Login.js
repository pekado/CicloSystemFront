import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  //extraer valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { mesage, auth, logIn } = authContext;
  //si el usuario se haya registrado o esté repetido
  useEffect(() => {
    if (auth) {
      props.history.push("/works");
    }
    if (mesage) {
      showAlert(mesage.msg, mesage.category);
    }
    //eslint-disable-next-line
  }, [mesage, auth, props.history]);
  //state for login
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  //defracting
  const { email, password } = user;
  const onChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  //submit del login
  const onSubmit = event => {
    event.preventDefault();
    //validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      showAlert("You must fill every field", "alerta-error");
      return;
    }
    //pasar al action
    logIn({ email, password });
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Sign in</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your e-mail"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={onChange}
            />
          </div>
          {alert ? (
            <div className={`alerta ${alert.category}`}>{alert.msg}</div>
          ) : null}
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign in"
            />
          </div>
        </form>
        <Link to={"new-account"} className="enlace-cuenta">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
