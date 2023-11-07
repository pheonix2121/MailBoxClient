import React from "react";
import styles from "./EmailBox.module.css"
import { formatTimeStamp } from "../store/HelperFunctions";
import { Link } from "react-router-dom";
import { FaCircle} from 'react-icons/fa'

const Email = ({id, email }) => {
    return (
      <div className={styles.container}>
        <Link to={`/emails/${id}`} className={styles.email}>
          <div className={styles.isRead}>{!email.isRead && <FaCircle />}</div>
          <h4>{email.from}</h4>
          <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
          <span>{formatTimeStamp(email.time)}</span>
        </Link>
      </div>
    );
  };
  
  export default Email;