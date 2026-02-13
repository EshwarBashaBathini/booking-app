import "./index.css"
import { useState } from "react"

const Bhogi = (props) => {
    const { bhogiDetails, onSelected , className} = props
    const { classCode, currency, quotaCode, fare } = bhogiDetails


    const onSelectedClass = () => {
        onSelected(classCode,quotaCode)
       
        
    }



   

    const bg = "available-green"
   
    
    const availabe = () => {
        return (
           (
                <li  onClick={onSelectedClass} className={`bhogi-li ${className}  ${bg}`} >
                    <div className="display-row">
                        <p className="bhogi-p-class">{classCode}</p>
                        <p className="bhogi-p-class">{quotaCode}</p>
                    </div>
                    <div className="display-row">
                        <p className="bhogi-p-class">₹{fare}</p>
                        <p className="bhogi-p-class">{currency}</p>
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



