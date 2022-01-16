import React from 'react';
import PropTypes from 'prop-types';

import './RepliesListElement.css';

export const RepliesListElement = (props) => {
  const {replies, nameToAnswer} = props
  const {avatar, body, date, name} = replies
  const convertDate = new Date(date).toISOString().slice(0, 10)

  return (
    <div className='Replies_List_Element_Wrapper'>
      <img className='Replies_List_Element_Avatar' src={ avatar } alt='avatar' />
      <div className='Replies_List_Element_Info_wrap'>
      <div className='Replies_List_Element_Info'>
        <span className='Replies_List_Element_Name'>{ name }</span>
        <span className='Replies_List_Element_AnswerTo'>to { nameToAnswer }</span>
        <span className='Replies_List_Element_Date'>{ convertDate }</span>
      </div>
        <div className='Replies_List_Element_Body'>{ body }</div>
      </div>
    </div>
  );
};

RepliesListElement.propTypes = {
  comment: PropTypes.shape({
    nameToAnswer: PropTypes.string,
    replies: PropTypes.shape({
      id: PropTypes.number,
      commentId: PropTypes.number,
      name: PropTypes.string,
      body: PropTypes.string,
      avatar: PropTypes.string,
      date: PropTypes.number,
    })
  }),
};