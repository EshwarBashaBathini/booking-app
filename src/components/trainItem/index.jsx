import "./trainItem.css"

import Bhogi from "../bhogi"
import { useNavigate } from "react-router-dom"

const TrainItem = (props) => {
    const {trainDetails} = props
    const navigate = useNavigate()
    const train_info = trainDetails
 
    
    const { trainNumber, trainName, runsOn, journey, from = {}, to, classes } = trainDetails
 
    const onSelectedClass = (id) => {
        const selectedClass =  classes.filter( eachClass => 
            eachClass.id === id
        )
        navigate(`/book/${trainNumber}/${from.stationCode}-${to.stationCode}`,{
            state: {
                selectedClass,
                trainDetails
            }
        })
        

    }


    
 
    return (
        <li className="list-train12">
            <h3 className="margin-class">{trainNumber} - {trainName}</h3>
            <div className="container2">
                <div className="container2-1">
                    <p className="run">Run on</p>
                    <p className="train-h"> {runsOn}</p>

                </div>
                <p className="time-table1">View train time table</p>

            </div>
            <div className="journey-container">
                <div className="journey-details-from">
                    <h3 className="margin-class-14px">{journey.startDate}</h3>
                    <p className="margin-class-14px">{from.departureTime} <br/>{from.stationCode}, {from.stationName}</p>
                </div>
                <div className="journey-time">
                    <h3 className="margin-class-time">{journey.duration}</h3>
                    <hr className="hr-time  dotted-line margin-class" />

                </div>
                <div className="journey-details-to">
                    <h3 className="margin-class-14px">{journey.endDate}</h3>
                    <p className="margin-class-14px">{to.arrivalTime} <br/>{to.stationCode}, {from.stationName}</p>
                </div>
            </div>
            <ul className="booking-seat1">
                {classes.map(eachClass => (
                    <Bhogi onSelected={onSelectedClass} bhogiDetails={eachClass} key={eachClass.id} />
                ))}

            </ul>
        </li>
    )


}

export default TrainItem