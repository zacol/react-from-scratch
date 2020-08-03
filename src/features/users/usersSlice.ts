import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdapterState, RootState } from '../../app/store';

type User = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState<AdapterState>({
  status: 'idle',
  error: null
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: {
    [`${fetchUsers.pending}`]: (state) => {
      state.status = 'loading'
    },
    [`${fetchUsers.fulfilled}`]: (state, { payload }: PayloadAction<User[]>) => {
      state.status = 'succeeded'
      usersAdapter.upsertMany(state, payload)
    },
    [`${fetchUsers.rejected}`]: (state, { payload }: PayloadAction<string>) => {
      state.status = 'failed'
      state.error = payload
    },
  },
});

export const usersSelectors = usersAdapter.getSelectors((state: RootState) => state.users)

export default usersSlice.reducer;
