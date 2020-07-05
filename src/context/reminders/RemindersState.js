import React, { useReducer } from "react";
import RemindersContext from "./RemindersContext";
import RemindersReducer from "./RemindersReducer";
import axiosClient from "../../config/axios";
import {
  CLEAR_REMINDER,
  CREATE_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  GET_REMINDERS,
  REMINDER_ERROR,
  VALIDATE_REMINDER,
  SELECT_REMINDER
} from "../../types";

const RemindersState = props => {
  const initialState = {
    reminders: [],
    selectedreminder: null,
    remindererror: false
  };

  const [state, dispatch] = useReducer(RemindersReducer, initialState);

  //buscar reminders
  const getReminders = async () => {
    try {
      const reminders = await axiosClient.get("/api/reminders");
      dispatch({
        type: GET_REMINDERS,
        payload: reminders.data.reminders
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createReminder = async reminder => {
    try {
      const result = await axiosClient.post("/api/reminders", reminder);
      console.log(result);
      dispatch({
        type: CREATE_REMINDER
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editReminder = async reminder => {
    try {
        const result = await axiosClient.put(`/api/reminders/${reminder._id}`, reminder)
        dispatch({
            type: UPDATE_REMINDER,
            payload: result.data.currentReminder
        })
    } catch (error) {
        console.log(error)
    }
  }

  const deleteReminder = async (reminderId, reminder) => {
      try {
          await axiosClient.delete(`/api/reminders/${reminderId}`, {params: reminder})
          dispatch({
              type: DELETE_REMINDER,
              payload:reminderId
          })
      } catch (error) {
          console.log(error)
      }
  }

  const selectReminder = reminder => {
      dispatch({
          type: SELECT_REMINDER,
          payload: reminder
      })
  }

  const validateReminder = () => {
    dispatch({
      type: VALIDATE_REMINDER
    });
  };

  return (
    <RemindersContext.Provider
      value={{
        reminders: state.reminders,
        remindererror: state.remindererror,
        selectedreminder: state.selectedreminder,
        createReminder,
        editReminder,
        validateReminder,
        getReminders,
        deleteReminder,
        selectReminder
      }}
    >
      {props.children}
    </RemindersContext.Provider>
  );
};
export default RemindersState;
