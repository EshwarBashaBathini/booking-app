import "./payment.css"
import { useLocation } from "react-router-dom"
import Header from "../header"
import { TbCoinRupeeFilled } from "react-icons/tb";
import { MdArrowForwardIos } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Footer from "../footer"
import { useEffect } from "react";
import Cookies from "js-cookie"



const paymentOptions = [
    {
        id: "upi",
        title: "UPI Payment",
        description: "Pay instantly with UPI Apps",
        methods: [
            "Google Pay",
            "PhonePe",
            "Paytm",
            "BHIM"
        ]
    },
    {
        id: "card",
        title: "Credit / Debit Card",
        description: "Visa, Mastercard, Amex, Rupay and more",
        cardsAccepted: [
            "Visa",
            "Mastercard",
            "Rupay",
            "American Express"
        ]
    },
    {
        id: "paylater",
        title: "Paylater",
        description: "LazyPay, Simpl, ZestMoney, ICICI PayLater, HDFC Flexipay",
        providers: [
            "LazyPay",
            "Simpl",
            "ZestMoney",
            "ICICI PayLater",
            "HDFC Flexipay"
        ]
    },
    {
        id: "netbanking",
        title: "Net Banking",
        description: "We support all major banks",
        banks: [
            "SBI",
            "HDFC Bank",
            "ICICI Bank",
            "Axis Bank",
            "Kotak Mahindra Bank"
        ]
    },
    {
        id: "wallets",
        title: "Mobile Wallets",
        description: "Amazon Pay, Mobikwik, Payzapp, PayPal",
        wallets: [
            "Amazon Pay",
            "Mobikwik",
            "Payzapp",
            "PayPal"
        ]
    }
];


const Payment = (props) => {

    const { state } = useLocation()
    const { trainDetails, selectedClass, totalPrice, personsList, mobileNum, totalGst, email } = state
    const { trainNumber, trainName, journey, from = {}, to, } = trainDetails
    const { id, quota, price } = selectedClass[0]
    const navigate = useNavigate()
    console.log(personsList)


    const onBookNavigation = (id) => {
        console.log(id)
        navigate(`/payment/${trainNumber}/booked/${id}`, {
            state: {
                trainDetails, personsList, totalGst, email, totalPrice
            }

        })
    }
    useEffect(() => {
        const cookiesss = Cookies.get('auth_token')
        console.log(cookiesss)
        if (!cookiesss) {
            navigate('/login')
        }

    }, [])






    return (
        <div>
            <Header />
            <div className="top-container-payment">
                <h1 className="confirm-head">Pay <span className="confirm-price"> ₹{totalPrice}</span> to confirm booking</h1>
                <div className="payment-containers">
                    <div className="payment-container1">
                        <div className="list-train-1">
                            <div className="container-bbb" >
                                <h2 className="boarding-name">Boarding Details</h2>

                                <div className="container2">
                                    <h3 className="train-name">{trainNumber}-{trainName}</h3>

                                    <p className="margin-class time-table">Class {selectedClass[0].class} & {quota} Quota</p>

                                </div>
                                <div className="journey-container">
                                    <div className="journey-details-from">
                                        <h3 className="margin-class">{journey.startDate}</h3>
                                        <p className="margin-class">{from.departureTime} <br />{from.stationCode}, {from.stationName}</p>
                                    </div>
                                    <div className="journey-time">
                                        <h3 className="margin-class">{journey.duration}</h3>
                                        <hr className="hr-time  dotted-line margin-class" />

                                    </div>
                                    <div className="journey-details-to">
                                        <h3 className="margin-class">{journey.endDate}</h3>
                                        <p className="margin-class1">{to.arrivalTime} <br />{to.stationCode}, {from.stationName}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="travel-details-person">
                                <h2 className="head-traveller">Traveller Details</h2>
                                <ul className="persons-ul">
                                    {personsList.map(eachPerson => (
                                        <li className="person-list">
                                            <p>{eachPerson.name}</p>
                                            <p className="option-text">{eachPerson.age}</p>
                                            <p className="option-text">{eachPerson.gender}</p>
                                            <p className="option-text">{eachPerson.preference} Bearth</p>

                                        </li>
                                    ))}

                                </ul>

                            </div>
                            <div className="ticket-details">
                                <p className="ticket-name">E-Tickets will be sent to:</p>
                                <p className="ticket-para">{personsList[0].name}(primary) <br /> {email}</p>
                            </div>



                        </div>
                        <div className="payment-container-list">
                            <p className="payment-header">All Payment Options</p>
                            <ul className="ul-payment-list">
                                {paymentOptions.map(eachOption => (
                                    <li key={eachOption.id} onClick={() => onBookNavigation(eachOption.id)} className="option-list">
                                        <div className="container-upi">
                                            <TbCoinRupeeFilled size={40} />
                                            <div className="upi-description">
                                                <p>{eachOption.title}</p>
                                                <p>{eachOption.description}</p>
                                            </div>
                                        </div>
                                        <MdArrowForwardIos size={15} />


                                    </li>
                                ))}

                            </ul>
                        </div>

                    </div>
                    <div className="payment-container2">
                        <div className="offer-container">
                            <h2 className="offer-name">Offers</h2>
                            <div className="offer-container1">
                                <div className="offer-container2">
                                    <BiSolidOffer color="#0578FF" size={20} />
                                    <h2 className="offer-para">50% off up to ₹100 | Use code BOOKNOW</h2>
                                </div>
                                {/* <button className="apply" type="button" >Apply</button> */}
                            </div>
                            <div className="offer-container1">
                                <div className="offer-container2">
                                    <BiSolidOffer color="#0578FF" size={20} />
                                    <h2 className="offer-para">20% off | Use code FIRSTTIME
                                    </h2>
                                </div>
                                {/* <button className="apply" type="button" >Apply</button> */}
                            </div>

                        </div>
                        <div className="apply-container-border">
                            <div className="apply-code-container">
                                <div className="apply-container">
                                    <BiSolidOffer color="#0578FF" size={25} />
                                    <h2 className="apply-name">Apply Code</h2>
                                </div>
                                <div className="apply-code-input-container">
                                    <input className="input-apply" placeholder="Enter code" type="text" />
                                    <hr />

                                </div>

                            </div>


                        </div>
                        <div className="apply-container-border">
                            <div className="billing-container-1">
                                <h2 className="bill-head">Bill details</h2>
                                <div className="bill-container-box">
                                    <div className="bill-details1">
                                        <p >Base Ticket Fare</p>
                                        <p>₹{price}.00</p>
                                    </div>
                                    <div className="bill-details1">
                                        <p >Total Travellers</p>
                                        <p>{personsList.length}</p>
                                    </div>
                                    <div className="bill-details1">
                                        <p >CGST & SGST</p>
                                        <p>₹{totalGst}.00</p>
                                    </div>

                                </div>

                            </div>
                            <div className="bill-amount">
                                <h2 className="bill-amount-head">Total Charge</h2>
                                <h2 className="bill-amount-head">₹{totalPrice}.00</h2>
                            </div>

                        </div>
                        <div className="last-container">

                            <button type="button" onClick={() => navigate(-1)} className="cancel-btn">Cancel</button>
                        </div>
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

export default Payment