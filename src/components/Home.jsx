import React, {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/AuthRedux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state=> state.auth)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };



  return (
    <div >
      <h1>Welcome</h1>


      <nav>
        <ul>
          {!isLoggedIn && <Link to="/">Login</Link>}
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </ul>
      </nav>
    </div>
  );
};

export default Home;