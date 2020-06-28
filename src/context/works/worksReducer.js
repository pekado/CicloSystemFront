import {
  WORK_ERROR,
  FORM_WORK,
  GET_WORKS,
  ADD_WORK,
  FORM_VALIDATION,
  OPEN_WORK,
  DELETE_WORK,
  EDIT_WORK
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case FORM_WORK:
      return {
        ...state,
        form: true
      };
    case GET_WORKS:
      console.log(
        action.payload.filter(work => work.state === true))
      return {
        ...state,
        works: action.payload,
        finishedWorks: action.payload.filter(work => work.state === true),
        unfinishedWorks: action.payload.filter(work => work.state === false)
      };
    case ADD_WORK:
      return {
        ...state,
        form: false,
        formError: false
      };
    case FORM_VALIDATION:
      return {
        ...state,
        formError: true
      };
    case OPEN_WORK:
      return {
        ...state,
        work: state.works.filter(
          work => work._id === action.payload
        )
      };
    case DELETE_WORK:
      return {
        ...state,
        works: state.works.filter(
          work => work._id !== action.payload
        ),
        work: null
      };
      case WORK_ERROR:
        return{
          ...state,
          message: action.payload
        }
        case EDIT_WORK:
          return {
            ...state,
            works: state.works.map(work=>
              work._id === action.payload._id ? action.payload : work
            ),
            work: null
          };
    default:
      return state;
  }
};
