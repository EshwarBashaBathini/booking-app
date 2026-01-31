import "./header.css"
import { Link } from "react-router-dom"


const Header = () => {

    return(
        <header>
            <h3 > <Link className="heading" to= "/">Metro<span className="span-color">way</span></Link></h3>
            <nav>
                <ul className="nav-ul">
                    <li className="booking">My Booking</li>
                    <li className="login">Login / Sign in</li>
                </ul>
            </nav>

        </header>
    )

}

export default Header




