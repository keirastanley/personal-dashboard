import { FaCircle, FaExclamation } from "react-icons/fa";

function PriorityIcon({priority}){
    switch (priority) {
        case "Low":
            return <FaCircle className="low-priority"/>
        case "Medium":
            return <FaCircle className="med-priority"/>
        case "High":
            return <FaExclamation className="high-priority"/>
        case "Priority":
            return <FaCircle className="low-priority"/>
        default:
            return "";
    }
}

export default PriorityIcon;