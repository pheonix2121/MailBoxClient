import React, { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Email from "../EmailBox";
import { useSelector } from "react-redux";
import { gettingRecivedEmails } from "../../store/MailApi"; 

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    const fun = async () => {
      const res = await gettingRecivedEmails(userEmail);
      if(res) setEmails(Object.entries(res));
      console.log(res)
    };
    fun();
  }, []);


  return (
    <div className={styles.inbox}>
      <h2>INBOX</h2>
      {emails?.map((data) => {
        return <Email key={data[0]} email={data[1].data} id={data[0]} />;
      })}
    </div>
  );
};

export default Inbox;