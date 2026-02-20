import { Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

const PublicRoute = ({children}) => {
    
    const token = Cookies.get('auth_token')
    if (token){
        <Navigate to='/' replace />
    }
    return children
}

export default PublicRoute