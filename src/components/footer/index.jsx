import "./footer.css"
import { FiInstagram, FiSend } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {

    return (
        <footer >
            <div className="footer-container">
                <h3 className="footer-name">Metro<span className="span-way">way</span></h3>
                <div className="container-p">
                    <div>
                        <h2 className="margin-ph" >Planning your next trip?</h2>
                        <p className="margin-ph" >Subscribe to our newsletter. Get the latest travel trends & deals!</p>
                    </div>
                    <div className="sec-container">
                        <div className="email">
                            <input type="text" className="input-email" placeholder="Enter Email ID" />
                            <FiSend />
                        </div>
                        <hr />

                    </div>
                </div>
            </div>
            <div className="footer-btm-top-container">
            <div className="footer-btm">
                <div className="ul-footer">
                    <p className="cursor-btn">About us</p>
                    <p  className="cursor-btn">Mobile</p>
                    <p className="cursor-btn">Privacy</p>
                    <p className="cursor-btn">Terms of use</p>
                    <p className="cursor-btn">Career</p>
                    <p className="cursor-btn">Customer Service</p>
                </div>
               

            </div>
             <div>
                    <ul className="ul-icons">
                    <li className="icons-li"> <button className="button-icons"><FiFacebook  className="footer-icons" /></button></li>
                    <li className="icons-li"><button className="button-icons"><IoLogoInstagram className="footer-icons" /></button>    </li>
                    <li className="icons-li"><button className="button-icons footer-icons"><FaXTwitter  className="footer-icons" /></button></li>
                </ul>
                </div>
                </div>
        </footer>
    )
}

export default Footer