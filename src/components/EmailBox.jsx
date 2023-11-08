import React from "react";
import styles from "./EmailBox.module.css"
import { formatTimeStamp } from "../store/HelperFunctions";
import { Link } from "react-router-dom";
import { FaCircle} from 'react-icons/fa'
import { useSelector } from "react-redux";
import { deleteMail } from "../store/MailApi";

const Email = ({id, email, sent }) => {

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
         <Link to={sent? `/sent/${id}`:`/emails/${id}`} className={styles.email}>
        <div className={styles.isRead}>{!email.isRead && !sent && <FaCircle />}</div>
        <h4>{sent? email.to : email.from}</h4>
          <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
          <span>{formatTimeStamp(email.time)}</span>
        </Link>
        <div className={styles.delete}>{!sent && <button onClick={deleteMailHandler}>Delete</button>}</div>
      </div>
    );
  };
  
  export default Email;