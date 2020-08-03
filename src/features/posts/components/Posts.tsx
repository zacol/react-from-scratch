import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, postsSelectors } from '../postsSlice';

export function Posts() {
  const total = useSelector(postsSelectors.selectTotal);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {total}
      </div>
      <div>
        <button onClick={() => dispatch(fetchPosts())}>
          Fetch posts
        </button>
      </div>
    </div>
  );
}
