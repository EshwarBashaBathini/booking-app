import "./header.css"
import { Link } from "react-router-dom"
import Cookies from "js-cookie";




const Header = () => {

    const cookiess = Cookies.get("auth_token")
   

   
    const onLogoutBtn = () => {
   
        Cookies.remove('auth_token')

    }


    return(
        <header>
            <h3 > <Link className="heading" to= "/">Metro<span className="span-color">way</span></Link></h3>
            {/* <h3 className="heaidng">Metro<span className="span-color">way</span></h3> */}
            <nav>
                <ul className="nav-ul">
                    <li className="booking">My Booking</li>
                    {!cookiess  && <li className="login"><Link to="/login"> Login / Sign in</Link></li>}
                    {cookiess && <li onClick={onLogoutBtn} className="login">Logout</li>}
                </ul>
            </nav>

        </header>
    )

}

export default Header




