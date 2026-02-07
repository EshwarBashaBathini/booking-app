import "./register.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassowrd] = useState("")

    const [errorUsername, setErrorUsername] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorMobile, setErrorMobile] = useState("")
    const [errorPassowrd, setErrorPassword] = useState("")
    const [errorAllFields, setErrorAllFields] = useState("")

    const navigate = useNavigate()





    const onRegisterForm = async (e) => {
        e.preventDefault()

        if (username && email && mobile && password) {
            

            const data = {
                id : uuidv4(),
                name : username,
                email : email,
                mobile: mobile,
                password : password
            }

            const response = await fetch("http://localhost:3000/register",{
                method : "POST",
                headers : {
                    'Content-type' : "application/json",
                },
                body : JSON.stringify(data)

            })
            console.log(data)
            const res = await response.json()


            console.log(response.ok)
            
            if (res.message !== "Email or Mobile is already existing"){
                console.log('Hii eshwar')

                console.log(res)
                navigate("/login")
            }else{
                setErrorAllFields(res.message)
                console.log(res)
            }
            

        } else if ((!username && !email && !mobile && !password)) {
            setErrorAllFields("*Please enter all Required Fields")


        } else {
            if (!username) {
                setErrorUsername("Please enter the username")
            }
            if (!email) {
                setErrorEmail("Please enter the email")
            }
            if (!mobile) {
                setErrorMobile("Please enter the mobile")
            }
            if (!password) {
                setErrorPassword("Please enter the password")
            }

        }




    }








    return (
        <div className="register-container">
            <form onSubmit={onRegisterForm} className="form-register">
                <h2 className="heading-r">Registration Form</h2>
                <div className="container-input-container">
                    <label className="lable-input">Name</label>
                    <input className="input-container-reg" onChange={(e) => {
                        e.target.value.trim() === "" ? "" :
                            setErrorUsername(""), setUsername(e.target.value), setErrorAllFields("")

                    }} placeholder="Name" type="text" />
                    {errorUsername && <p className="error-r">*{errorUsername}</p>}
                </div>
                <div className="container-input-container">
                    <label className="lable-input">Email</label>
                    <input className="input-container-reg" onChange={(e) => {
                        e.target.value.trim() === "" ? "" :
                            setErrorEmail(""), setEmail(e.target.value),setErrorAllFields("")

                    }} placeholder="Email" type="email" />
                    {errorEmail && <p className="error-r">*{errorEmail}</p>}
                </div>
                <div className="container-input-container">
                    <label className="lable-input">Phone Number</label>
                    <input className="input-container-reg" onChange={(e) => {
                        e.target.value.trim() === "" ? "" :
                            setErrorMobile(""), setMobile(e.target.value),setErrorAllFields("")

                    }} placeholder="Phone Number" type="number" />
                    {errorMobile && <p className="error-r">*{errorMobile}</p>}
                </div>
                <div className="container-input-container">
                    <label className="lable-input">Password</label>
                    <input className="input-container-reg" onChange={(e) => {
                        e.target.value.trim() === "" ? "" :
                            setErrorPassword(""), setPassowrd(e.target.value),setErrorAllFields("")

                    }} placeholder="Password"   type="password" />
                    {errorPassowrd && <p className="error-r">*{errorPassowrd}</p>}
                </div>
                <button className="register-btn" type="submit">Register Account </button>

                 {errorAllFields && <p className="error-r">*{errorAllFields}</p>}

                <p className='register-p' ><Link to="/login" >Already have a Account? Login</Link></p>
            </form>

        </div>
    )

}

export default Register