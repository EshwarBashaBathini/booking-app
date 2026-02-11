import './login.css'
import { useState } from 'react'
import url from '../../url'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onLoginSubmit = async (e) => {
        e.preventDefault()

        if (email && password){

            const data = {
                email : email,
                password : password
            }
            
            const response = await fetch(`${url}/auth/login`,{
                method: "POST",
                headers : {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const res = await response.json()
            if (response.ok){
                const token = res.token

                if (token){
                    Cookies.set('auth_token', token, {expires:1})
                    navigate('/')
                    
                }
            }
        }
    }
    
    return(
        <div className='login-top-container'>
            <form onSubmit={onLoginSubmit} className='form-container-login'>
                <h3>Login</h3>
                <div className='input-container-register'>
                    <label htmlFor='email'>Email: -</label>
                    <input id='email' onChange={(e) => {
                        setEmail(e.target.value.trim())
                    }} 
                   className='input-register' value={email} type='email' placeholder='Email' />
                </div>
                <div className='input-container-register'>
                    <label htmlFor='email'>Password: -</label>
                    <input id='email' onChange={(e) => {
                        setPassword(e.target.value.trim())
                    }} 
                   className='input-register' value={password} type='password' placeholder='Password' />

                </div>
                <button className='login-btn'  type='submit'>Login</button>

            </form>

        </div>
    )

}

export default Login 