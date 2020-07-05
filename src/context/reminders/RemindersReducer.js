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

export default (state, action) => {
  switch (action.type) {
    case GET_REMINDERS:
      return {
        ...state,
        reminders: action.payload
      };
    case CREATE_REMINDER:
      return {
        ...state,
        remindererror: false
      };
    case VALIDATE_REMINDER:
      return {
        ...state,
        remindererror: true
      };
    case UPDATE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map(reminder =>
          reminder._id === action.payload._id ? action.payload : reminder
        ),
        selectedreminder: null
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          reminder => reminder._id !== action.payload
        )
      };
    case CLEAR_REMINDER:
      return {
        selectedreminder: null
      };
    case SELECT_REMINDER:
      return {
        ...state,
        selectedreminder: action.payload
      };

    default:
      return state;
  }
};
