import "./booked.css"
import Header from "../header"
import Footer from "../footer"
import { useLocation, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

const BookedStatus = () => {
    const { state } = useLocation()
    const { trainDetails, personsList, totalGst, email, totalfare } = state
    const { trainNo, name, source, destination, runsOnDays, fromStation = {}, toStation = {}, travelDuration, fares } = trainDetails
    const navigate = useNavigate()

    const onBookAnotherTicket = () => {
        navigate("/book")

    }

    useEffect(() => {

        const token = Cookies.get('auth_token')
        if (token === "") {
            navigate('/login')
        }

    }, [])



    return (
        <div>
            <Header />
            <div className="booked-top-container">
                <div className="success-container">
                    <img src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1770290971/Vector_yugjjd.png" className="success-img" alt="success-img" />
                    <div className="success-top-container">
                        <p className="cong-name">Congratulations! You have successfully booked tickets</p>
                        <p className="cong-msg">please carry ERS / VRM / SMS / Mail sent to your contact details, along with a relavant ID proof while travelling</p>
                    </div>
                </div>
                <div className="success-container-2">

                    <div className="list-train-sucess">
                        <div className="container-sucess01" >
                            <div className="pnr-container">
                                <p className="trans-name">PNR No: 1234567890</p>
                                <p className="trans-name">Transaction ID : 351511859256378</p>

                            </div>
                            <p className="train-name-sucess">{trainNo}-{name}</p>
                            <div className="journey-container-success">
                                <div className="journey-details-from">
                                    <h3 className="margin-class">{source}</h3>
                                    <p className="margin-class">{fromStation.dep} <br />{fromStation.code}, {fromStation.name}</p>
                                </div>
                                <div className="journey-time">
                                    <h3 className="margin-class">{travelDuration}</h3>
                                    <hr className="hr-time  dotted-line margin-class" />

                                </div>
                                <div className="journey-details-to">
                                    <h3 className="margin-class">{destination}</h3>
                                    <p className="margin-class1">{toStation.arr} <br />{toStation.code}, {fromStation.name}</p>
                                </div>

                            </div>
                        </div>
                        <div className="ticket-details">
                            <p className="ticket-name">E-Tickets will be sent to:</p>
                            <p className="ticket-para">{personsList[0].name}(primary) <br /> {email}</p>
                        </div>
                        <div className="travel-details-person-success">
                            <h2 className="head-traveller">Traveller Details</h2>
                            <ul className="persons-ul">
                                {personsList.map(eachPerson => (
                                    <li className="passenger-list-success">
                                        <p className="success-name">{eachPerson.name}</p>
                                        <div className="person-details-success">
                                            <div className="seat-container-margin">
                                                <p className="age-container">{`Age: ${eachPerson.age} Yrs `} </p>
                                                <p className="age-container">{` Gender: ${eachPerson.gender}`}</p>
                                            </div>
                                            <div >
                                                <p className="seat-container">Booking Status : Confirmed (CNF)</p>
                                                <p className="seat-container">{`Seat/Coach no. : 44(${eachPerson.preference} berth), A1`}</p>
                                            </div>

                                        </div>
                                    </li>
                                ))}

                            </ul>

                        </div>
                        <div className="total-price-success-container">
                            <h3 className="price-name-success">Total Fare</h3>
                            <h3 className="price-name-success">{`₹${totalfare}.00`}</h3>
                        </div>




                    </div>
                    <div className="qr-scanner-container">
                        <div className="img-container">
                            <img src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1770295005/image_15_mxc3at.png" className="qr-img" alt="QR-img" />
                        </div><p className="scan-p">Scan the code to view in any device</p>
                        <button className="success-btn-01" >Print ticket (English)</button>
                        <button className="success-btn-01">Print ticket (Hindi)</button>
                        <button onClick={onBookAnotherTicket} className="success-btn-02" >Book another ticket</button>
                        <button className="success-btn-02">Download Ticket</button>



                    </div>
                </div>
                <div className="privacy-container">
                    <p className="text-p">Cancellation Policy</p>
                    <p className="text-p">Terms & Conditions</p>
                    <p className="text-p">Travel Insurance</p>

                </div>

            </div>
            <Footer />
        </div>
    )

}


export default BookedStatus
