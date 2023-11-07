import React, { useEffect, useState } from "react";
import styles from "./ShowSentMails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { gettingSentSingleEmail } from "../store/MailApi";
import { formatTimeStamp } from "../store/HelperFunctions";

const ShowSentMails = () => {
  const [email, setEmail] = useState({});
  const userEmail = useSelector((state) => state.auth.userEmail);
  const { id } = useParams();

 useEffect(() => {
    const fetchEmail = async () => {
      const res = await gettingSentSingleEmail({
        email: userEmail,
        id,
      });
      setEmail(res.data)
    }
    fetchEmail()
  }, []);



  return (
    <div className={styles.email}>
      <h1>Email</h1>
      <div className={styles["email-header"]}>
        <h4>{email.from}</h4>
        <span>{formatTimeStamp(email.time)}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
    </div>
  );
};

export default ShowSentMails;