import React from "react";
import styles from "./EmailBox.module.css"
import { formatTimeStamp } from "../store/HelperFunctions";
import { Link } from "react-router-dom";
import { FaCircle} from 'react-icons/fa'
import { useSelector } from "react-redux";
import { deleteMail } from "../store/MailApi";

const Email = ({id, email }) => {

  const userEmail= useSelector(state=> state.auth.userEmail)

  const deleteMailHandler=async()=>{
    const res = await deleteMail({
      email: userEmail,
      id: id,
    });
    if(res.status== 200){
      alert("Your Mail is Deleted");
    }else{
      alert("Request Failed!!!!")
    }




  }
    return (
      <div className={styles.container}>
        <Link to={`/emails/${id}`} className={styles.email}>
          <div className={styles.isRead}>{!email.isRead && <FaCircle />}</div>
          <h4>{email.from}</h4>
          <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
          <span>{formatTimeStamp(email.time)}</span>
        </Link>
        <button onClick={deleteMailHandler}>Delete</button>
      </div>
    );
  };
  
  export default Email;