import React, { useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { CommentForm } from '../CommentForm/CommentForm';
import { RepliesListElement } from '../RepliesListElement/RepliesListElement';
import './CommentListElement.css';
import * as actions from '../Store/actions/actions';

export const CommentListElement = ({comment}) => {
  const dispatch = useDispatch();
  const repliesId = useSelector((state) => state.repliesId, shallowEqual);
  const repliesText = useSelector((state) => state.repliesText, shallowEqual);
  const editId = useSelector((state) => state.editId, shallowEqual);
  const {avatar, body, date, name, replies, id} = comment
  const convertDate = new Date(date).toISOString().slice(0, 10)

  const deleteComment= useCallback(
    () => {
      dispatch(actions.deleteComment(id));
    }, [dispatch, id],
  );

  const hideRepliesCommentForm = useCallback(
    () => {
      dispatch(actions.hideRepliesForm());
      dispatch(actions.clearRepliesForm());
    }, [dispatch],
  );

  const showRepliesCommentForm = useCallback(
    () => {
      dispatch(actions.showRepliesForm(id));
    }, [dispatch, id],
  );

  const editComment = useCallback(
    () => {
      dispatch(actions.showEditForm(id, body));
    }, [dispatch, id, body],
  );

  return (
    <div className='Comment_List_Element_Wrapper'>
      <div className='Comment_List_Element'>
        <img className='Comment_List_Element_Avatar' src={ avatar } alt='avatar' />
        <div className='Comment_List_Element_Info_Wrap'>
          <div className='Comment_List_Element_Info'>
            <span className='Comment_List_Element_Name'>{ name }</span>
            <span className='Comment_List_Element_Date'>{ convertDate }</span>
            <div className='Comment_List_Element_Body'>{ body }</div>
          </div>
          <div className='Comment_List_Element_Buttons'>
            <button onClick={editComment} className='Comment_List_Element_Button'>Edit</button>
            <button onClick={deleteComment} className='Comment_List_Element_Button'>Delete</button>
            <button onClick={showRepliesCommentForm} className='Comment_List_Element_Button'>Reply</button>
          </div>
        </div>
      </div>
      {repliesId === id ? <div className='Replies_Form_Wrapper'>
        <div className='Replies_Form_Info'>
          <span className='Replies_Form_To'> to {name}</span>
          <button onClick={hideRepliesCommentForm} className='Replies_Form_Button'>Cancel</button>
        </div>
        <CommentForm withAvatar={false} onText={repliesText} />
      </div> : null}
      {editId === id ? <div className='Replies_Form_Wrapper'>
      <CommentForm withAvatar={false} onText={body} /> 
      </div> : null}
        {replies ? Array.isArray(replies) && replies.map( (replies) => {
          return (
            <RepliesListElement
              replies={ replies }
              key={ replies.id }
              nameToAnswer={name}
            />
          );
        }) : null }
    </div>
  );
};

CommentListElement.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    body: PropTypes.string,
    avatar: PropTypes.string,
    date: PropTypes.number,
    replies: PropTypes.array
  }),
};