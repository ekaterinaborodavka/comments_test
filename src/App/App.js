import React, { useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';

import './App.css';
import * as actions from '../Store/actions/actions';
import { CommentForm } from '../CommentForm/CommentForm';
import { CommentList } from '../CommentsList/CommentsList';

export const App = () => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.text, shallowEqual);

  useEffect(() => {
    dispatch(actions.getComments());
  }, [dispatch]);

  return (
    <div className="App">
      <CommentForm withAvatar={true} onText={text} />
      <CommentList />
    </div>
  );
}
