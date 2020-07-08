import React, { useContext, useEffect } from "react";
import FadeIn from "react-fade-in";
import remindersContext from "../../context/reminders/RemindersContext";
import Reminder from "./Reminder";

const RemindersList = () => {
  const ReminderContext = useContext(remindersContext);
  const { reminders, getReminders } = ReminderContext;
  useEffect(() => {
    getReminders();
    //eslint-disable-next-line
  }, []);
  return (
    <FadeIn delay={300} transitionDuration={700}>
      <div>
        {reminders.map(reminder => (
          <Reminder key={reminder._id} reminder={reminder} />
        ))}
      </div>
    </FadeIn>
  );
};

export default RemindersList;
