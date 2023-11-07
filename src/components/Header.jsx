import { Link } from "react-router-dom";
import classes from "./Header.module.css"
import { useSelector } from "react-redux";
const Header =()=>{
    const totalUnreadEmails = useSelector(state => state.auth.unReadEmails);
    return(
        <div>
            <nav className={classes.nav}>
            <Link className={classes.inbox} to="/inbox"><p>Inbox</p><span>{totalUnreadEmails}</span></Link><br/>
            <Link to="/sent">Sent</Link><br/>
            <Link to="/draft">Draft</Link>
            </nav>
        </div>
    )

}

export default Header ;