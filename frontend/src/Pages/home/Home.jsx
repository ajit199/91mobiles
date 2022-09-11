// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import "./home.css"
import Document from "../../Components/document/Document";
import Topbar from "../../Components/topbar/Topbar";
export default function Home() {
    let [documents, setDocuments] = useState([]);
    let navigate = useNavigate();
    let user = JSON.parse(sessionStorage.getItem("user"));
    useEffect(() => {
        axios.get(`http://localhost:3200/documents?userId=${"631ca720f87ba3151aa44297"}`)
            .then(res => {
                setDocuments(res.data)
            }).catch(error => console.log(error));
    }, []);

    function handleDelete(fileName) {
        axios
            .delete("http://localhost:3200/documents/delete/" + fileName)
            .then((res) => {
                alert("Document has been Deleted");
                let updatedDocuments = documents.filter((document) => {
                    return document.fileName !== fileName;
                });
                setDocuments(updatedDocuments);
                // window.location.reload();
            })
            .catch((error) => console.log(error));
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Topbar />
            <div className="documents">
                <button id="documentsBtn" onClick={() => {
                    navigate("/uploadDocument")
                }}>Upload Document</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents && documents.map((document) => {
                            return <Document key={document._id} document={document} handleDelete={handleDelete} />
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}