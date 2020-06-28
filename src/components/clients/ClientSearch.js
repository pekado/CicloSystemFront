import React, { useState, useEffect, useContext, Fragment } from "react";
import ClientContext from "../../context/clients/ClientContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Client from "./Client";

const ClientSearch = () => {
  const clientContext = useContext(ClientContext);
  const {
    clients,
    findClient,
    showError,
    formError,
    filteredClients,
    getClients
  } = clientContext;
  const [search, setSearch] = useState("");
  const handleChange = event => {
    setSearch({
      [event.target.name]: event.target.value
    });
  };
  useEffect(() => {
    const filteredData = clients.filter(item => {
      return Object.values(item).some(key =>
        String(key).includes(search.search)
      );
    });
    getClients();
    findClient(filteredData);
  }, [search]);

  return (
    <Fragment>
      <form>
        <label className="margin-sides">Buscar Cliente</label>
        <input
          onChange={handleChange}
          name="search"
          className="input-text input-margin input-clientes margin-sides"
          placeholder="Telefono, nombre, etc."
          list="autocomplete-list"
        />
        <datalist id="autocomplete-list">
          {filteredClients.map(item => (
            <option key={item} value={item.name}>
              {item.name}
            </option>
          ))}
        </datalist>
        {formError ? (
          <p className="mensaje error">Error en los datos!</p>
        ) : null}
      </form>
    </Fragment>
  );
};

export default ClientSearch;
