import { createSlice } from "@reduxjs/toolkit";

const localState = JSON.parse(localStorage.getItem("userdata"));

const initialState = {
    token: localState && localState.token ?  localState.token :  "",
    userEmail: localState && localState.userEmail?  localState.userEmail :  "",
    userName: localState && localState.userName,
    isLoggedIn: localState && localState.token?  true : false,
  }
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { userEmail, token, userName } = action.payload;
      state.userEmail = userEmail;
      state.token = token;
      state.userName = userName;
      state.isLoggedIn = true;
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          token,
          userEmail,
          userName,
        })
      );
    },
    logout(state) {
      state.token = "";
      state.userEmail = "";
      state.userName = ''
      state.isLoggedIn = false;
      localStorage.removeItem("userdata");


    },
    unReadEmailsHandler(state, action){
      state.unReadEmails= action.payload;
    
    }

  },
});

export const { login, logout, unReadEmailsHandler} =
  authSlice.actions;

export default authSlice.reducer;