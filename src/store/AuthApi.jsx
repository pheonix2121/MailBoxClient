import axios from "axios";

export const createAccount = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9CovLfQUAcv_IykZ-R-oxcQwgYOydpew",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logIn = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9CovLfQUAcv_IykZ-R-oxcQwgYOydpew",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};