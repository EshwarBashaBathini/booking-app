import './login.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const Login = () => {

    const [mobile, setmobile] = useState("")
    const [isOtpSended, setOtpSend] = useState(false)
    const [otp, setOTP] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const onMobileNumber = (e) => {
        if (e.target.value.trim() === "") {
            console.log("hii")
            setmobile(e.target.value)
        } else {
            setmobile(e.target.value)
        }
    }

    const onsubmitBtn = async (e) => {
        e.preventDefault()

        if (mobile && otp ){

            const data = {
                email : mobile,
                password : otp
            }
            const response = await fetch("http://localhost:3000/login", {
                method : "POST",
                headers: {
                    'Content-type': "application/json",
                },
                body : JSON.stringify(data)
            })

            const res = await response.json()
            if (response.ok){
                if (res.message !== "Login successfull"){
                    setMessage(res.message)
                }else{
                    Cookies.set("auth_token", res.token, {expires: 1})
                    navigate("/")
                }
            }
        }
        

    }

const onOTPChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.trim()) {
        setOTP(e.target.value);

    }
};




return (
    <div className='disply-top-container'>
        <form className='form-login' onSubmit={onsubmitBtn}>
            <h1 className='login-name'>Login</h1>
            <input onChange={onMobileNumber} type='text' value={mobile} className='input-mobile-1' placeholder='Mobile Number' />
            <input onChange={onOTPChange} type='password' className='input-mobile-2' placeholder='Password' />
            <button className='submit-btn' type='submit'>Sumit   </button>
            {message && <p className='error-p'>{message}</p>}
            <p className='register-p'><Link to='/register' className='register-p'> Register new account.</Link> </p>
        </form>
    </div>
)

}

export default Login