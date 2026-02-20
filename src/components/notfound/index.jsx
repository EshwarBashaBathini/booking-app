import './notfound.css'
import Header from '../header'
import {Link} from 'react-router-dom'

const NotFound = () => {
    
    return(
        <div>
            <Header />
            <div className='not-found-container'>
                <img src='https://res.cloudinary.com/dtc3rf1du/image/upload/v1771588070/ChatGPT_Image_Feb_20_2026_05_16_43_PM_a6tmqd.png' className='notfound-img' />
                {/* <h2>Not Found</h2>
                <button type='button'  className='return-btn'><Link className='return-btn' to='/'>Home</Link></button> */}
            </div>

        </div>
    )

}

export default NotFound