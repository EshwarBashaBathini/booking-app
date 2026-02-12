import "./header.css"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import { CgProfile } from "react-icons/cg";




const Header = () => {

    const token = Cookies.get('auth_token')

    return (
        <header>
            <h3 > <Link className="heading" to="/">Metro<span className="span-color">way</span></Link></h3>
            {/* <h3 className="heaidng">Metro<span className="span-color">way</span></h3> */}
            <nav>
                <ul className="nav-ul">
                    <li className="booking">My Booking</li>
                    {token ? (<><li className="login">
                        <Link to='/login' className="login"> Logout</Link>
                    </li>
                      <li> <CgProfile size={25} />   </li>
                    
                    
                    </>) : <li className="login">
                        <Link to='/login' className="login"> Login / Sign in</Link>
                    </li>
                  

                    
                }
                </ul>
            </nav>

        </header>
    )

}

export default Header




