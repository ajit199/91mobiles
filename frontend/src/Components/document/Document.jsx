import axios from "axios";
import "./document.css";
export default function Document({ document: { _id, originalName, size, fileName }, handleDelete }) {
    let Static_Folder = process.env.REACT_APP_STATIC_FILES;
    return (
        <tr>
            <td>{_id}</td>
            <td>{originalName}</td>
            <td>{Math.ceil(size / 1024) + " Kb"}</td>
            <td onClick={() => {
                window.open(`${Static_Folder}${fileName}`, "_blank");
            }} className="viewBtn">View</td>
            <td onClick={() => {
                handleDelete(fileName)
            }} className="deleteBtn">Delete</td>
        </tr >
    )
}