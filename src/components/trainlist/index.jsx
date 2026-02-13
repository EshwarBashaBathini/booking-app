import './train.css'
import Header from '../header'

import Footer from '../footer'
import { GiSettingsKnobs } from "react-icons/gi";
import TrainItem from '../trainItem';
import url from '../url'
import HorizontalDatePicker from '../calender';

import { useEffect, useState } from 'react';
import LoadingSpinner from '../loader';

import { useSearchParams } from 'react-router-dom';

import { useRef } from "react";




const data = [
  {
    "trainNumber": "12430",
    "trainName": "NDLS LKO AC SF",
    "runsOn": "Everyday",
    "journey": {
      "startDate": "2026-11-16",
      "endDate": "2026-11-17",
      "duration": "8h 0m"
    },
    "from": {
      "stationCode": "NDLS",
      "stationName": "New Delhi",
      "departureTime": "12:25 PM"
    },
    "to": {
      "stationCode": "LKO",
      "stationName": "Lucknow",
      "arrivalTime": "07:25 AM"
    },
    "classes": [
      { "id": "12430-3A", "class": "3A", "availability": "AVL 046", "quota": "Tatkal", "price": 800 },
      { "id": "12430-2A", "class": "2A", "availability": "AVL 006", "quota": "Tatkal", "price": 1000 },
      { "id": "12430-1A", "class": "1A", "availability": "WL 36", "quota": "Tatkal", "price": 1200 },
      { "id": "12430-SL", "class": "SL", "availability": "Not Available", "quota": "", "price": null }
    ]
  },

  {
    "trainNumber": "12230",
    "trainName": "Lucknow Mail",
    "runsOn": "Everyday",
    "journey": {
      "startDate": "2026-11-16",
      "endDate": "2026-11-17",
      "duration": "8h 50m"
    },
    "from": {
      "stationCode": "NDLS",
      "stationName": "New Delhi",
      "departureTime": "11:25 PM"
    },
    "to": {
      "stationCode": "LKO",
      "stationName": "Lucknow",
      "arrivalTime": "07:25 AM"
    },
    "classes": [
      { "id": "12230-3A", "class": "3A", "availability": "AVL 020", "quota": "Tatkal", "price": 780 },
      { "id": "12230-2A", "class": "2A", "availability": "AVL 012", "quota": "Tatkal", "price": 980 },
      { "id": "12230-1A", "class": "1A", "availability": "WL 10", "quota": "Tatkal", "price": 1180 },
      { "id": "12230-SL", "class": "SL", "availability": "AVL 150", "quota": "General", "price": 450 }
    ]
  },

  {
    "trainNumber": "12555",
    "trainName": "Gorakhdham Express",
    "runsOn": "Mon, Wed, Fri",
    "journey": {
      "startDate": "2026-11-16",
      "endDate": "2026-11-17",
      "duration": "9h 15m"
    },
    "from": {
      "stationCode": "NDLS",
      "stationName": "New Delhi",
      "departureTime": "03:40 PM"
    },
    "to": {
      "stationCode": "LKO",
      "stationName": "Lucknow",
      "arrivalTime": "12:55 AM"
    },
    "classes": [
      { "id": "12555-3A", "class": "3A", "availability": "AVL 065", "quota": "Tatkal", "price": 820 },
      { "id": "12555-2A", "class": "2A", "availability": "AVL 020", "quota": "Tatkal", "price": 1020 },
      { "id": "12555-1A", "class": "1A", "availability": "WL 5", "quota": "Tatkal", "price": 1300 },
      { "id": "12555-SL", "class": "SL", "availability": "AVL 210", "quota": "General", "price": 470 }
    ]
  },

  {
    "trainNumber": "12004",
    "trainName": "Shatabdi Express",
    "runsOn": "Except Sun",
    "journey": {
      "startDate": "2026-11-16",
      "endDate": "2026-11-16",
      "duration": "6h 15m"
    },
    "from": {
      "stationCode": "NDLS",
      "stationName": "New Delhi",
      "departureTime": "06:10 AM"
    },
    "to": {
      "stationCode": "LKO",
      "stationName": "Lucknow",
      "arrivalTime": "12:25 PM"
    },
    "classes": [
      { "id": "12004-CC", "class": "CC", "availability": "AVL 090", "quota": "General", "price": 900 },
      { "id": "12004-EC", "class": "EC", "availability": "AVL 015", "quota": "General", "price": 1600 }
    ]
  },

  {
    "trainNumber": "12583",
    "trainName": "Anvt Lko Double Decker",
    "runsOn": "Tue, Thu, Sun",
    "journey": {
      "startDate": "2026-11-16",
      "endDate": "2026-11-16",
      "duration": "7h 45m"
    },
    "from": {
      "stationCode": "ANVT",
      "stationName": "Anand Vihar",
      "departureTime": "02:30 PM"
    },
    "to": {
      "stationCode": "LKO",
      "stationName": "Lucknow",
      "arrivalTime": "10:15 PM"
    },
    "classes": [
      { "id": "12583-CC", "class": "CC", "availability": "AVL 120", "quota": "General", "price": 750 },
      { "id": "12583-2S", "class": "2S", "availability": "AVL 300", "quota": "General", "price": 350 }
    ]
  }
]

const statusOfTrains = {
  "empty": "empty",
  'pending': 'pending',
  'success': 'success'
}


