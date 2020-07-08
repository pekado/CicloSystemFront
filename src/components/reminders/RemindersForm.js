import React, { useContext, useState, useEffect } from "react";
import remindersContext from "../../context/reminders/RemindersContext";

const RemindersForm = () => {
  const ReminderContext = useContext(remindersContext);
  const {
    reminders,
    remindererror,
    getReminders,
    createReminder,
    selectedreminder,
    validateReminder,
    editReminder
  } = ReminderContext;

  const [newReminder, setNewReminder] = useState({ body: "" });
  const [show, setShow] = useState(false);

  const { body } = newReminder;

  const handleChange = event => {
    setNewReminder({
      ...newReminder,
      [event.target.name]: event.target.value
    });
  };

  const sendReminder = event => {
    try {
      event.preventDefault();
      if (body === "") {
        validateReminder();
        return;
      }
      if (selectedreminder === null) {
        createReminder(newReminder);
      } else {
        editReminder(newReminder);
        //   clearReminder()
      }
      setNewReminder({ body: "" });
      setTimeout(() => {
        getReminders();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedreminder !== null) {
      setNewReminder(selectedreminder);
    } else {
      setNewReminder({
        body: ""
      });
    }
  }, [selectedreminder]);
  return (
    <form onSubmit={sendReminder}>
      <input
        type="text"
        className={show ? "input-text input-margin " : "hide"}
        placeholder="A Recordar"
        name="body"
        value={body}
        onChange={handleChange}
      />
      {show ? (
        <button type="submit" className="btn btn-secundario">
          Crear Recordatorio
        </button>
      ) : (
        <a onClick={() => setShow(true)} className="btn btn-secundario">
          Nuevo Recordatorio
        </a>
      )}
      {remindererror ? (
        <p className="alerta-error alerta">Recordatorio vacío</p>
      ) : null}
    </form>
  );
};

export default RemindersForm;
