import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState:{
        status:'checking' , // 'not-authentiicated' , 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoULR: null,
        errorMessage: null,
  },
  reducers: {
    Login: (state, { payload } ) => {

      state.status='authenticated' ; // 'checking' , 'not-authentiicated'
      state.uid= payload.uid;
      state.email= payload.email;
      state.displayName= payload.displayName;
      state.photoULR= payload.photoURL;
      state.errorMessage= null;
      
    },
    Logout: (state , {payload} ) => {
      state.status='not-authentiicated' ; // 'checking' , 'authenticated'
      state.uid= null;
      state.email= null;
      state.displayName= null;
      state.photoULR= null;
      state.errorMessage= payload?.errorMessage;

    },
    checkingCredentials: ( state ) =>{
        state.status= 'checking';
    }
  },
})


export const { Login, Logout, checkingCredentials } = authSlice.actions
