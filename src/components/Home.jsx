import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/AuthRedux";
import Header from "./Header";
import Compose from "./Compose";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
const [showCompose, setShowCompose] = useState(false);

  const handleCompose = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };

  const handleSendEmail = (email) => {
    console.log(email);
  };



  return (
       <div className={styles.container}>
      <h1>MailBOx</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.composeBtn} onClick={handleCompose}>Compose</button>
        {showCompose && (
          <Compose onClose={handleCloseCompose} onSend={handleSendEmail} />
        )}
      </div>

      <Header />
      <nav className={styles.navContainer}>
        <ul>
          {!isLoggedIn && <Link to="/">Login</Link>}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;