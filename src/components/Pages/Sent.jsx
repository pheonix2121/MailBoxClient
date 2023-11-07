import React, { useEffect, useState } from "react";
import Email from "../EmailBox";
import { useSelector } from "react-redux";
import { gettingSentEmails } from "../../store/MailApi"; 
import styles from "./Inbox.module.css"

const Sent = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    const fun = async () => {
      const res = await gettingSentEmails(userEmail);
      if(res) setEmails(Object.entries(res));
    };
    fun();
  }, []);




  return (
    <div className={styles.Sent}>
      <h2>Sent</h2>
      {emails?.map((data) => {
        return <Email key={data[0]} sent={true} email={data[1].data} id={data[0]} />;
      })}
    </div>
  );
};

export default Sent;