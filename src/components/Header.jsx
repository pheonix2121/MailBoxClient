import { Link } from "react-router-dom";
import classes from "./Header.module.css"

const Header =()=>{

    return(
        <div>
            <nav className={classes.nav}>
            <Link to="/inbox">Inbox</Link><br/>
            <Link to="/sent">Sent</Link><br/>
            <Link to="/draft">Draft</Link>
            </nav>
        </div>
    )

}

export default Header ;