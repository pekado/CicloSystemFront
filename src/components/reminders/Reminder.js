import React, { useContext, Fragment } from "react";
import remindersContext from "../../context/reminders/RemindersContext";

const Reminder = reminder => {
  const ReminderContext = useContext(remindersContext);
  const { selectReminder, deleteReminder } = ReminderContext;

  return (
    <Fragment>
      <div className="contenedor-tareas">
        <div className="reminder">
          <a className="" onClick={() => selectReminder(reminder.reminder)}>
            &#x270D;
          </a>
          <a
            className=""
            onClick={() =>
              deleteReminder(reminder.reminder._id, reminder.reminder)
            }
          >
            &#x2715;
          </a>
        </div>
          <h3>{reminder.reminder.body}</h3>
      </div>
    </Fragment>
  );
};

export default Reminder;
