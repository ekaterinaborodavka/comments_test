import { 
    GET_COMMENTS,
    CLEAR_FORM,
    ADD_COMMENT,
    UPDATE_FORM,
    DELETE_COMMENT,
    SHOW_REPLIES_FORM,
    HIDE_REPLIES_FORM,
    UPDATE_REPLIES_FORM,
    CLEAR_REPLIES_FORM,
    ADD_REPLIES,
    SHOW_EDIT_FORM,
    UPDATE_COMMENT,
    UPDATE_EDIT_FORM
} from "../types";
import {get, create, remove, update, createReplies} from '../../Services/networkProvider'
import { editComment, newComment, updateComments, newReplies, createNewReplies } from "../../utils";

export const getComments = () => {
    return async (dispatch, getState) => {
        get().then(res => {
            dispatch({
                type: GET_COMMENTS,
                comments: res
            });
        })
    }
  };

export const clearForm = () => {
    return {
      type: CLEAR_FORM,
    };
};

export const clearRepliesForm = () => {
    return {
      type: CLEAR_REPLIES_FORM,
    };
};

export const updateForm = (text) => {
    return {
      type: UPDATE_FORM,
      text
    };
};

export const updateEditForm = (text) => {
    return {
      type: UPDATE_EDIT_FORM,
      text
    };
};

export const updateRepliesForm = (text) => {
    return {
      type: UPDATE_REPLIES_FORM,
      text
    };
};

export const showRepliesForm = (id) => {
    return {
      type: SHOW_REPLIES_FORM,
      id
    };
};

export const hideRepliesForm = () => {
    return {
      type: HIDE_REPLIES_FORM,
    };
};

export const showEditForm = (id, body) => {
    return {
      type: SHOW_EDIT_FORM,
      id,
      body
    };
};

export const addComment = (text) => {
    return async (dispatch, getState) => {
        const state = getState()
        const id = state.comments.length+1
        const newItem = newComment(text, id)
        create(newItem).then(res => {
            dispatch({
                type: ADD_COMMENT,
                comments: [...state.comments, res]
            });
        })
    }
};

export const deleteComment = (id) => {
    return async (dispatch, getState) => {
        remove(id).then(() => {
            const state = getState()
            const newComments = state.comments.filter(com => com.id !== id);
            dispatch({
                type: DELETE_COMMENT,
                comments: newComments
            });
        })
    }
};

export const addReplies = (text) => {
    return async (dispatch, getState) => {
        const state = getState()
        const {repliesId} = state
        const newItem = newReplies(text, repliesId)
        createReplies(newItem, repliesId).then(res => {
            const comments = createNewReplies(repliesId, res, state.comments)
            dispatch({
                type: ADD_REPLIES,
                comments
            });
        })
    }
};

export const updateComment = (text) => {
    return async (dispatch, getState) => {
        const state = getState()
        const {editId, comments} = state
        const newComment = editComment(editId, text, comments)
        update(editId, newComment).then(res => {
            const newComments = updateComments(res, comments)
            dispatch({
                type: UPDATE_COMMENT,
                comments: newComments
            });
        })
    }
};