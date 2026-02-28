import "./homepage.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import Footer from "../footer";
import { useNavigate, Link } from 'react-router-dom';
import { useSourceHome } from "../../hook/useHome";
import { useDebounce } from "../../hook/useDebounce";

const HomePage = () => {

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);

    // INPUT STATES (instant typing)
    const [sourceInput, setSourceInput] = useState("");
    const [destinationInput, setDestinationInput] = useState("");

    // DEBOUNCED STATES (used for API)
    const [sourcePlace, setSourcePlace] = useState("");
    const [destinationPlace, setDestinationPlace] = useState("");

    const [sourceCode, setSourceCode] = useState("");
    const [destinationCode, setDestinationCode] = useState("");

    const [sourceError, setSourceError] = useState("");
    const [destinationError, setDestinationError] = useState("");
    const [selectedDateError, setSelectedDateError] = useState("");

    const [sourceSelected, setSourceSelected] = useState(false);
    const [destinationSelected, setDestinationSelected] = useState(false);

    // ✅ Debounce values
    const debouncedSource = useDebounce(sourceInput, 500);
    const debouncedDestination = useDebounce(destinationInput, 500);

    // update debounced values
    useEffect(() => {
        setSourcePlace(debouncedSource);
    }, [debouncedSource]);

    useEffect(() => {
        setDestinationPlace(debouncedDestination);
    }, [debouncedDestination]);

    // API calls
    const {
        data: sourceData = [],
        isLoading: sourceLoading,
    } = useSourceHome(sourcePlace);

    const {
        data: destinationData = [],
        isLoading: destinationLoading
    } = useSourceHome(destinationPlace);

    // handlers
    const onSourcePlace = (event) => {

        const value = event.target.value;

        setSourceError("");
        setSourceInput(value);
        setSourceSelected(true);
    }

    const onDestinationPlace = (event) => {

        const value = event.target.value;

        setDestinationError("");
        setDestinationInput(value);
        setDestinationSelected(true);
    }

    const onSourceBlur = () => {

        if (!sourceInput) {
            setSourceError("Please Enter the Source Place!..");
        }

        setTimeout(() => setSourceSelected(false), 200);
    }

    const onDestinationBlur = () => {

        if (!destinationInput) {
            setDestinationError("Please Enter the Destination Place!..");
        }

        setTimeout(() => setDestinationSelected(false), 200);
    }

    const handleChange = (date) => {
        setSelectedDate(date);
        setSelectedDateError("");
    };

    const onDateBlur = () => {
        if (!selectedDate) {
            setSelectedDateError("Please Select Date");
        }
    }

    const onSubmitBtn = (event) => {

        event.preventDefault();

        setSourceError("");
        setDestinationError("");
        setSelectedDateError("");

        if (!sourceCode)
            return setSourceError("Please select source station");

        if (!destinationCode)
            return setDestinationError("Please select destination station");

        if (!selectedDate)
            return setSelectedDateError("Please select date");

        navigate(`/book?from=${sourceCode}&to=${destinationCode}`);

        // reset
        setSelectedDate(null);
        setSourceInput("");
        setDestinationInput("");
        setSourcePlace("");
        setDestinationPlace("");
    };


    return (
        <div className="top-container">

            <div className="top-home-container" >

                <div className="first-container">

                    <h3 className="header-color1" ><Link className="header-color" to="/">Metro<span className="span-color">way</span></Link></h3>

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
                                        <input onChange={onSourcePlace} onBlur={onSourceBlur} value={sourceInput} className="input-btn" type="search" placeholder="enter source place" />
                                        <hr className="hr-line" />
                                        <p className="error">{sourceError}</p>
                                        {sourceSelected &&
                                            (!sourceLoading ? (<ul className="ul-stations" >
                                                {sourceData.map(eachStations => (
                                                    <li key={eachStations.id} className="list-stations"
                                                        onMouseDown={() => {
                                                            setSourceCode(eachStations.code),
                                                                setSourceInput(eachStations.name)
                                                            setSourceSelected(false);


                                                        }}


                                                    >
                                                        <p className="stations-p" >{eachStations.code}</p>
                                                        <p className="stations-p-p"   >{eachStations.name}</p>

                                                    </li>
                                                ))}

                                            </ul>) : (<div className="class-loader">

                                                <p>Loading....</p>
                                            </div>))
                                        }

                                    </div>
                                    <div className="input-search">
                                        <input className="input-btn" onBlur={onDestinationBlur} value={destinationInput} onChange={onDestinationPlace} type="search" placeholder="enter destination place" />
                                        <hr className="hr-line" />
                                        <p className="error">{destinationError}</p>
                                        {destinationSelected &&
                                            (!destinationLoading ? <ul className="ul-stations">
                                                {destinationData.map(eachStations => (
                                                    <li key={eachStations.id} className="list-stations" onMouseDown={() => {
                                                        setDestinationCode(eachStations.code)
                                                        setDestinationInput(eachStations.name)
                                                        setDestinationSelected(false)

                                                    }}  >
                                                        <p className="stations-p" >{eachStations.code}</p>
                                                        <p className="stations-p-p"   >{eachStations.name}</p>

                                                    </li>
                                                ))}

                                            </ul> : (<div className="class-loader">

                                                <p>Loading....</p>
                                            </div>))
                                        }


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