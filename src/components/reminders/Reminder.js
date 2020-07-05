import React, { useContext, useState } from "react";
import remindersContext from "../../context/reminders/RemindersContext";

const Reminder = reminder => {
  const ReminderContext = useContext(remindersContext);
  const { selectReminder, deleteReminder } = ReminderContext;

  const [show, setShow] = useState(false);

  return (
    <div onClick={() => setShow(true)} className="contenedor-tareas">
      <h3>{reminder.reminder.body}</h3>
      <div className={show ? "flex" : "hidden"}>
        <button
          className="btn btn-secundario"
          onClick={() => selectReminder(reminder.reminder)}
        >
          Editar
        </button>
        <button
          className="btn btn-secundario"
          onClick={() =>
            deleteReminder(reminder.reminder._id, reminder.reminder)
          }
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Reminder;
