import {
  FORM_CLIENT,
  GET_CLIENTS,
  CLIENTFORM_VALIDATION,
  OPEN_CLIENT,
  DELETE_CLIENT,
  ADD_CLIENT,
  CLIENT_ERROR,
  ACTUAL_CLIENT,
  CLEAR_CLIENT,
  FIND_CLIENT,
  NEW_WORK
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case FORM_CLIENT:
      return {
        ...state,
        form: true
      };
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
        form: false,
        formError: false
      };
    case CLIENTFORM_VALIDATION:
      return {
        ...state,
        formError: true
      };
    case OPEN_CLIENT:
      return {
        ...state,
        client: state.clients.filter(client => client._id === action.payload)
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client._id !== action.payload),
        client: null
      };
    case CLIENT_ERROR:
      return {
        ...state,
        message: action.payload
      };
    case NEW_WORK:
      return {
        ...state,
        newWork: action.payload
      };
    case ACTUAL_CLIENT:
      return {
        ...state,
        selectedClient: action.payload
      };
    case CLEAR_CLIENT:
      return {
        ...state,
        selectedClient: null
      };
    case FIND_CLIENT:
      return {
        ...state,
        filteredClients: action.payload
      };
    default:
      return state;
  }
};
