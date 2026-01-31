import "./index.css"

const Bhogi = (props) => {
    const { bhogiDetails } = props


    const { id, availability, quota, price } = bhogiDetails

    const bg = availability.includes("AVL") ? "available-green" : "waitlist"
    
    const availabe = () => {
        return (
            (availability === "Not Available") ? (
                <li className=" bhogi-li not-available">
                    <p className="margin-classes">{bhogiDetails.class}</p>
                    <p className="margin-classes">{availability}</p>
                </li>
            ) : (
                <li className={`bhogi-li ${bg}`} >
                    <div className="display-row">
                        <p>{bhogiDetails.class}</p>
                        <p>{availability}</p>
                    </div>
                    <div className="display-row">
                        <p>{quota}</p>
                        <p>{price}</p>
                    </div>
                </li >

            )
        )
    }


    return (
        <>
            {availabe()}
        </>
    )

}

export default Bhogi



