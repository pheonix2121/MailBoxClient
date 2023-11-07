import React, { useEffect, useState } from "react";
import styles from "./ShowMail.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { gettingInboxSingleEmail, isReadEmaiHandler } from "../store/MailApi";
import { formatTimeStamp } from "../store/HelperFunctions";

const ShowMail = () => {
  const [email, setEmail] = useState({});
  const userEmail = useSelector((state) => state.auth.userEmail);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      const res = await gettingInboxSingleEmail({
        email: userEmail,
        id,
      });
      setEmail(res.data);
    }
    fetchEmail()
  }, []);

 useEffect(()=>{
    async function fun (){
        let updatedEmail = {
            from: email.from,
            isRead: true,
            message: email.message,
            time: email.time,
            to: email.to,
          };
          console.log(updatedEmail)
          const res = await isReadEmaiHandler({
              email: userEmail, id, data: updatedEmail
          })
          console.log(res);

    }
    if (!email.isRead && email.time) {

        fun();

    }

 },[email])

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

export default ShowMail;