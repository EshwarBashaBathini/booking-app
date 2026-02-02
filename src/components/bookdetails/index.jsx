import "./bookdetails.css"

import Header from '../header'
import { IoMdAdd } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PersonList from "../personList"
import Footer from "../footer"

const data = {
    id: "1a2b3c4d",
    name: "John Doe",
    age: 28,
    nationality: "American",
    gender: "male",
    preference: "Upper"
};


const BookDetails = () => {
    const [userName, setUserName] = useState("")
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState("")
    const [nationality, setNationality] = useState("")
    const [berth, setBerth] = useState("")
    const [personsList, setPersonList] = useState([data])

    const [errorName, setErrorName] = useState(false)
    const [errorAge, setErrorAge] = useState(false)
    const [errorNat, setErrorNat] = useState(false)
    const [errorBerth, setErrorBerth] = useState(false)
    const [errorGen, setErrorGen] = useState(false)
    const [isEditing, setEditing] = useState("")

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






    return (
        <div>
            <Header />
            <div className="top-container">
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
                                        <PersonList details={eachPerson} onEdit={onEditBtn} onDelete={onDeleteBtn} key={eachPerson.id} />
                                    ))

                                    }
                                </ul>
                                <div className="travel-btm-container">
                                    <h2 className="heading-td">Traveller Details</h2>
                                    <form type="submit" onSubmit={onAddingPersons}  >
                                        <div className="input-container">
                                            <div className="input-container-t1">
                                                <input onChange={(e) => setUserName(e.target.value)} onBlur={(e) => e.target.value.trim() === "" ? setErrorName(true) : setErrorName(false)} value={userName} type="text" placeholder="Name of Traveller" className="input-t" />
                                                <hr />
                                                {errorName && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t2">
                                                <input onChange={() => setAge(e.target.value)} onBlur={(e) => e.target.value.trim() === "" ? setErrorAge(true) : setErrorAge(false)} value={age} placeholder="Age" type="number" className="input-t" />
                                                <hr />
                                                {errorAge && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t3">
                                                <select value={gender} onChange={(e) => setGender(e.target.value)} onBlur={(e) => e.target.value.trim() === "" ? setErrorGen(true) : setErrorGen(false)} className="input-t">
                                                    <option value="">Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>

                                                <hr />
                                                {errorGen && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <div className="input-container-t4">
                                                <input type="text" value={nationality} onBlur={(e) => e.target.value.trim() === "" ? setErrorNat(true) : setErrorNat(false)} onChange={(e) => setNationality(e.target.value)} placeholder="Nationality" className="input-t" />
                                                <hr />
                                                {errorNat && <p className="error-msg">* Please Enter the Details </p>}
                                            </div>
                                            <div className="input-container-t1">
                                                <select value={berth} onBlur={(e) => e.target.value.trim() === "" ? setErrorBerth(true) : setErrorBerth(false)} onChange={(e) => setBerth(e.target.value)} className="input-t">
                                                    <option value="">Berth Preference</option>
                                                    <option value="male">Upper</option>
                                                    <option value="female">Lower</option>
                                                    <option value="other">Side Lower</option>
                                                </select>


                                                <hr />
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
                            <div className="verification-container">
                                <div className="irctc">
                                    <input type="text" className="input-irctc" placeholder="Enter IRCTC User ID" />
                                    <hr />
                                </div>
                                <button type="button" className="save-btn">Verify</button>

                            </div>
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
                                    <input type="number" placeholder="Mobile Number" className="input-mobile" />
                                    <hr />
                                </div>
                                <div className="mobile-container">
                                    <input type="text" placeholder="Email" className="input-mobile" />
                                    <hr />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container1">
                        <div className="list-train">
                            <h2 className="boarding-name">Boarding Details</h2>

                            <div className="container2">
                                <h3 className="train-name">123 - eshwar</h3>

                                <p className="margin-class time-table">Class 2A & Tatkal Quota</p>

                            </div>
                            <div className="journey-container">
                                <div className="journey-details-from">
                                    <h3 className="margin-class">Today</h3>
                                    <p className="margin-class">23 <br />Ytr, Yesvantpur</p>
                                </div>
                                <div className="journey-time">
                                    <h3 className="margin-class">10 hrs</h3>
                                    <hr className="hr-time  dotted-line margin-class" />

                                </div>
                                <div className="journey-details-to">
                                    <h3 className="margin-class">tmmrw</h3>
                                    <p className="margin-class1">18 <br />Bng, Bangalore</p>
                                </div>
                            </div>
                            <button type="button" className="chne-boarding">Change Boarding Station</button>

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




