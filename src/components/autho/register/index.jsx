import './register.css'
import { useState } from 'react'
import url from '../../url'
import { Link } from 'react-router-dom'

const Register = () => {

    const [fullName, setFullName] = useState('')
    const [errorFullName, setErrorFullName] = useState('')
    const [email,setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [backendError, setBackendError] = useState('')

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (fullName && email && password) {

            const data = {
                fullName : fullName,
                email : email,
                password : password
            }

            const response = await fetch(`${url}/auth/register`,{
                method : "POST",
                headers : {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const res = await response.json()
            console.log(res)
            
           
            if (response.ok){
                console.log(res)
            }else{
                console.log(res.error)
                setBackendError(res.error)
            }
            

        }
        if (!fullName){
            setErrorFullName('Please enter the full name.')
        }
        if (!email){
            setErrorEmail('Please enter the email.')
        }
        if (!password){
            setErrorPassword('Please enter the password')
        }
    }


   

    return(
        <div className='register-top-container'>

            <form onSubmit={onFormSubmit} className='form-container-register'>
                <h2 className='heading-register'>Register</h2>
                <div className='input-container-register'>
                    <label htmlFor='fullName'>Full Name: -</label>
                    <input onChange={(e) => {
                        setFullName(e.target.value)
                    }} id="fullName"
                    onBlur={(e) => {
                        fullName === "" && setErrorFullName('Please enter the details')
                        
                    }}
                    className='input-register' value={fullName} type='text' placeholder='Full Name' />
                    {errorFullName && <p className='error-p-r'>{errorFullName}</p>}
                </div>
                <div className='input-container-register'>
                    <label htmlFor='email'>Email: -</label>
                    <input id='email' onChange={(e) => {
                        setEmail(e.target.value)
                    }} 
                    onBlur={(e) => {
                        email === "" && setErrorEmail('Please enter the details')
                        
                    }} className='input-register' value={email} type='email' placeholder='Email' />
                      {errorEmail && <p className='error-p-r'>{errorEmail}</p>}

                </div>
                <div className='input-container-register'>
                    <label htmlFor='password'>Password: -</label>
                    <input id='password' className='input-register'
                    
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                    onBlur={() => {
                        password === "" && setErrorPassword('Please enter the details')
                        
                    }}
                    
                    type='password' placeholder='Password' />
                    {errorPassword && <p className='error-p-r'>{errorPassword}</p>}

                </div>
                
                <button type='submit' className='button-register' >Register</button>
                {backendError && <p className='error-p-r'>{backendError}</p>}
                <p className='already-register'> <Link className='alredy-register' to='/login'> Already Registered? Login </Link></p>

            </form>

        </div>
    )

}

export default Register