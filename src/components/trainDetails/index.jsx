import './traindetails.css'

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import url from '../url'


const data = {
    "id": "b1c1b91b-1887-460f-a09f-2af430544ae1",
    "trainNo": "12649",
    "name": "Karnataka Sampark Kranti Express (Via Ballari) (PT)",
    "type": "SKr",
    "zone": "SWR",
    "source": "YPR",
    "destination": "NZM",
    "departureTime": "13:30:00",
    "arrivalTime": "08:10:00",
    "durationMinutes": 2560,
    "distanceKm": 2747,
    "classes": "SL 3A 2A 1A",
    "returnTrainNo": "12650",
    "runsOnDays": "SMTWTFS",
    "routes": [
        {
            "seq": 1,
            "code": "YPR",
            "station": "Yasvantpur Jn",
            "arr": "First",
            "dep": "13:30",
            "dist": 0,
            "day": 1
        },
        {
            "seq": 2,
            "code": "TK",
            "station": "Tumkur",
            "arr": "14:18",
            "dep": "14:20",
            "dist": 65,
            "day": 1
        },
        {
            "seq": 12,
            "code": "KRNT",
            "station": "Kurnool City",
            "arr": "04:13",
            "dep": "04:15",
            "dist": 845,
            "day": 2
        },
        {
            "seq": 13,
            "code": "MBNR",
            "station": "Mahbubnagar",
            "arr": "06:04",
            "dep": "06:05",
            "dist": 975,
            "day": 2
        },
        {
            "seq": 14,
            "code": "KCG",
            "station": "Kacheguda (RL)",
            "arr": "08:05",
            "dep": "08:15",
            "dist": 1081,
            "day": 2
        }
    ],
    "fares": [
        {
            "trainNo": "12649",
            "classCode": "1A",
            "quotaCode": "GN",
            "fare": 6110,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "2A",
            "quotaCode": "GN",
            "fare": 3620,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "2A",
            "quotaCode": "TQ",
            "fare": 4145,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "3A",
            "quotaCode": "GN",
            "fare": 2520,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "3A",
            "quotaCode": "TQ",
            "fare": 2940,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "3E",
            "quotaCode": "GN",
            "fare": 2425,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "3E",
            "quotaCode": "TQ",
            "fare": 2845,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "SL",
            "quotaCode": "GN",
            "fare": 1015,
            "currency": "INR"
        },
        {
            "trainNo": "12649",
            "classCode": "SL",
            "quotaCode": "TQ",
            "fare": 1215,
            "currency": "INR"
        }
    ],
    "coaches": [
        {
            "trainNo": "12649",
            "coachCode": "En",
            "coachClass": "En",
            "position": 0
        },
        {
            "trainNo": "12649",
            "coachCode": "GC",
            "coachClass": "GC",
            "position": 3
        },
        {
            "trainNo": "12649",
            "coachCode": "GN",
            "coachClass": "GN",
            "position": 4
        },
        {
            "trainNo": "12649",
            "coachCode": "S1",
            "coachClass": "SL",
            "position": 6
        },
        {
            "trainNo": "12649",
            "coachCode": "S2",
            "coachClass": "SL",
            "position": 7
        },
        {
            "trainNo": "12649",
            "coachCode": "S3",
            "coachClass": "SL",
            "position": 8
        },
        {
            "trainNo": "12649",
            "coachCode": "S4",
            "coachClass": "SL",
            "position": 9
        },
        {
            "trainNo": "12649",
            "coachCode": "S5",
            "coachClass": "SL",
            "position": 10
        },
        {
            "trainNo": "12649",
            "coachCode": "S6",
            "coachClass": "SL",
            "position": 11
        },
        {
            "trainNo": "12649",
            "coachCode": "PC",
            "coachClass": "PC",
            "position": 12
        },
        {
            "trainNo": "12649",
            "coachCode": "A1",
            "coachClass": "2A",
            "position": 13
        },
        {
            "trainNo": "12649",
            "coachCode": "A2",
            "coachClass": "2A",
            "position": 14
        },
        {
            "trainNo": "12649",
            "coachCode": "H1",
            "coachClass": "1A",
            "position": 15
        },
        {
            "trainNo": "12649",
            "coachCode": "B3",
            "coachClass": "3A",
            "position": 16
        },
        {
            "trainNo": "12649",
            "coachCode": "B2",
            "coachClass": "3A",
            "position": 17
        },
        {
            "trainNo": "12649",
            "coachCode": "B1",
            "coachClass": "3A",
            "position": 18
        }
    ]
}

