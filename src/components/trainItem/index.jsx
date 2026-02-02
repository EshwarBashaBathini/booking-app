import "./trainItem.css"

import Bhogi from "../bhogi"


const TrainItem = (props) => {
    const {trainDetails} = props


    const { trainNumber, trainName, runsOn, journey, from = {}, to, classes } = trainDetails
 
    return (
        <li className="list-train">
            <h3 className="margin-class">{trainNumber} - {trainName}</h3>
            <div className="container2">
                <div className="container2-1">
                    <p className="run">Run on</p>
                    <p className="train-h"> {runsOn}</p>

                </div>
                <p className="margin-class time-table">View train time table</p>

            </div>
            <div className="journey-container">
                <div className="journey-details-from">
                    <h3 className="margin-class">{journey.startDate}</h3>
                    <p className="margin-class">{from.departureTime} <br/>{from.stationCode}, {from.stationName}</p>
                </div>
                <div className="journey-time">
                    <h3 className="margin-class">{journey.duration}</h3>
                    <hr className="hr-time  dotted-line margin-class" />

                </div>
                <div className="journey-details-to">
                    <h3 className="margin-class">{journey.endDate}</h3>
                    <p className="margin-class1">{to.arrivalTime} <br/>{to.stationCode}, {from.stationName}</p>
                </div>
            </div>
            <ul className="booking-seat">
                {classes.map(eachClass => (
                    <Bhogi bhogiDetails={eachClass} key={eachClass.id} />
                ))}

            </ul>
        </li>
    )


}

export default TrainItem