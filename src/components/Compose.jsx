import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import styles from "./Compose.module.css";
import { useSelector } from "react-redux";
import { sentForInbox, sentForSentbox } from "../store/MailApi";



const MailBox = ({onClose}) => {
  const toEmail = useRef();
  const areaRef = useRef();
  const userEmail= useSelector(state => state.auth.userEmail)

  const handleSend = async () => {
    const email = toEmail.current.value;
    const message = areaRef.current.value;
    console.log(email, message)
    const emailObj = {
      to: email,
      from: userEmail,
      message: message,
      time: new Date(),
      isRead:false
    };
    const res = await sentForInbox({
      toEmail: email,
      data: emailObj,
    });
    if (res.name) {
      const sentRes = await sentForSentbox({
        fromEmail: userEmail,
        data: emailObj,
      });
      if (sentRes.name) {
        alert("Email Sent");
        toEmail.current.value = "";
        areaRef.current.value = "";
        onClose();
      }
    } else {
      alert("Failed! Please Try Again");
    } 
  };

  return (
    <div className={styles.composeContainer}>
      <div className={module.closeDiv}>
        <div
          onClick={() => onClose()}
          className={styles.close}
        >
          Close
        </div>
      </div>
      <div className={styles.mail}>
        <div>
          <input type="email" placeholder="To" ref={toEmail} />
        </div>
        <JoditEditor
          ref={areaRef}
          config={{
            width: 500,
            height: 350,
          }}
        />
      </div>
      <div className={styles.action}>
        <button className={styles.btn} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBox;