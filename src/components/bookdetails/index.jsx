import "./bookdetails.css"

import Header from '../header'
import { IoMdAdd } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PersonList from "../personList"
import Footer from "../footer"
import Cookies from "js-cookie"

const data = {
    id: "1a2b3c4d",
    name: "John Doe",
    age: 28,
    nationality: "American",
    gender: "male",
    preference: "Upper"
};


const BookDetails = (props) => {
    const [userName, setUserName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [nationality, setNationality] = useState("")
    const [berth, setBerth] = useState("")
    const [personsList, setPersonList] = useState([data])
    const navigate = useNavigate()

    const [errorName, setErrorName] = useState(false)
    const [errorAge, setErrorAge] = useState(false)
    const [errorNat, setErrorNat] = useState(false)
    const [errorBerth, setErrorBerth] = useState(false)
    const [errorGen, setErrorGen] = useState(false)
    const [isEditing, setEditing] = useState("")


    const [isIrctcVerified, setIrctcVerified] = useState(false)
    const [irctcContent, setIrctcContent] = useState("")
    const [errorIrctc, setIrctcError] = useState(false)

    const [mobileNum, setMobileNum] = useState("")
    const [email, setEmail] = useState("")

    const [errorMobile, setErrorMobile] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    useEffect(() => {
        const cookiesss = Cookies.get('auth_token')
    console.log(cookiesss)
    if (!cookiesss){
        navigate('/login')
    }

    },[])


    const { state } = useLocation()
    const { selectedClass, trainDetails } = state || {};
    const { trainNumber, trainName, journey, from = {}, to, } = trainDetails
    const { id, quota, price } = selectedClass[0]


    const totalGst = (price * personsList.length) * 0.18

    const totalPrice = (price * personsList.length) + totalGst











    const onAddingPersons = (e) => {
        e.preventDefault();
        console.log("triggered")
        if (userName !== "" && age !== 0 && nationality !== "" && gender !== "" && berth !== "") {

            if (isEditing) {

                setPersonList(PrevList =>
                    PrevList.map(person =>
                        person.id === isEditing ? { ...person, name: userName, age, nationality, gender, preference: berth }
                            : person


                    )

                );

                setEditing(null)
                setAge(null)
                setBerth("")
                setGender("")
                setUserName("")
                setNationality("")


            } else {
                console.log("hii")

                const person = {
                    id: uuidv4(),
                    name: userName,
                    age: age,
                    nationality: nationality,
                    gender: gender,
                    preference: berth

                }

                setPersonList(prevsList => [...prevsList, person])
                setAge(null)
                setBerth("")
                setGender("")
                setUserName("")
                setNationality("")

            }


        }

    }

    const onDeleteBtn = (id) => {
        const filterDate = personsList.filter(item => (
            item.id !== id
        ))
        setPersonList(filterDate)
    }

    const onEditBtn = (person) => {
        setEditing(person.id)
        setAge(person.age)
        setUserName(person.name)
        setNationality(person.nationality)
        setGender(person.gender)
        setBerth(person.preference)
    }

    const onPreviousBtn = () => {
        navigate("/book")
    }

    const onVerifiedAccount = (e) => {
        e.preventDefault()
        if (irctcContent === "") {
            setIrctcError(true)
            setIrctcVerified(false)
        } else {
            setIrctcError(false)
            setIrctcVerified(true)
        }
    }

    const isVerified = isIrctcVerified ? "verified-btn" : ""
    const isContent = isIrctcVerified ? "Verified" : "Verify"

    const onNextBtn = () => {
        if (isIrctcVerified && mobileNum && email) {
            console.log("Hi User Successfully Completed the Verification")
            navigate(`/payment/${trainNumber}/checkout`, {
                state: {
                    trainDetails, selectedClass, totalPrice, personsList, mobileNum, email, totalGst,
                }
            })
        } else if (mobileNum === "" && email === "") {
            setErrorEmail(true)
            setErrorMobile(true)

        } else if (mobileNum === "") {
            setErrorMobile(true)
        } else if (email === "") {
            setErrorMobile(true)
        } else {
            setIrctcError(true)
        }
    }



    return (
        <div>
            <Header />
            <div className="top-container-css">
                <h2 className="review">Review your booking</h2>
                <div className="review-containers">
                    <div className="container1" >
                        <div className="travel-container">
                            <div className="travel-container-top">
                                <div className="travel-details">
                                    <h2 className="heading-t">Traveller Details</h2>
                                    <p className="para-t">As per IRCTC Guidelines, you can book up to 4 travellers at once</p>
                                </div>
                                <IoMdAdd size={20} color="#0578FF" fontWeight={800} />
                            </div>
                            <div>
                                <ul className="ul-person-list">
                                    {personsList.map(eachPerson => (
                                        <PersonList  details={eachPerson} onEdit={onEditBtn} onDelete={onDeleteBtn} key={eachPerson.id} />
                                    ))

                                    }
                                </ul>
                                <div className="travel-btm-container">
                                    <h2 className="heading-td">Traveller Details</h2>
                                    <form type="submit" onSubmit={onAddingPersons}  >
                                        <div className="input-container1">
                                            <div className="input-container-t1">
                                                <input onChange={(e) => { setUserName(e.target.value), setErrorName(false) }} onBlur={(e) => e.target.value.trim() === "" ? setErrorName(true) : setErrorName(false)} value={userName} type="text" placeholder="Name of Traveller" className="input-t" />
                                                <hr className="hr-line" />
                                                {errorName && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t2">
                                                <input onChange={(e) => { setAge(e.target.value), setErrorAge(false) }} onBlur={(e) => e.target.value.trim() === "" ? setErrorAge(true) : setErrorAge(false)} value={age} placeholder="Age" type="number" className="input-t" />
                                                <hr className="hr-line" />
                                                {errorAge && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t3">
                                                <select value={gender} onChange={(e) => { setGender(e.target.value), setErrorGen(false) }} onBlur={(e) => e.target.value.trim() === "" ? setErrorGen(true) : setErrorGen(false)} className="input-t">
                                                    <option value="">Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>

                                                <hr className="hr-line" />
                                                {errorGen && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <div className="input-container-t4">
                                                <input type="text" value={nationality} onBlur={(e) => e.target.value.trim() === "" ? setErrorNat(true) : setErrorNat(false)} onChange={(e) => {
                                                    setNationality(e.target.value), setErrorNat(false)
                                                }} placeholder="Nationality" className="input-t" />
                                                <hr className="hr-line" />
                                                {errorNat && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t1">
                                                <select value={berth} onBlur={(e) => e.target.value.trim() === "" ? setErrorBerth(true) : setErrorBerth(false)} onChange={(e) => { setErrorBerth(false), setBerth(e.target.value) }} className="input-t">
                                                    <option value="">Berth Preference</option>
                                                    <option value="male">Upper</option>
                                                    <option value="female">Lower</option>
                                                    <option value="other">Side Lower</option>
                                                </select>


                                                <hr className="hr-line" />
                                                {errorBerth && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <button type="submit" className="save-btn">Save</button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                        <div className="travel-container">
                            <div className="irctc-container">
                                <h2 className="irctc-name" >IRCTC Login</h2>
                                <p className="irctc-p">Password is required later to complete booking</p>
                            </div>
                            <form onSubmit={onVerifiedAccount} className="verification-container">
                                <div className="irctc">
                                    <input type="text" onChange={(e) => {
                                        setIrctcContent(e.target.value);
                                        setIrctcVerified(false);
                                        setIrctcError(false);
                                    }} onBlur={(e) => e.target.value.trim() === "" ? setIrctcError(true) : setIrctcError(false)} className="input-irctc" placeholder="Enter IRCTC User ID" />
                                    <hr className="hr-line" />
                                    {errorIrctc && <p className="error-msg">*Please Verify the IRCTC Account. </p>}
                                </div>
                                <button type="submit" className={`save-btn ${isVerified}`}>{isContent}</button>

                            </form>
                            <div className="irctc-cred-container">
                                <p className="irctc-name-link">Create IRCTC ID </p>
                                <p className="irctc-name-link">Forgot User ID?</p>

                            </div>

                        </div>
                        <div className="travel-container">
                            <div className="irctc-container">
                                <h2 className="irctc-name">Contact Details</h2>
                                <p className="irctc-p">Your ticket info will be sent here</p>

                            </div>
                            <div className="contact-container">
                                <div className="mobile-container">
                                    <input type="number" onChange={(e) => { setMobileNum(e.target.value.trim()), setErrorMobile(false) }} onBlur={(e) => e.target.value.trim() === "" ? setErrorMobile(true) : setErrorMobile(false)} placeholder="Mobile Number" className="input-mobile" />
                                    <hr className="hr-line" />
                                    {errorMobile && <p className="error-msg">*Please enter mobile number. </p>}

                                </div>
                                <div className="mobile-container">
                                    <input type="email" onChange={(e) => { setEmail(e.target.value.trim()), setErrorEmail(false) }} onBlur={(e) => e.target.value.trim() === "" ? setErrorEmail(true) : setErrorEmail(false)} placeholder="Email" className="input-mobile" />
                                    <hr className="hr-line" />
                                    {errorEmail && <p className="error-msg">*Please enter email address. </p>}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container22">
                        <div className="list-train">
                            <h2 className="boarding-name">Boarding Details</h2>
                            <div className="chng-container-book">
                                <div className="container218">
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
                                <button type="button" className="chne-boarding">Change Boarding Station</button>
                            </div>
                        </div>
                        <hr className="hr-m" />
                        <div className="offer-container">
                            <h2 className="offer-name">Offers</h2>
                            <div className="offer-container1">
                                <div className="offer-container2">
                                    <BiSolidOffer color="#0578FF" size={20} />
                                    <h2 className="offer-para">50% off up to ₹100 | Use code BOOKNOW</h2>
                                </div>
                                <button className="apply" type="button" >Apply</button>
                            </div>
                            <div className="offer-container1">
                                <div className="offer-container2">
                                    <BiSolidOffer color="#0578FF" size={20} />
                                    <h2 className="offer-para">20% off | Use code FIRSTTIME
                                    </h2>
                                </div>
                                <button className="apply" type="button" >Apply</button>
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
                                    <hr className="hr-line" />

                                </div>

                            </div>


                        </div>
                        <div className="apply-container-border">
                            <div className="billing-container-1">
                                <h2 className="bill-head">Bill details</h2>
                                <div className="bill-container-box">
                                    <div className="bill-details1">
                                        <p className="bill-name-p" >Base Ticket Fare</p>
                                        <p  className="bill-name-p">₹{price}.00</p>
                                    </div>
                                    <div className="bill-details1">
                                        <p  className="bill-name-p" >Total Travellers</p>
                                        <p  className="bill-name-p">{personsList.length}</p>
                                    </div>
                                    <div className="bill-details1">
                                        <p  className="bill-name-p" >CGST & SGST</p>
                                        <p  className="bill-name-p">₹{totalGst}.00</p>
                                    </div>

                                </div>

                            </div>
                            <div className="bill-amount">
                                <h2 className="bill-amount-head">Total Charge</h2>
                                <h2 className="bill-amount-head">₹{totalPrice}.00</h2>
                            </div>

                        </div>
                        <div className="last-container">
                            <p className="last-offer-p">Discounts, offers and price concessions will be applied later during payment</p>
                            <button type="button" onClick={onNextBtn} className="book-btn">Book</button>
                            <button type="button" onClick={onPreviousBtn} className="cancel-btn">Cancel</button>
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

export default BookDetails




