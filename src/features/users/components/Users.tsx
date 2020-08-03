import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, usersSelectors } from '../usersSlice';

export function Users() {
  const total = useSelector(usersSelectors.selectTotal);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {total}
      </div>
      <div>
        <button onClick={() => dispatch(fetchUsers())}>
          Fetch users
        </button>
      </div>
    </div>
  );
}
