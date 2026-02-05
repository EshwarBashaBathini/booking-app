import "./index.css"

const Bhogi = (props) => {
    const { bhogiDetails, onSelected } = props
    
    
     const { id, availability, quota, price } = bhogiDetails

    const onSelectedClass = () => {
        onSelected(id)
        
    }



   

    const bg = availability.includes("AVL") ? "available-green" : "waitlist"
    
    const availabe = () => {
        return (
            (availability === "Not Available") ? (
                <li className=" bhogi-li not-available">
                    <p className="bhogi-p-class2">{bhogiDetails.class}</p>
                    <p className="bhogi-p-class2">{availability}</p>
                </li>
            ) : (
                <li onClick={onSelectedClass} className={`bhogi-li ${bg}`} >
                    <div className="display-row">
                        <p className="bhogi-p-class">{bhogiDetails.class}</p>
                        <p className="bhogi-p-class">{availability}</p>
                    </div>
                    <div className="display-row">
                        <p className="bhogi-p-class">{quota}</p>
                        <p className="bhogi-p-class">{price}</p>
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



