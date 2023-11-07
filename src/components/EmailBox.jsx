import React from "react";
import styles from "./EmailBox.module.css"
import { formatTimeStamp } from "../store/HelperFunctions";


const Email = ({ email }) => {
  return (
    <div className={styles.email}>
      <h4>{email.from}</h4>
      <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
      <span>{formatTimeStamp(email.time)}</span>
    </div>
  );
};

export default Email;