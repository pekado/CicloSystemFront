//importo types para el switch
import {
  WORK_TASKS,
  CREATE_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  EDIT_TASK,
  CLEAR_TASK,
  CLOSE_MODAL
} from "../../types";
//creo un switch para cada case, al caer en uno actualiza states iniciales.
export default (state, action) => {
  switch (action.type) {
    case WORK_TASKS:
      return {
        ...state,
        worktasks: action.payload.tasks,
        clientTasks: action.payload.currentClient,
        openModal: true
      };
    case CREATE_TASK:
      return {
        ...state,
        taskerror: false,
        // worktasks: [action.payload, ...state.worktasks]
      };
    case VALIDATE_TASK:
      return {
        ...state,
        taskerror: true
      };
    case DELETE_TASK:
      return {
        ...state,
        worktasks: state.worktasks.filter(task => task._id !== action.payload)
      };
    case ACTUAL_TASK:
      return {
        ...state,
        selectedtask: action.payload
      };
    case EDIT_TASK:
      return {
        ...state,
        worktasks: state.worktasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        selectedtask: null
      };
      case CLEAR_TASK:
        return{
          ...state,
          selectedtask: null
        }
        case CLOSE_MODAL:
          return{
            ...state,
            openModal: false
          }
    default:
      return state;
  }
};
