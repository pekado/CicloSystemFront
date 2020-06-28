import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/authContext";

const NewAccount = props => {
  //extraer valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { mesage, auth, registerUser } = authContext;
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
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  //defracting
  const { email, password, name, confirm } = user;
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
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("You must fill every field", "alerta-error");
      return;
    }
    //pass de min 6 caracteres
    if (password.length < 6) {
      showAlert(
        "Password must have a minimun of six characters",
        "alerta-error"
      );
      return;
    }
    //dos paswords iguales
    if (password !== confirm) {
      showAlert("Passwords are different", "alerta-error");
      return;
    }
    //pasar al action
    registerUser({
      name,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Sign up</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={onChange}
            />
          </div>
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
          <div className="campo-form">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Confirm your Password"
              value={confirm}
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
              value="Register"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
