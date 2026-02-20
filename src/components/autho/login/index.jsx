import './login.css'
import { useState, useEffect } from 'react'
import url from '../../url'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [errorBackend, setErrorBackend] = useState('')


    useEffect(() => {
        
    const token  = Cookies.get('auth_token')
    if (token){
        navigate('/')
    }
    },[])

    const onLoginSubmit = async (e) => {
        e.preventDefault()
        setLoader(false)


        if (email && password) {
            setLoader(true)

            const data = {
                email: email,
                password: password
            }

            const response = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const res = await response.json()
            console.log(res)
            if (response.ok) {
                const token = res.token


                if (token) {
                    setLoader(false)
                    Cookies.set('auth_token', token, { expires: 1 })
                    navigate('/')

                }
            } else {
                setLoader(false)
                console.log(res.error)
                setErrorBackend(res.error)
            }
        }
        if (!email) {
            setErrorEmail('Please enter the email')
        }
        if (!password) {
            setErrorPassword('Please enter the passowrd')
        }
    }

    return (
        <div className='login-top-container'>
            <form onSubmit={onLoginSubmit} className='form-container-login'>
                <h3>Login</h3>
                <div className='input-container-register'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' disabled={loader} onChange={(e) => {
                        setEmail(e.target.value.trim()),
                            setErrorEmail(''),setErrorBackend('')
                    }}
                        className='input-register' onBlur={(e) => e.target.value.trim() === "" && setErrorEmail('Please enter the details')} value={email} type='email' placeholder='Email' />
                    {errorEmail && <p className='error-p-r'>{errorEmail}</p>}
                </div>

                <div className='input-container-register'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' disabled={loader} onChange={(e) => {
                        setPassword(e.target.value),
                            setErrorPassword(''),
                            setErrorBackend('')
                    }}
                        className='input-register' onBlur={(e) => e.target.value.trim() === "" && setErrorPassword('Please enter the details')} value={password} type='password' placeholder='Password' />
                    {errorPassword && <p className='error-p-r'>{errorPassword}</p>}
                </div>
                <button className='login-btn' type='submit'>{loader ? 'Loading...' : "login"}</button>
                {errorBackend && <p className='error-p-r'>{errorBackend}</p>}

            </form>

        </div>
    )

}

export default Login 