const TrainDetails = () => {

    const { id } = useParams()
    console.log(useParams())
    const [trainDetails, setTrainDetails] = useState([])





    useEffect(() => {
        AOS.init({
            duration: 1000,   // animation time
            once: true        // animation only once
        });
        AOS.refresh()
    }, []);

    useEffect(() => {
        const fetchTrainDetails = async () => {
            const response = await fetch(`${url}/trains/${id}`)
            const res = await response.json()
            setTrainDetails(res)
           
            setLoader(true)

        }

        fetchTrainDetails()
    }, [])
    let routeLen;
    if (trainDetails.length !== 0){
        routeLen =  trainDetails.routes.length || 0

    }
    

    

    return (
       <div data-aos='fade-up' className='container-train-details'>
            <h1 className='heading-details'>Trains Details: -</h1>
            <div className='train-top-container'>
                <h2 className='train-name' >{trainDetails.trainNo} {trainDetails.name}</h2>
                <p className='zone'>{trainDetails.zone}</p>
                <hr />
                <div className='container-types'>
                    <div className='type-container' >
                        <p className='type-head'>TRAIN TYPE</p>
                        <h5 className='type-name'>{trainDetails.type}</h5>
                    </div><div className='type-container'>
                        <p className='type-head'>Return Train</p>
                        <h5 className='type-name'>{trainDetails.returnTrainNo}</h5>
                    </div>
                    <div className='type-container'>
                        <p className='type-head'>Available Classes</p>
                        <h5 className='type-name'>{trainDetails.classes}</h5>
                    </div>
                </div>

            </div>
            <div className='train-top-container'>
                <div className='top-container-route'>
                    <h1 className='station-code' >{trainDetails?.routes?.[0]?.code}</h1>
                    <p className='station-name' >{trainDetails?.routes?.[0]?.station}</p>
                    <p className='dep-time' >{trainDetails?.routes?.[0]?.dep}</p>
                    <p className='dep-name'>DEPARTURE ({trainDetails?.routes?.[0]?.arr})</p>
                </div>

                <div className='top-container-route'>
                    <h1 className='station-code' >{trainDetails?.routes?.[routeLen - 1]?.code}</h1>
                    <p className='station-name' >{trainDetails?.routes?.[routeLen - 1]?.station}</p>
                    <p className='dep-time' >{trainDetails?.routes?.[routeLen - 1]?.arr}</p>
                    <p className='dep-name'>DEPARTURE ({trainDetails?.routes?.[routeLen - 1]?.day} Days)</p>
                </div>

                <div className='secnd-container-route'>
                    <div className='container-km'>
                        <h2 className='km-heading'>{trainDetails.distanceKm}</h2>
                        <p className="km-para">KILOMETERS</p>

                    </div>
                    <div className='container-km'>
                        <h2 className='km-heading'>{trainDetails.durationMinutes}</h2>
                        <p className="km-para">MINUTES</p>
                    </div>
                </div>
                <hr className='line-hr' />
                <div className='top-container-route'>
                    <p className='station-name'>Runs on Days</p>
                    <ul className='runs-train-container'>
                        {trainDetails?.runsOnDays?.split('').map((day, index) => (
                            <li className='list-run-day' key={index}>
                                {day}

                            </li>
                        ))}
                    </ul>

                </div>


            </div>

            <div className='route-container'>
                <h1 className='route-heading'>Route Schedule</h1>
                <div className='table-top-container'>
                    <div className='table-top'>
                        <p className='sno'>S.no</p>
                        <p className='class-station'>STATION</p>
                        <p className='code'>CODE</p>
                        <p className='arr' >ARRIVAL</p>
                        <p className='dep'>DEPARTURE</p>
                        <p className='distance'>DISTANCE</p>
                        <p>DAY</p>
                    </div>
                    <hr />
                    <ul>
                        {trainDetails?.routes?.map(eachStation => (
                            <li data-aos="fade-up" key={eachStation.code} className='table-btm'>
                                <p className='sno'>{eachStation.seq}</p>
                                <p className='class-station'>{eachStation.station}</p>
                                <p className='code'>{eachStation.code}</p>
                                <p className='arr'>{eachStation.arr}</p>
                                <p className='dep'>{eachStation.dep}</p>
                                <p className='distance'>{eachStation.dist}</p>
                                <p>{eachStation.day}</p>

                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className='route-container'>
                <h1 className='route-heading'>Fares Details</h1>
                <ul className='runs-train-container'>
                    {trainDetails?.fares?.map(eachFare => (
                        <li data-aos="fade-left" key={eachFare.classCode + eachFare.quotaCode} className='fare-list-item'>
                            <p className='classCode'>{eachFare.classCode}</p>
                            <p className='quota-code'>Quota Type:  {eachFare.quotaCode} </p>
                            <p className='fare-i'>₹{eachFare.fare}</p>


                        </li>
                    ))}

                </ul>

            </div>
            <div className='route-container'>
                <h1 className='route-heading'>Coach Composition</h1>
                <ul className='runs-train-container'>
                    {trainDetails?.coaches?.map(eachFare => (
                        <li data-aos="fade-left" key={eachFare.coachCode + eachFare.coachClass} className='coach-list-item'>
                            <p className='classCode'>{eachFare.coachCode}</p>
                            <p className='fare-i'>₹{eachFare.coachClass}</p>


                        </li>
                    ))}

                </ul>

            </div>


        </div>
    )

}

export default TrainDetails