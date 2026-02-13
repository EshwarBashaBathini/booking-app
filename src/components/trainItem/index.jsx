import "./trainItem.css"

import Bhogi from "../bhogi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const TrainItem = (props) => {
    const { trainDetails } = props
    const [selectedClass, setSelectedClass] = useState([])
    const [selectedclassId, setSelectedClassId] = useState("");
    const [selectedQuotaCode, setSelectedQuotaCode] = useState("")








    const navigate = useNavigate()

    const { trainNo, name, source, destination, runsOnDays, fromStation = {}, toStation = {}, travelDuration, fares } = trainDetails

    const onSelectedClass = (classCode, quotaCode) => {

        if (selectedQuotaCode === quotaCode && selectedclassId === classCode) {
            setSelectedClassId('')
            setSelectedQuotaCode("")
           

        }else{
             setSelectedClassId(classCode)
            setSelectedQuotaCode(quotaCode)

            const selectedClass = fares.filter(eachClass =>
                eachClass.classCode === classCode && eachClass.quotaCode === quotaCode
            )
            setSelectedClass(selectedClass)
            console.log(selectedClass)
        }
    }

    const onBookingNav = () => {
        navigate(`/book/${trainNo}/${fromStation.code}-${toStation.code}`,{
            state: {
                selectedClass,
                trainDetails
            }
        })

    }

    const onTrainDetails = () => {
        navigate(`/train/${trainNo}`)
    }




    return (
        <li className="list-train12 ">
            <h3 onClick={onTrainDetails} className="margin-class">{trainNo} - {name}</h3>
            <div className="container2">
                <div className="container2-1">
                    <p className="run">Run on</p>
                    <p className="train-h"> {runsOnDays}</p>

                </div>
                <p onClick={onTrainDetails} className="time-table1">View train time table</p>

            </div>
            <div className="journey-container">
                <div className="journey-details-from">
                    <h3 className="margin-class-14px">{source}</h3>
                    <p className="margin-class-14px">{fromStation.dep} <br />{fromStation.code}, {fromStation.name}</p>
                </div>
                <div className="journey-time">
                    <h3 className="margin-class-time">{travelDuration}</h3>
                    <hr className="hr-time  dotted-line margin-class" />

                </div>
                <div className="journey-details-to">
                    <h3 className="margin-class-14px">{destination}</h3>
                    <p className="text-alignment">{toStation.arr} <br />{toStation.code}, {fromStation.name}</p>
                </div>
            </div>
            <ul className="booking-seat1">
                {fares.map(eachClass => (
                    <Bhogi onSelected={onSelectedClass} className={`${(selectedQuotaCode === eachClass.quotaCode && selectedclassId === eachClass.classCode) ? 'outline-bg' : ""} `} bhogiDetails={eachClass} key={eachClass.id} />
                ))}

            </ul>
           { (selectedQuotaCode && selectedclassId) && <button onClick={onBookingNav} className="book-btn-itm">Book Now</button>}
        </li>
    )


}

export default TrainItem