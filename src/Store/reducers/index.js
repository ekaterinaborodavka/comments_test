import { GET_COMMENTS,
  CLEAR_FORM,
  ADD_COMMENT,
  UPDATE_FORM,
  DELETE_COMMENT,
  SHOW_REPLIES_FORM,
  HIDE_REPLIES_FORM,
  UPDATE_REPLIES_FORM,
  CLEAR_REPLIES_FORM,
  UPDATE_COMMENT,
  ADD_REPLIES,
  SHOW_EDIT_FORM,
  UPDATE_EDIT_FORM
} from "../types";

const initialState = {
  comments: [],
  text: '',
  editId: 0,
  editText: '',
  repliesText: '',
  repliesId: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: action.comments
      };
    case ADD_REPLIES:
      return {
        ...state,
        comments: action.comments,
        repliesId: 0,
      };
    case SHOW_REPLIES_FORM:
      return {
        ...state,
        repliesId: action.id,
      };
    case HIDE_REPLIES_FORM:
      return {
        ...state,
        repliesId: 0
      };
    case SHOW_EDIT_FORM:
      return {
        ...state,
        editId: action.id,
        editText: action.body,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: action.comments
      };
    case UPDATE_FORM:
      return {
        ...state,
        text: action.text,
      };
    case UPDATE_EDIT_FORM:
      return {
        ...state,
        editText: action.text,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: action.comments,
        editId: 0,
        editText: '',
    };
    case UPDATE_REPLIES_FORM:
      return {
        ...state,
        repliesText: action.text,
      };
    case CLEAR_FORM:
      return {
        ...state,
        text: '',
      };
    case CLEAR_REPLIES_FORM:
      return {
        ...state,
        repliesText: '',
      };
    default:
      return state;
  }
};

export default reducer;
