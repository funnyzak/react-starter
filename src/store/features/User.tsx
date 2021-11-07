import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/store';

interface TUser {
  name: string;
  age: number;
  email: string;
}

const initialState: { value: TUser } = {
  value: { name: 'eric', age: 24, email: 'silenceace@gmail.com' }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    }
  }
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (_user: TUser): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(login(_user));
  }, 1000);
};

export const selectUser = (state: RootState) => state.user.value;

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
