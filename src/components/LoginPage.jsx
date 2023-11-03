import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/AuthRedux";
import classes from "./LoginPage.module.css";
import axios from "axios";
import { createAccount, logIn } from "../store/AuthApi";

const LoginPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const authData = useSelector((state) => state.auth);
  useEffect(() => {
    if (authData.token) {
      navigate("/home");
    }
  }, [authData.token, navigate]);

  const forgotPasswordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;

    setIsLoading(true);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD9CovLfQUAcv_IykZ-R-oxcQwgYOydpew`;

    try {
      const response = await axios.post(url, {
        email: enteredEmail,
        requestType: "PASSWORD_RESET",
      });

      setIsLoading(false);
      alert("Password reset email sent successfully!");
    } catch (err) {
      setIsLoading(false);
      alert("Password reset failed!");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match.");
        setIsLoading(false);
        return;
      }
    }
    if (isLogin) {
      const data = await logIn({
        email: enteredEmail,
        password: enteredPassword,
      });

      dispatch(
        login({
          token: data.idToken,
          userEmail: data.email,
        })
      );
    } else {
      const res = await createAccount({
        email: enteredEmail,
        password: enteredPassword,
      });
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              required
              ref={confirmPasswordInputRef}
            />
            <span
              className={classes.show}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button onClick={() => setIsLogin(prev => !prev)}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {isLogin && (
            <button type="button" onClick={forgotPasswordHandler}>
              Forgot Password
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default LoginPage;