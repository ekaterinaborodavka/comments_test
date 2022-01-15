import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import * as actions from '../Store/actions/actions';
import { avatar } from '../utils';
import './CommentForm.css';

export const CommentForm = (props) => {
  const {withAvatar, onText} = props
  const repliesId = useSelector((state) => state.repliesId, shallowEqual);
  const text = useSelector((state) => state.text, shallowEqual);
  const repliesText = useSelector((state) => state.repliesText, shallowEqual);
  const editId = useSelector((state) => state.editId, shallowEqual);
  const editText = useSelector((state) => state.editText, shallowEqual);
  const dispatch = useDispatch();

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (repliesId) {
        dispatch(actions.addReplies(repliesText))
        dispatch(actions.clearRepliesForm());
      } else if (editId) {
        dispatch(actions.updateComment(editText))
      } else {
        dispatch(actions.addComment(text))
        dispatch(actions.clearForm()); 
      }
    }, [dispatch, repliesText, repliesId, text, editText, editId],
  );

  const onInputChange = useCallback(
    ({ target }) => {
      repliesId ? dispatch(actions.updateRepliesForm(target.value)) :
      editId ? dispatch(actions.updateEditForm(target.value)) :
      dispatch(actions.updateForm(target.value))
    }, [dispatch, repliesId, editId],
  );

  return (
    <div className='Comment_Form_Wrapper'>
      {withAvatar && <img className='Comment_Form_Avatar' src={ avatar } alt='avatar' />}
      <form className='Comment_Form'
      onSubmit={ onFormSubmit }
      >
      <textarea type="text"
        required
        className='Comment_Form_Input'
        name='text'
        value={ editId ? null : onText }
        defaultValue={editId ? onText : null}
        onChange={ onInputChange }
        placeholder='Your message'
      />
          <button className='Comment_Form_Button'>Send</button>
      </form>
    </div>
  );
};