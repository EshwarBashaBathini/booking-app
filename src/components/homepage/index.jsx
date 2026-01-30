import "./homepage.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Footer from "../footer";

const HomePage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [sourcePlace, setSourcePlace] = useState('')
    const [destinationPlace, setDestinationPlace] = useState('')
    const [sourceError, setSourceError] = useState("")
    const [selectedDateError, setSelectedDateError] = useState("")
    const [destinationError, setDestinationError] = useState("")




    const onSourcePlace = (event) => {
        setSourcePlace(event.target.value)
    }
    const onDestinationPlace = (event) => {
        setDestinationPlace(event.target.value)
    }
    const handleChange = (date) => {
        setSelectedDate(date);
    };

    const onSubmitBtn = (event) => {
        event.preventDefault();
        // Resetting error messages before validation
        setSourceError('');
        setDestinationError('');
        setSelectedDateError('');

        if (selectedDate && sourcePlace && destinationPlace) {
            console.log("Hii, all details entered");
            alert("Hii details Entered");
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
                    <header className="header-color">Metro<span className="span-color">way</span></header>
                    <div className="metro">
                        <div className="metro1">
                            <div className="travellers-box">
                                <div className="travellers">
                                    <p className="para-h">Hello Travellers</p>
                                </div>
                                <h1 className="font-size">made your booking experience easy!</h1>
                            </div>
                            <p className="para-p">Train booking is a process of choosing and purchasing train seats online. It is an easy process but were are here to make it much better & simple.</p>

                            <form onSubmit={onSubmitBtn} className="search-container1">
                                <div className="search-container">
                                    <div className="input-search">
                                        <input onChange={onSourcePlace} className="input-btn" type="search" placeholder="enter source place" />
                                        <hr />
                                        <p className="error">{sourceError}</p>
                                    </div>
                                    <div className="input-search">
                                        <input className="input-btn" onChange={onDestinationPlace} type="search" placeholder="enter destination place" />
                                        <hr />
                                        <p className="error">{destinationError}</p>
                                    </div>
                                    <div className="input-search">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => handleChange(date)}
                                            className="input-btn"
                                            minDate={new Date()}
                                            placeholderText="Select a date"
                                        />
                                        <hr />
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