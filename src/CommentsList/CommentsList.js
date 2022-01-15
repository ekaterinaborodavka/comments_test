import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { CommentListElement } from '../CommentListElement/CommentsListElement';
import './CommentList.css';

export const CommentList = () => {
const comments = useSelector((state) => state.comments, shallowEqual);

  return (
    <div className='Comment_List_Wrapper'>
      {Array.isArray(comments) && comments.map( (comment) => {
        return (
          <CommentListElement
            comment={ comment }
            key={ comment.id }
          />
        );
      })}
    </div>
  );
};