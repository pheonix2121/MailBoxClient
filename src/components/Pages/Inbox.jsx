import React, { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Email from "../EmailBox";
import { useDispatch, useSelector } from "react-redux";
import { gettingRecivedEmails } from "../../store/MailApi"; 
import { unReadEmailsHandler } from "../../store/AuthRedux";
const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch()
  useEffect(() => {
    const fun = async () => {
      const res = await gettingRecivedEmails(userEmail);
      if(res) setEmails(Object.entries(res));
      console.log(res)
    };
    fun();
    const interval=  setInterval(fun, 2000);
  console.log("run")
  return ()=>{clearInterval(interval)}
  }, []);


  useEffect(()=>{
    let totalUnreadEmails = emails?.reduce((curr, data) => {
      if (!data[1].data.isRead) curr++;
      return curr;
    }, 0);
    dispatch(unReadEmailsHandler(totalUnreadEmails))
  },[emails])


  return (
    <div className={styles.inbox}>
      <h2>INBOX</h2>
      {emails?.map((data) => {
       return <Email key={data[0]} sent={false} email={data[1].data} id={data[0]} />;
      })}
    </div>
  );
};

export default Inbox;