import React, {useContext, useEffect} from 'react'
import remindersContext from "../../context/reminders/RemindersContext"
import Reminder from "./Reminder"

const RemindersList = () => {
    const ReminderContext = useContext(remindersContext)
    const {reminders, getReminders} = ReminderContext
    useEffect(() => {
      getReminders()
      //eslint-disable-next-line
    }, [])
    return ( 
        <div>
            {reminders.map(reminder => (
                <Reminder key={reminder.id} reminder={reminder}/>
            ))}
        </div>
     );
}
 
export default RemindersList;