const TrainList = () => {

  const [sourcePlace, setSourcePlace] = useState('')
  const [destinationPlace, setDestinationPlace] = useState('')
  const [sourceSelected, setSourceSelected] = useState(false)
  const [destinationSelected, setDestinationSelected] = useState(false)
  const [sourceCode, setSourceCode] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const [trainsList, setTrainList] = useState([])
  const [status, setStatus] = useState('empty')

  const [isLoading, setLoader] = useState(true)
  const [stationsLoader, setStationLoader] = useState(true)

  const [stationList, setStationList] = useState([])

  const [searchParams] = useSearchParams();
  const timeoutRef = useRef(null);


  useEffect(() => {
    const from1 = searchParams.get('from')
    setSourceCode(from1)
    setSourcePlace(from1)

    const to = searchParams.get('to')
    setDestinationCode(to)
    setDestinationPlace(to)


  }, [searchParams])


  useEffect(() => {
    if (!sourceCode || !destinationCode) return;
    setStatus('pending')


    const fetchTrains = async () => {

      const response = await fetch(
        `${url}/trains/search?from=${sourceCode}&to=${destinationCode}`
      );

      const res = await response.json();

      if (response.ok) {
        console.log(res);
        setLoader(false)
        setStatus('success')
        setTrainList(res.data);

      }
    };

    console.log(sourceCode === "" || destinationCode === "")

    if (sourceCode === null || destinationCode === null) {
      setLoader(false)
    }

    fetchTrains();
  }, [sourceCode, destinationCode]);

  const searchStations = (query) => {

    const fetchStations = async () => {

      try {
        const response = await fetch(
          `${url}/stations/search?q=${query}`
        );

        const res = await response.json();

        setStationList(res);
        console.log(res);
        setStationLoader(false)

      } catch (error) {
        console.error("Error fetching stations:", error);
      }

    };

    fetchStations();
  };

  const onSourceChange = (e) => {
    setSourcePlace(e.target.value)
    setSourceSelected(true)
    setStationLoader(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 🔥 Set new timer
    timeoutRef.current = setTimeout(() => {
      searchStations(e.target.value);
    }, 500);

  }

  const onDestinationChange = (e) => {
    setDestinationPlace(e.target.value)
    setStationLoader(true)
    setDestinationSelected(true)


    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 🔥 Set new timer
    timeoutRef.current = setTimeout(() => {
      searchStations(e.target.value);
    }, 500);
  }

  const renderEmpty = () => {
    return (
      <div className='loader-container'>
        <p>No Trains Listed</p>
      </div>
    )
  }

  const renderLoader = () => {
    return (
      <div className='loader-container'>
        <LoadingSpinner />
      </div>
    )
  }

  const renderTrains = () => {
    return (
      <ul className='ul-trains-list'>
        {trainsList.map(eachTrain => (
          <TrainItem trainDetails={eachTrain} key={eachTrain.trainNo} />
        ))}

      </ul>
    )

  }

  const renderStatus = () => {
    switch (status) {
      case statusOfTrains.empty:
        return renderEmpty()
      case statusOfTrains.pending:
        return renderLoader()
      default:
        return renderTrains()
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setStatus('pending')


    if (sourcePlace && destinationPlace) {

      const response = await fetch(`${url}/trains/search?from=${sourceCode}&to=${destinationCode}`)
      const res = await response.json()

      if (response.ok) {
        setTrainList(res.data)
        setStatus('success')
      }


    }
  }






  return (
    <div className='top-container' >
      <Header />
      <div className='train-container ' >
        <div className='side-container'>
          <h1 className='head'>Your Search Results</h1>
          <div className='container-height' >
            <form onSubmit={onFormSubmit} className='search-container'>
              <div className='input-container-ee'>
                <input type='text' value={sourcePlace} onBlur={() => setSourceSelected(false)} onChange={onSourceChange} className='input' placeholder='source' />
                <hr />
                {sourceSelected &&
                  (!stationsLoader ? (<ul className="ul-stations-book" >
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
                  </div>))}

              </div>
              <div className='input-container-ee'>
                <input className='input' value={destinationPlace} onChange={onDestinationChange} onBlur={() => setDestinationSelected(false)} placeholder='destination' type='text' />
                <hr />
                {destinationSelected &&
                  (!stationsLoader ? <ul className="ul-stations-book">
                    {stationList.map(eachStations => (
                      <li key={eachStations.id} className="list-stations" onMouseDown={() => {
                        setDestinationCode(eachStations.code)
                        setDestinationPlace(eachStations.name)
                        setDestinationSelected(false)
                        setStationList([])
                      }}  >
                        <p className="stations-p" >{eachStations.code}</p>
                        <p className="stations-p"   >{eachStations.name}</p>

                      </li>
                    ))}

                  </ul> : (<div className="class-loader">

                    <p>Loading....</p>
                  </div>))}
              </div>
              <button type='submit' className='trains-btn' >Search for trains</button>
            </form>

            <HorizontalDatePicker />

            <div className='container-height1'>
              <div className='container-height2'>
                <div className='plan-container'>
                  <p className='name-plan-01'>Planning your holidays</p>

                </div>
                <div className='tour-container'>
                  <p className='name-plan-01'>Train tourism packages</p>

                </div>
              </div>
              <p className='last-para-home'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et olore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et olore magna aliqua</p>
            </div>

          </div>

        </div>
        <div className='side-container2'>
          <div className='available-trains'>
            <div className='trains-available'>
              <h2 className='train-h1'>Available Trains</h2>
              <p className='p-train'>{trainsList.length} Trains Available </p>

            </div>
            <GiSettingsKnobs color='#0578ff' size={20} />

          </div>
          <hr className='hr' />
          {/* <ul className='ul-trains-list'>
            {!isLoading ? trainsList.map(eachTrain => (
              <TrainItem trainDetails={eachTrain} key={eachTrain.trainNo} />
            )) : <div className='loader-container'><LoadingSpinner /></div>

            }
          </ul> */}
          {renderStatus()}
        </div>

      </div>
      <Footer />
    </div>
  )

}

export default TrainList