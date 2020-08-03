import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdapterState, RootState } from '../../app/store';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const postsAdapter = createEntityAdapter<Post>();
console.log(postsAdapter)

const initialState = postsAdapter.getInitialState<AdapterState>({
  status: 'idle',
  error: null
});

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: {
    [`${fetchPosts.pending}`]: (state) => {
      state.status = 'loading'
    },
    [`${fetchPosts.fulfilled}`]: (state, { payload }: PayloadAction<Post[]>) => {
      state.status = 'succeeded'
      postsAdapter.upsertMany(state, payload)
    },
    [`${fetchPosts.rejected}`]: (state, { payload }: PayloadAction<string>) => {
      state.status = 'failed'
      state.error = payload
    },
  },
});

export const postsSelectors = postsAdapter.getSelectors((state: RootState) => state.posts)

export default postsSlice.reducer;
