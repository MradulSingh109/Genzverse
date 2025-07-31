import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';



const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
}
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register',
        formData,
        {
          withCredentials: true,
        }
      )
      return response.data;
    } catch (error) {
      console.error(error.response?.data, error);
      throw error; // Propagate the error to the rejected case
    }
  }
)


export const loginUser = createAsyncThunk(
  "auth/loginUser",


  async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login',
        formData,
        {
          withCredentials: true,
        }
      )
      return response.data;
    } catch (error) {
      console.error(error.response?.data, error);
      throw error; // Propagate the error to the rejected case
    }
  }

)

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",

  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/check-auth',
        {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate,',
            Expires: '0',
          }
        },
      )
       return response.data;
    } catch (error) {
      console.error(error.response?.data, error);
      throw error; // Propagate the error to the rejected case
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async () => {
    const response = await axios.post('http://localhost:5000/api/auth/logout',{},
      {
        withCredentials: true,
      }
    )
    return response.data;
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; // Assuming registration does not automatically authenticate the user
        state.user = null; // Assuming the response contains user data
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false; // Assuming successful login sets the user as authenticated
        state.user = action.payload.success ? action.payload.user : null; // Assuming the response contains user data
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false; // Assuming successful login sets the user as authenticated
        state.user = action.payload.success ? action.payload.user : null; // Assuming the response contains user data
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
