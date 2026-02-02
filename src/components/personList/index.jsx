import "./personlist.css"
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";


const PersonList = (props) => {
    const {details, onDelete, onEdit} = props
    const {name, id} = details

    const ondeleteBtm = () => {
        onDelete(id)
    }

    const onEditBtn =() => {
        onEdit(details)
    }

    return(
        <li className="list-person">
            <p>{name}</p>
            <div className="icons">
                <MdModeEdit color="#0578FF" onClick={onEditBtn} size={20} />
                <MdDelete onClick={ondeleteBtm} color="#FF6060" size={20} />
            </div>
            
        </li>
    )

}

export default PersonList