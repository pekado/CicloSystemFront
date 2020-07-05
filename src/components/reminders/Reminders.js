import React from 'react'
import RemindersList from "./RemindersList"
import ReminderForm from "./RemindersForm"

const Reminders = () => {
    
    return ( <div>
        <ReminderForm/>
        <RemindersList/>
    </div> );
}
 
export default Reminders;