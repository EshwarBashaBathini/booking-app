import "./homepage.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useMemo } from "react";
import Footer from "../footer";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useRef } from "react";



import url from '../url'

const HomePage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [sourcePlace, setSourcePlace] = useState('')
    const [destinationPlace, setDestinationPlace] = useState('')
    const [sourceError, setSourceError] = useState("")
    const [selectedDateError, setSelectedDateError] = useState("")
    const [destinationError, setDestinationError] = useState("")

    const [stationList, setStationList] = useState([])

    const [sourceCode, setSourceCode] = useState("")
    const [destinationCode, setDestinationCode] = useState("")

    const [sourceSelected, setSourceSelected] = useState(false)
    const [destinationSelected, setDestinationSelected] = useState(false)
    const timeoutRef = useRef(null);

    const [stationsLoader, setStationsLoader] = useState(false)

    const navigate = useNavigate();

    // function debounce(func, delay) {
    //     let timeoutId;

    //     return function (...args) {
    //         clearTimeout(timeoutId);

    //         timeoutId = setTimeout(() => {
    //             func(...args);
    //         }, delay);
    //     };
    // }



    const searchStations = (query) => {

        const fetchStations = async () => {

            try {
                const response = await fetch(
                    `${url}/stations/search?q=${query}`
                );

                const res = await response.json();

                setStationList(res);
                setStationsLoader(false)
                console.log(res);

            } catch (error) {
                console.error("Error fetching stations:", error);
            }

        };

        fetchStations();
    };


    // const debouncedSearch = useMemo(
    //     () => debounce(searchStations, 500),
    //     [searchStations]
    // );




    const onSourcePlace = (event) => {
        setSourcePlace(event.target.value)
        setSourceError("");
        setStationsLoader(true)
        setSourceSelected(true)
        // debouncedSearch(event.target.value);
        console.log(event.target.value)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 🔥 Set new timer
        timeoutRef.current = setTimeout(() => {
            searchStations(event.target.value);
        }, 500);

    }

    const onSourceBlur = (event) => {
        if (sourcePlace === "") {
            setSourceError("Please Enter the Source Place!..");
        }
        setSourceSelected(false)
    }

    const onDestinationPlace = (event) => {
        setDestinationPlace(event.target.value)
        setDestinationError("")
        setStationsLoader(true)
        setDestinationSelected(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 🔥 Set new timer
        timeoutRef.current = setTimeout(() => {
            searchStations(event.target.value);
        }, 500);



    }

    const onDestinationBlur = (event) => {
        if (event.target.value === "") {
            setDestinationError("Please Enter the Destination Place!..")
        }
        setDestinationSelected(false)
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


            navigate(`/book?from=${sourceCode}&to=${destinationCode}`);
            setSelectedDate(null)
            setDestinationPlace("")
            setSourcePlace("")
        } else if (!selectedDate && !sourcePlace && !destinationPlace) {
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
                                        <input onChange={onSourcePlace} onBlur={onSourceBlur} value={sourcePlace} className="input-btn" type="search" placeholder="enter source place" />
                                        <hr className="hr-line" />
                                        <p className="error">{sourceError}</p>
                                        {sourceSelected &&
                                            ( !stationsLoader ? (<ul className="ul-stations" >
                                                {stationList.map(eachStations => (
                                                    <li key={eachStations.id} className="list-stations"
                                                        onMouseDown={() => {
                                                            setSourceCode(eachStations.code),
                                                                setSourcePlace(eachStations.name)
                                                            setSourceSelected(false);
                                                            setStationList([])

                                                        }}


                                                    >
                                                        <p className="stations-p" >{eachStations.code}</p>
                                                        <p className="stations-p"   >{eachStations.name}</p>

                                                    </li>
                                                ))}

                                            </ul>) : (<div className="class-loader">

                                              <p>Loading....</p>
                                            </div>))
                                        }

                                    </div>
                                    <div className="input-search">
                                        <input className="input-btn" onBlur={onDestinationBlur} value={destinationPlace} onChange={onDestinationPlace} type="search" placeholder="enter destination place" />
                                        <hr className="hr-line" />
                                        <p className="error">{destinationError}</p>
                                        {destinationSelected &&
                                            ( !stationsLoader ? <ul className="ul-stations">
                                                {stationList.map(eachStations => (
                                                    <li key={eachStations.id} className="list-stations" onMouseDown={() => {
                                                        setDestinationCode(eachStations.code)
                                                        setDestinationPlace(eachStations.name)
                                                        setDestinationSelected(false)
                                                        setStationList([])
                                                    }}  >
                                                        <p className="stations-p" >{eachStations.code}</p>
                                                        <p className="stations-p-p"   >{eachStations.name}</p>

                                                    </li>
                                                ))}

                                            </ul>: (<div className="class-loader">

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