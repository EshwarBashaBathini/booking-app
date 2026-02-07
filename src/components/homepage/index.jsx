import "./homepage.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Footer from "../footer";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const HomePage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [sourcePlace, setSourcePlace] = useState('')
    const [destinationPlace, setDestinationPlace] = useState('')
    const [sourceError, setSourceError] = useState("")
    const [selectedDateError, setSelectedDateError] = useState("")
    const [destinationError, setDestinationError] = useState("")
    
    

    const navigate = useNavigate();  // Call useNavigate hook to get navigate function



    const onSourcePlace = (event) => {
        setSourcePlace(event.target.value)
        setSourceError("");
    }

    const onSourceBlur = (event) => {
        if (sourcePlace === "") {
            setSourceError("Please Enter the Source Place!..");
        }
    }

    const onDestinationPlace = (event) => {
        setDestinationPlace(event.target.value)
        setDestinationError("")
    }

    const onDestinationBlur = (event) => {
        if (event.target.value === "") {
            setDestinationError("Please Enter the Destination Place!..")
        }
    }

    const onDateBlur = (event) => {
        if (event.target.value === "") {
            setSelectedDateError("Please Enter Date")
        }
    }

    const handleChange = (date) => {
        setSelectedDate(date);
        setSelectedDateError("")
    };

    const onSubmitBtn = (event) => {
        event.preventDefault();
        // Resetting error messages before validation
        setSourceError('');
        setDestinationError('');
        setSelectedDateError('');

        if (selectedDate && sourcePlace && destinationPlace) {

            console.log("Hii, all details entered");
            navigate("/book");
            setSelectedDate(null)
            setDestinationPlace("")
            setSourcePlace("")
        } else if (!selectedDate && !sourcePlace && !destinationPlace) {
            console.log("Please enter all details");
            setDestinationError("Please Enter the Destination Place!..");
            setSelectedDateError("Please Select the Date!..");
            setSourceError("Please Enter the Source Place!..");
        } else {
            // Individual checks
            if (!selectedDate) {
                setSelectedDateError("Please Select the Date!..");
            }

            if (!destinationPlace) {
                setDestinationError("Please Enter the Destination Place!..");
            }

            if (!sourcePlace) {
                setSourceError("Please Enter the Source Place!..");
            }
        }
    };

   



    return (
        <div className="top-container">

            <div className="top-home-container" >

                <div className="first-container">

                    <h3 ><Link className="header-color" to="/">Metro<span className="span-color">way</span></Link></h3>

                    <div className="metro">
                        <div className="metro1">
                            <div className="travellers-box">

                                <p className="  para-h">Hello Travellers</p>

                                <h1 className="font-size">made your booking experience easy!</h1>
                            </div>
                            <p className="para-p">Train booking is a process of choosing and purchasing train seats online. It is an easy process but were are here to make it much better & simple.</p>

                            <form onSubmit={onSubmitBtn} className="search-container1">
                                <div className="search-container2">
                                    <div className="input-search">
                                        <input onChange={onSourcePlace} onBlur={onSourceBlur} value={sourcePlace} className="input-btn" type="search" placeholder="enter source place" />
                                        <hr className="hr-line" />
                                        <p className="error">{sourceError}</p>

                                    </div>
                                    <div className="input-search">
                                        <input className="input-btn" onBlur={onDestinationBlur} value={destinationPlace} onChange={onDestinationPlace} type="search" placeholder="enter destination place" />
                                        <hr className="hr-line" />
                                        <p className="error">{destinationError}</p>
                                    </div>
                                    <div className="input-search">
                                        <DatePicker
                                            onBlur={onDateBlur}
                                            selected={selectedDate}
                                            onChange={(date) => handleChange(date)}
                                            className="input-btn"
                                            minDate={new Date()}
                                            placeholderText="Select a date"
                                        />
                                        <hr className="hr-line" />
                                        <p className="error">{selectedDateError}</p>
                                    </div>

                                </div>
                                <button type="submit" className="search-btn">Search for trains</button>
                            </form>
                        </div>
                    </div>
                </div>

                <img className="img-size" src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1769759900/Rectangle_1_n8bus8.png" alt="train-image " />
            </div>
            <Footer />
        </div>
    )


}

export default HomePage