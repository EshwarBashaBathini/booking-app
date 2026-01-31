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
            <div className="footer-btm">
                <ul className="ul-footer">
                    <li className="cursor-btn">About us</li>
                    <li  className="cursor-btn">Mobile</li>
                    <li className="cursor-btn">Privacy</li>
                    <li className="cursor-btn">Terms of use</li>
                    <li className="cursor-btn">Career</li>
                    <li className="cursor-btn">Customer Service</li>
                </ul>
                <ul className="ul-icons">
                    <li> <button className="button-icons"><FiFacebook color="white" size={20} /></button></li>
                    <li><button className="button-icons"><IoLogoInstagram color="white" size={20} /></button>    </li>
                    <li><button className="button-icons"><FaXTwitter color="white" size={20} /></button></li>
                </ul>

            </div>
        </footer>
    )
}

export default Footer